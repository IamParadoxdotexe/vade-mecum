import React from 'react';
import styled from 'styled-components';
import { VCard } from '@/components/VCard';
import { useVTheme } from '@/common/VTheme';
import { VFlex } from '@/components/VFlex';
import { useCharacterClient } from '@/pages/vtt/characters/character/useCharacterClient';
import { NumberInputOverMax } from '@/pages/vtt/characters/character/cards/NumberInputOverMax';
import { VTag } from '@/components/VTag';
import classNames from 'classnames';
import { EncounterParticipant, isCharacterParticipant } from '@/pages/vtt/types/Encounter';
import { useSessionCharacterQuery } from '@/pages/vtt/queries/useSessionCharacterQuery';
import { opacify } from 'polished';

const StyledEncounterParticipantCard = styled(VCard)`
  max-width: 400px;

  &.card--bloodied {
    border-color: ${props => props.theme.color.status.error.border};
    background-color: ${props => props.theme.color.status.error.background};

    &:hover {
      background-color: ${props => opacify(0.1, props.theme.color.status.error.background)};
    }

    input,
    .card__stat {
      background-color: ${props => props.theme.color.status.error.background};
    }
  }

  &.card--incapacitated {
    opacity: 0.6;
  }
`;

type EncounterParticipantCardProps = {
  sessionId: string | undefined;
  participant: EncounterParticipant;
  onClick?: () => void;
  style?: React.CSSProperties;
};

export const EncounterParticipantCard: React.FC<EncounterParticipantCardProps> = props => {
  const theme = useVTheme();

  const participant = props.participant;

  const { data: character } = useSessionCharacterQuery(
    props.sessionId,
    isCharacterParticipant(participant) ? participant.characterId : undefined
  );

  const characterClient = useCharacterClient(character);

  const name = characterClient?.name;
  const speed = characterClient?.speed ?? 0;
  const healthPoints = characterClient?.healthPoints ?? 0;
  const setHealthPoints = characterClient?.setHealthPoints;
  const maxHealthPoints = characterClient?.maxHealthPoints ?? 0;

  const incapacitated = healthPoints === 0;
  const bloodied = !incapacitated && healthPoints <= maxHealthPoints / 2;

  const className = classNames({
    'card--bloodied': bloodied,
    'card--incapacitated': incapacitated
  });

  return (
    <StyledEncounterParticipantCard
      onClick={props.onClick}
      className={className}
      style={props.style}
    >
      <VFlex justify="space-between" align="center">
        <VFlex vertical gap={theme.variable.gap.md}>
          <div style={{ fontWeight: 600 }}>{name || 'Unnamed Character'}</div>
          <VFlex gap={theme.variable.gap.md}>
            <VTag className="card__stat">
              <strong>INIT</strong> {participant.initiative || '—'}
            </VTag>
            <VTag className="card__stat">
              <strong>SPEED</strong> {speed * 5}ft
            </VTag>
          </VFlex>
        </VFlex>

        <NumberInputOverMax
          size={44}
          value={healthPoints}
          onChange={setHealthPoints}
          max={maxHealthPoints}
          disabled
        />
      </VFlex>
    </StyledEncounterParticipantCard>
  );
};