import React, { useState } from 'react';
import { Attribute, useEngineState } from '../EngineStateContext';
import styled from 'styled-components';
import { AttributeSkillCard } from '../AttributeSkillCard';
import { DiceRollCard } from './DiceRollCard';
import { VPopup } from '../../../components/VPopup';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

export const CharacterAttributesPanel: React.FC = () => {
  const { character, updateCharacter, update, diceRolls } = useEngineState();

  const [rolledAttribute, setRolledAttribute] = useState<Attribute>();
  const [rolledAttributeActive, setRolledAttributeActive] = useState(false);

  const rolledAttributeLabel = `${character.name || 'Anonymous'} (${rolledAttribute?.skills[0].label})`;

  return (
    <>
      <Panel>
        {character.attributes.map((attribute, i) => (
          <AttributeSkillCard
            key={attribute.label}
            attribute={attribute}
            onChange={attribute => {
              // update character attribute
              const attributes = [...character.attributes];
              attributes[i] = attribute;
              updateCharacter({ attributes });
            }}
            onClick={attribute => {
              setRolledAttribute(attribute);
              setRolledAttributeActive(true);
            }}
          />
        ))}
      </Panel>
      <VPopup
        open={rolledAttributeActive}
        onClose={() => {
          setRolledAttribute(undefined);
          setRolledAttributeActive(false);
        }}
      >
        <DiceRollCard
          label={rolledAttributeLabel}
          diceFactors={
            rolledAttribute && [
              {
                type: 'A',
                label: rolledAttribute.label,
                value: rolledAttribute.value,
                max: 6
              },
              {
                type: 'A',
                label: rolledAttribute.skills[0].label,
                value: rolledAttribute.skills[0].value,
                max: 3
              }
            ]
          }
          onRoll={roll => {
            const diceRoll = { label: rolledAttributeLabel, roll };
            update({
              diceRolls: [diceRoll, ...diceRolls].slice(0, 100)
            });
            setTimeout(() => setRolledAttributeActive(false), 1500);
          }}
        />
      </VPopup>
    </>
  );
};
