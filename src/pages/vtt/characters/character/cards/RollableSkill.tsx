import { VNumberInput } from '@/components/VNumberInput';
import React from 'react';
import styled from 'styled-components';

const StyledRollableSkill = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.variable.gap.md};
  font-size: ${props => props.theme.variable.fontSize.xs};

  .skill__label {
    flex: 1;
    padding-block: 3px;
    transition: color ease 150ms;

    &:hover {
      color: ${props => props.theme.color.brand.default};
      cursor: pointer;
    }
  }
`;

type RollableSkillProps = {
  value: number;
  label: string;
  onChange?: (value: number) => void;
  max?: number;
  disabled?: boolean;
};

export const RollableSkill: React.FC<RollableSkillProps> = props => {
  return (
    <StyledRollableSkill>
      <VNumberInput
        value={props.value}
        onChange={props.onChange}
        max={props.max}
        disabled={props.disabled}
      />
      <div className="skill__label">{props.label}</div>
    </StyledRollableSkill>
  );
};