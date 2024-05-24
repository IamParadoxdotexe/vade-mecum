import React from 'react';
import { PageHeader } from '@/common/PageHeader';
import { PageLayout } from '@/common/PageLayout';
import { useParams } from 'react-router-dom';
import { CharacterSheet } from '@/pages/vtt/characters/character/CharacterSheet';
import { useSessionQuery } from '@/pages/vtt/queries/useSessionQuery';
import { useSessionCharacterQuery } from '../../queries/useSessionCharacterQuery';

export const SessionCharacterPage: React.FC = () => {
  const { sessionId, characterId } = useParams();

  const { data: session } = useSessionQuery(sessionId);
  const { data: character } = useSessionCharacterQuery(sessionId, characterId);

  return (
    <PageLayout>
      <PageHeader
        breadcrumbs={[
          'Virtual Tabletop',
          'Sessions',
          session ? session.name || 'Unnamed Session' : '...',
          'Characters'
        ]}
        title={character ? character.name || 'Unnamed Character' : ''}
      />

      <CharacterSheet character={character} />
    </PageLayout>
  );
};