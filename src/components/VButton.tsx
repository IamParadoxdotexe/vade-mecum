import React, { ReactNode } from 'react';
import styled from 'styled-components';
import { VLoader } from './VLoader';
import classNames from 'classnames';

const Button = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${props => props.theme.color.text.primary};
  border-radius: ${props => props.theme.variable.borderRadius};
  font-family: ${props => props.theme.variable.fontFamily.default};
  font-weight: 500;
  width: 100%;
  z-index: 1;
  box-shadow: 2px 4px 16px ${props => props.theme.color.shadow.default};
  background-color: transparent;
  border: 1px solid ${props => props.theme.color.border.default};
  gap: ${props => props.theme.variable.gap.md};
  font-size: ${props => props.theme.variable.fontSize.md};
  padding: ${props => props.theme.variable.gap.md};
  user-select: none;
  line-height: 1;

  &.button--primary {
    background: ${props => props.theme.color.brand.default};
    border-color: ${props => props.theme.color.brand.default};
  }

  &.button--small {
    gap: ${props => props.theme.variable.gap.sm};
    font-size: ${props => props.theme.variable.fontSize.xs};
  }

  &.button--large {
    font-size: ${props => props.theme.variable.fontSize.lg};
    padding-inline: ${props => props.theme.variable.gap.lg};
  }

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 0;
    background-color: rgba(0, 0, 0, 0.15);
    z-index: -1;
    transition: width ease 450ms;
  }

  &:not(:disabled)&:hover::before {
    width: 100%;
  }

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

type VButtonProps = {
  children?: ReactNode;
  style?: React.CSSProperties;
  className?: string;
  type?: 'default' | 'primary';
  size?: 'default' | 'small' | 'large';
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
};

export const VButton: React.FC<VButtonProps> = props => {
  const className = classNames(props.className, {
    'button--primary': props.type === 'primary',
    'button--small': props.size === 'small',
    'button--large': props.size === 'large'
  });

  return (
    <Button
      style={props.style}
      className={className}
      onClick={props.onClick}
      disabled={props.disabled || props.loading}
    >
      {props.loading ? (
        <VLoader style={{ padding: 0 }} size={20} color={'#a2cceb'} />
      ) : (
        props.children
      )}
    </Button>
  );
};
