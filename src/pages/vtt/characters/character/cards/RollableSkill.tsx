import { useVTheme } from '@/common/VTheme';
import { VNumberInput } from '@/components/VNumberInput';
import { VTag } from '@/components/VTag';
import React from 'react';
import styled from 'styled-components';

const StyledRollableSkill = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.variable.gap.md};
  font-size: ${props => props.theme.variable.fontSize.xs};
  line-height: 1;

  .skill__label {
    flex: 1;
    padding-block: 3px;
    transition: color ease 150ms;
    text-decoration: underline;
    text-decoration-color: ${props => props.theme.color.text.secondary};

    &:hover {
      color: ${props => props.theme.color.brand.default};
      cursor: pointer;
    }
  }
`;

type RollableSkillProps = {
  label: string;
  value: number;
  valueLabel?: string;
  max?: number;
  onChange?: (value: number) => void;
  onClick?: () => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  hideZero?: boolean;
};

export const RollableSkill: React.FC<RollableSkillProps> = props => {
  const theme = useVTheme();

  return (
    <StyledRollableSkill style={props.style}>
      {props.valueLabel ? (
        <VTag style={{ fontFamily: theme.variable.fontFamily.display }}>{props.valueLabel}</VTag>
      ) : props.value || !props.hideZero ? (
        <VNumberInput
          value={props.value}
          onChange={props.onChange}
          max={props.max}
          disabled={props.disabled}
        />
      ) : null}
      <div className="skill__label" onClick={props.onClick}>
        {props.label}
      </div>
    </StyledRollableSkill>
  );
};
