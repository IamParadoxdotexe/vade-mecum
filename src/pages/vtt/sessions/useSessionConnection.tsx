import { propagateCharacter } from '@/pages/vtt/queries/useCharacterQuery';
import { propagateSessionRoll } from '@/pages/vtt/queries/useCreateSessionRollMutation';
import { propagateSessionCharacter } from '@/pages/vtt/queries/useSessionCharacterQuery';
import { propagateSessionEncounter } from '@/pages/vtt/queries/useSessionEncounterQuery';
import { Character } from '@/pages/vtt/types/Character';
import { Encounter } from '@/pages/vtt/types/Encounter';
import { Roll } from '@/pages/vtt/types/Roll';
import React, { ReactNode, useContext, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';

type SessionConnectionMessage = {
  event: string;
  data: object;
};

type _SessionConnectionContext = {
  sessionId?: string;
  connect: (sessionId: string) => void;
  disconnect: () => void;
};

const SessionConnectionContext = React.createContext<_SessionConnectionContext>({
  connect: () => {},
  disconnect: () => {}
});

export const SessionConnectionProvider: React.FC<{ children: ReactNode }> = props => {
  const queryClient = useQueryClient();

  const [sessionId, setSessionId] = useState<string>();
  const [webSocket, setWebSocket] = useState<WebSocket>();

  const ping = () => {
    setWebSocket(webSocket => {
      if (webSocket) {
        webSocket.send(JSON.stringify({ action: 'ping' }));
        setTimeout(ping, 60000);
      }
      return webSocket;
    });
  };

  // open WebSocket connection for session
  useEffect(() => {
    if (webSocket) {
      // we're either leaving a session or switching sessions
      webSocket.close();
    }

    if (sessionId) {
      const webSocket = new WebSocket(`wss://ws.vademecum.thenjk.com?sessionId=${sessionId}`);

      webSocket.onmessage = messageEvent => {
        const message: SessionConnectionMessage = JSON.parse(messageEvent.data);

        if (message.event === 'ROLL_CREATED') {
          propagateSessionRoll(queryClient, sessionId!, message.data as Roll);
        } else if (message.event === 'ROLLS_DELETED') {
          queryClient.setQueryData(['GET_SESSION_ROLLS', sessionId], []);
        } else if (message.event === 'ENCOUNTER_UPDATED') {
          propagateSessionEncounter(queryClient, sessionId!, message.data as Encounter);
        } else if (message.event === 'CHARACTER_UPDATED') {
          propagateCharacter(queryClient, message.data as Character, true);
          propagateSessionCharacter(queryClient, sessionId, message.data as Character);
        } else if (message.event === 'PONG') {
          // keep alive!
        } else {
          console.log(`Unhandled ${message.event} message received.`);
        }
      };

      webSocket.onopen = () => {
        console.log(`Connected to session #${sessionId.split('-')[0]}.`);
        setWebSocket(webSocket);

        // ping server every minute to keep WebSocket alive
        setTimeout(ping, 60000);
      };

      webSocket.onclose = () => {
        console.log(`Disconnected from session #${sessionId.split('-')[0]}.`);
        setWebSocket(undefined);
      };
    }
  }, [sessionId]);

  useEffect(() => {
    return () => {
      // cleanup web socket
      webSocket?.close();
    };
  }, [webSocket]);

  const context: _SessionConnectionContext = {
    sessionId,
    connect: setSessionId,
    disconnect: () => setSessionId(undefined)
  };

  return (
    <SessionConnectionContext.Provider value={context}>
      {props.children}
    </SessionConnectionContext.Provider>
  );
};

export const useSessionConnection = (sessionId?: string | null) => {
  const sessionConnectionContext = useContext(SessionConnectionContext);

  useEffect(() => {
    if (sessionId) {
      sessionConnectionContext.connect(sessionId);
    } else if (sessionId === null) {
      sessionConnectionContext.disconnect();
    }
  }, [sessionId]);

  return sessionConnectionContext;
};
