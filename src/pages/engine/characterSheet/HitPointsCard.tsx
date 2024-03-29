import React from 'react';
import { VCard } from '@/components/VCard';
import { VNumberInput } from '@/components/VNumberInput';
import styled from 'styled-components';
import { useCharacters } from '../useCharacters';

const StyledHitPointsCard = styled(VCard)`
  flex: 1;
  display: flex;
  align-items: center;

  .card__slash {
    font-size: 36px;
    font-weight: 200;
    padding-inline: 6px 3px;
  }

  .card__max {
    font-size: 24px;
  }
`;

export const HitPointsCard: React.FC = () => {
  const { currentCharacter } = useCharacters();

  return (
    <StyledHitPointsCard>
      <VNumberInput
        size={48}
        max={currentCharacter.maxHitPoints}
        value={currentCharacter.hitPoints}
        onChange={currentCharacter.setHitPoints}
      />
      <div className="card__slash">/</div>
      <div className="card__max">{currentCharacter.maxHitPoints}</div>
    </StyledHitPointsCard>
  );
};
