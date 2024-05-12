import React, { useEffect, useMemo, useState } from 'react';
import { PageHeader } from '@/common/PageHeader';
import { PageLayout } from '@/common/PageLayout';
import { VButton } from '@/components/VButton';
import { ReactComponent as TrashCanIcon } from '@/icons/TrashCan.svg';
import { ReactComponent as PlusIcon } from '@/icons/Plus.svg';
import styled from 'styled-components';
import { VFlex } from '@/components/VFlex';
import { useVTheme } from '@/common/VTheme';
import { useGetSessionQuery } from '@/pages/vtt/queries/useGetSessionQuery';
import { useParams } from 'react-router-dom';
import { useVTTUser } from '@/common/VTTUser';
import { Session } from '../../types/Session';
import { debounce } from 'lodash-es';
import { useUpdateSessionMutation } from '../../queries/useUpdateSessionMutation';
import { SavedStatus } from '../../SavedStatus';
import { AddSessionCharacterModal } from './AddSessionCharacterModal';
import { DeleteSessionModal } from './DeleteSessionModal';
import { VHeader } from '@/components/VHeader';
import { useSessionCharacters } from '../../queries/useSessionCharacters';
import { CharacterCard } from '../../characters/CharacterCard';
import { VLoader } from '@/components/VLoader';

const StyledSessionPage = styled(PageLayout)`
  .page__pageHeader__titleInput {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    color: inherit;
    font-size: inherit;
    font-family: inherit;
    height: 100%;

    &::placeholder {
      color: ${props => props.theme.color.text.tertiary};
    }
  }

  .page__section {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.variable.gap.lg};

    .section__empty {
      color: ${props => props.theme.color.text.secondary};
    }
  }

  .section__characters {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: ${props => props.theme.variable.gap.lg};
  }
`;

export const SessionPage: React.FC = () => {
  const { sessionId } = useParams();
  const theme = useVTheme();
  const user = useVTTUser();

  const [session, setSession] = useState<Session>();
  const [saved, setSaved] = useState(true);

  const [deleteSessionModalOpen, setDeleteSessionModalOpen] = useState(false);
  const [addSessionCharacterModalOpen, setAddSessionCharacterModalOpen] = useState(false);

  const { data: savedSession } = useGetSessionQuery(sessionId);
  useMemo(() => {
    if (savedSession && !session) {
      setSession(savedSession);
    }
  }, [savedSession]);

  const { data: characters } = useSessionCharacters(sessionId);

  const { mutateAsync: _updateSession } = useUpdateSessionMutation(sessionId);
  const updateSession = useMemo(
    () => debounce((session: Session) => _updateSession({ session }), 2000),
    []
  );

  // updated saved state and debounce save query when needed
  useEffect(() => {
    if (session && savedSession) {
      const saved = session.name === savedSession.name;
      setSaved(saved);
      if (saved) {
        updateSession.cancel();
      } else {
        updateSession(session);
      }
    }
  }, [session, savedSession]);

  const canEdit = user.authenticated && user.id === session?.userId;

  return (
    <StyledSessionPage>
      <PageHeader
        breadcrumbs={['Virtual Tabletop', 'Sessions']}
        title={
          session && (
            <input
              value={session.name}
              placeholder="Unnamed Session"
              onChange={event =>
                setSession(session => session && { ...session, name: event.target.value })
              }
              className="page__pageHeader__titleInput"
              disabled={!canEdit}
            />
          )
        }
        extra={
          <>
            <VButton onClick={() => setAddSessionCharacterModalOpen(true)}>
              <PlusIcon />
              Add character
            </VButton>

            {canEdit && (
              <VFlex vertical align="end" gap={theme.variable.gap.md}>
                <SavedStatus saved={saved} />
                <VButton onClick={() => setDeleteSessionModalOpen(true)} disabled={!saved}>
                  <TrashCanIcon /> Delete session
                </VButton>
              </VFlex>
            )}
          </>
        }
      />

      {!characters ? (
        <VLoader />
      ) : (
        <div className="page__section">
          <VHeader>Characters</VHeader>

          {characters.length ? (
            <div className="section__characters">
              {characters.map(character => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>
          ) : (
            <div className="section__empty">Add a character to the session to get started.</div>
          )}
        </div>
      )}

      <DeleteSessionModal
        open={deleteSessionModalOpen}
        onClose={() => setDeleteSessionModalOpen(false)}
        sessionId={sessionId}
      />

      <AddSessionCharacterModal
        open={addSessionCharacterModalOpen}
        onClose={() => setAddSessionCharacterModalOpen(false)}
        sessionId={sessionId}
      />
    </StyledSessionPage>
  );
};
