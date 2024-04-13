import React, { ReactNode, useContext } from 'react';
import { useLocalStorage } from '@/utils/useLocalStorage';
import { useStateVersioner } from '@/utils/useStateVersioner';
import { useSession } from './useSession';
import { useMutation, useQuery } from 'react-query';
import { v4 as uuid } from 'uuid';
import { DateTime } from 'luxon';

export enum RollEvaluation {
  CHECK = 'CHECK',
  SUM = 'SUM'
}

export type Roll = {
  id: string;
  characterId: string;
  label: string;
  dice: number[];
  timestamp: string;
  evaluation: RollEvaluation;
};

type RollsState = {
  version: string;
  rolls: Roll[];
};

const DEFAULT_ROLLS_STATE: RollsState = {
  version: '3.0',
  rolls: []
};

interface RSC extends RollsState {
  update: (partialRollsState: Partial<RollsState>) => void;
}

const RollsStateContext = React.createContext<RSC>({
  ...structuredClone(DEFAULT_ROLLS_STATE),
  update: () => {}
});

export const RollsStateProvider: React.FC<{ children?: ReactNode }> = props => {
  const [rollsState, setRollsState] = useLocalStorage(
    'vc:engine:rolls',
    structuredClone(DEFAULT_ROLLS_STATE)
  );

  useStateVersioner(rollsState, setRollsState, DEFAULT_ROLLS_STATE);

  const update = (partialRollsState: Partial<RollsState>) =>
    setRollsState({ ...rollsState, ...partialRollsState });

  const rollsContext: RSC = {
    ...rollsState,
    update
  };

  return (
    <RollsStateContext.Provider value={rollsContext}>{props.children}</RollsStateContext.Provider>
  );
};

const MAX_ROLLS = 100;

export const useRolls = () => {
  const rollsState = useContext(RollsStateContext);
  const { sessionId, session } = useSession();

  const { data: sessionRolls } = useQuery<Roll[]>(
    ['GET_SESSION_ROLLS'],
    () =>
      fetch(`https://api.vademecum.thenjk.com/sessions/${session!.id}/rolls`).then(response =>
        response.json()
      ),
    {
      enabled: !!session
    }
  );

  const createSessionRoll = useMutation((roll: Roll) => {
    return fetch(`https://api.vademecum.thenjk.com/sessions/${sessionId}/rolls`, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(roll)
    }).then(response => response.json());
  });

  const addRoll = (roll: Omit<Roll, 'id'>) => {
    const newRoll = { id: uuid(), ...roll };
    if (session) {
      createSessionRoll.mutate(newRoll);
    } else {
      rollsState.update({
        rolls: [...rollsState.rolls, newRoll].slice(0, MAX_ROLLS)
      });
    }
  };

  const rolls = sessionId ? sessionRolls ?? [] : rollsState.rolls;
  rolls.sort((a, b) => (DateTime.fromISO(b.timestamp) > DateTime.fromISO(a.timestamp) ? 1 : -1));

  return {
    rolls: sessionId ? sessionRolls ?? [] : rollsState.rolls,
    addRoll
  };
};
