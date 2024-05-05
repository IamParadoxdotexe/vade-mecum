import { VTransition } from '@/components/VTransition';
import React from 'react';
import styled, { css } from 'styled-components';
import { RollCard } from './RollCard';
import { Roll, RollEvaluation } from '../types/Roll';

export const ROLL_LOG_WIDTH = '256px';

const StyledRollLog = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  border-left: 1px solid ${props => props.theme.color.border.default};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: -4px 0 16px ${props => props.theme.color.shadow.default};
  background: ${props => props.theme.color.background.default};
  z-index: 100;
  width: ${ROLL_LOG_WIDTH};

  .rollLog__header {
    display: flex;
    justify-content: center;
    font-family: ${props => props.theme.variable.fontFamily.display};
    font-size: ${props => props.theme.variable.fontSize.xl};
    padding: ${props => props.theme.variable.gap.lg};
    border-bottom: 1px solid ${props => props.theme.color.border.default};
  }

  .rollLog__log {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    position: relative;
    flex: 1;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      width: 100%;
      height: 64px;
      background-image: linear-gradient(
        ${props => props.theme.color.background.default} 0%,
        transparent 100%
      );
      z-index: 1;
    }

    .log__rolls {
      display: flex;
      flex-direction: column-reverse;
      align-items: center;
      gap: ${props => props.theme.variable.gap.lg};
      padding: ${props => props.theme.variable.gap.lg} 0;
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      scrollbar-gutter: stable both-edges;

      > div {
        flex-shrink: 0;
      }
    }

    .log__session {
      width: 100%;
      text-align: center;
      padding: ${props => props.theme.variable.gap.lg};
      font-size: ${props => props.theme.variable.fontSize.sm};
      border-top: 1px solid ${props => props.theme.color.border.default};
      line-height: ${props => props.theme.variable.lineHeight};
    }
  }
`;

type RollLogProps = {
  sessionId?: string;
};

export const RollLog: React.FC<RollLogProps> = props => {
  const rolls: Roll[] = [
    {
      id: '1',
      characterId: '1',
      label: 'Valros Witherin (Power)',
      dice: [4, 4, 4, 3, 3, 1],
      diceFactor: [],
      timestamp: '',
      evaluation: RollEvaluation.CHECK
    }
  ];

  return (
    <StyledRollLog id="roll-log">
      <div className="rollLog__header">Roll Log</div>
      <div className="rollLog__log">
        <div className="log__rolls">
          {rolls.map(roll => (
            <VTransition
              key={roll.id}
              in
              outStyle={css`
                opacity: 0;
                transform: translateY(200px);
              `}
              inStyle={css`
                opacity: 1;
                transform: translateY(0);
              `}
              initialTransition
              timeout={300}
            >
              <RollCard roll={roll} />
            </VTransition>
          ))}
          {/* {sessionId && !rolls && <VLoader style={{ padding: 0 }} />} */}
        </div>
        {props.sessionId && (
          <div className="log__session">
            <strong>Unnamed Session</strong> #{props.sessionId.split('-')[0]}
          </div>
        )}
      </div>
    </StyledRollLog>
  );
};