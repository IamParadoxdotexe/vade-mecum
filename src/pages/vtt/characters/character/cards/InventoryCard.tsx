import React from 'react';
import { VCard } from '@/components/VCard';
import { VTable } from '@/components/VTable';
import { ReactComponent as WeightIcon } from '@/icons/Weight.svg';
import { VNumberInput } from '@/components/VNumberInput';
import { CharacterClient } from '../useCharacterClient';
import { useVTheme } from '@/common/VTheme';
import { VFlex } from '@/components/VFlex';
import { Item } from '@/pages/vtt/types/Item';
import { capitalize } from 'lodash-es';
import { RollableSkill } from './RollableSkill';
import { useRollModal } from '@/pages/vtt/rolls/RollModal';
import { DiceFactor, RollEvaluation } from '@/pages/vtt/types/Roll';
import { CombatantClient } from '@/pages/vtt/sessions/session/encounter/useCombatantClient';
import reactStringReplace from 'react-string-replace';
import { VTag } from '@/components/VTag';

type InventoryCardProps = {
  characterClient: CharacterClient;
};

export const InventoryCard: React.FC<InventoryCardProps> = props => {
  const theme = useVTheme();

  return (
    <>
      <VCard style={{ padding: 0 }}>
        <VTable
          columns={[
            {
              key: 'name',
              render: item => (
                <VFlex gap={theme.variable.gap.md} align="center">
                  {item.name}
                  <VNumberInput
                    value={item.quantity}
                    onChange={value => props.characterClient.setItemQuantity(item.key, value)}
                  />
                </VFlex>
              )
            },
            {
              key: 'description',
              render: item => (
                <ItemDescription characterClient={props.characterClient} item={item} />
              ),
              width: '100%'
            },
            {
              key: 'weight',
              render: item =>
                item.weight && (
                  <VFlex gap={theme.variable.gap.sm} align="center" justify="end">
                    {(item.quantity * item.weight).toFixed(2)}
                    <WeightIcon fontSize={20} />
                  </VFlex>
                )
            }
          ]}
          rows={props.characterClient.items}
          emptyMessage="You have no inventory items."
        />
      </VCard>
    </>
  );
};

type ItemDescriptionProps = {
  characterClient?: CharacterClient | CombatantClient;
  item: Item;
  style?: React.CSSProperties;
};

export const ItemDescription: React.FC<ItemDescriptionProps> = props => {
  const theme = useVTheme();

  const rollModal = useRollModal();

  const characterId =
    props.characterClient && 'id' in props.characterClient ? props.characterClient.id : '';

  const onRollSkill = () => {
    if (!props.characterClient) return;

    const attribute = props.characterClient.attributes[props.item.bonus!.attributeKey];
    const skill = attribute.skills[props.item.bonus!.skillKey];

    const diceFactors: DiceFactor[] = [
      {
        label: attribute.label,
        value: attribute.value
      },
      {
        label: skill.label,
        value: skill.value
      },
      {
        label: props.item.name,
        value: props.item.bonus!.skillBonus
      }
    ];

    if ('exhaustion' in props.characterClient && props.characterClient.exhaustion) {
      diceFactors.push({
        label: 'Exhaustion',
        value: -props.characterClient.exhaustion
      });
    }

    rollModal.open({
      characterId,
      characterName: props.characterClient.name,
      label: props.item.name,
      diceFactors,
      evaluation: RollEvaluation.CHECK
    });
  };

  const onRollDamage = () => {
    if (!props.characterClient) return;

    rollModal.open({
      characterId,
      characterName: props.characterClient.name,
      label: props.item.name,
      diceFactors: [{ label: 'Damage', value: props.item.damage! }],
      evaluation: RollEvaluation.SUM
    });
  };

  // replace any special traits
  const notes = reactStringReplace(props.item.notes, /\[(.*?=.*?)\]/g, (match, i) => {
    const [name, description] = match.split('=');
    return (
      <VTag
        key={`special#${i}`}
        style={{ display: 'inline-block', cursor: 'pointer' }}
        title={description}
      >
        {name}
      </VTag>
    );
  });

  return (
    <VFlex gap={theme.variable.gap.sm} align="center" style={{ lineHeight: 1, ...props.style }}>
      {props.item.bonus && (
        <RollableSkill
          value={props.item.bonus.skillBonus}
          valueLabel={`${props.item.bonus.skillBonus >= 0 ? '+' : ''}${props.item.bonus.skillBonus}`}
          label={`${capitalize(props.item.bonus.skillKey)}${props.item.damage || props.item.notes ? ',' : ''}`}
          disabled
          style={{ gap: theme.variable.gap.sm, fontSize: 'inherit' }}
          onClick={onRollSkill}
        />
      )}
      {props.item.damage && (
        <RollableSkill
          value={props.item.damage}
          valueLabel={`${props.item.damage}D6`}
          label={`damage${props.item.notes ? ',' : ''}`}
          disabled
          style={{ gap: theme.variable.gap.sm, fontSize: 'inherit' }}
          onClick={onRollDamage}
        />
      )}
      <div style={{ lineHeight: theme.variable.lineHeight }}>{notes}</div>
    </VFlex>
  );
};
