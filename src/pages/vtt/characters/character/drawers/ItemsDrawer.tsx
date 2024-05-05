import React, { useState } from 'react';
import { VCard } from '@/components/VCard';
import { VDrawer, VDrawerProps } from '@/components/VDrawer';
import { VInput } from '@/components/VInput';
import { VTable } from '@/components/VTable';
import styled from 'styled-components';
import { VCheckbox } from '@/components/VCheckbox';
import { VHeader } from '@/components/VHeader';
import { searchObjects } from '@/utils/searchObjects';
import { Item, ItemType } from '@/pages/vtt/types/Item';
import { CharacterClient } from '../useCharacterClient';
import { WORLD_KIT } from '@/pages/vtt/types/WorldKit';
import { getItemDescription } from '../cards/InventoryCard';

const StyledItemsDrawer = styled(VDrawer)`
  .drawer__content {
    display: flex;
    flex-direction: column;
    gap: ${props => props.theme.variable.gap.lg};
    padding: ${props => props.theme.variable.gap.xl};
    overflow: auto;
    scrollbar-gutter: stable;

    .content__section {
      display: flex;
      flex-direction: column;
      gap: ${props => props.theme.variable.gap.md};
    }
  }
`;

type ItemsDrawerProps = Pick<VDrawerProps, 'open' | 'onClose'> & {
  characterClient: CharacterClient;
};

const ITEM_TYPE_SECTION_HEADERS: { [key in ItemType]: string } = {
  WEAPON: 'Weapons',
  ARMOR: 'Armor',
  TOOL: 'Tools',
  MEAL: 'Meals',
  LODGING: 'Lodging'
};

export const ItemsDrawer: React.FC<ItemsDrawerProps> = props => {
  const [searchQuery, setSearchQuery] = useState('');

  const isItemSelected = (itemKey: string) =>
    props.characterClient.items.some(item => item.key === itemKey);

  const toggleItem = (itemKey: string) => {
    if (isItemSelected(itemKey)) {
      props.characterClient.removeItem(itemKey);
    } else {
      props.characterClient.addItem(itemKey);
    }
  };

  const isItemAvailable = (item: Item) => {
    // non-armor items that are unweighted are not available
    return !!item.weight || item.type === ItemType.ARMOR;
  };

  const filteredItems = searchObjects(WORLD_KIT.items, ['name', 'notes'], searchQuery);

  return (
    <StyledItemsDrawer
      {...props}
      onClose={() => {
        setSearchQuery('');
        props.onClose?.();
      }}
      width={850}
      header="Items"
    >
      <div className="drawer__content">
        <VCard style={{ padding: 0 }}>
          <VInput placeholder="Search items..." value={searchQuery} onChange={setSearchQuery} />
        </VCard>
        {Object.keys(ItemType).map(type => {
          const filteredItemsOfType = filteredItems.filter(item => item.type === type);

          return filteredItemsOfType.length ? (
            <div key={type} className="content__section">
              <VHeader>{ITEM_TYPE_SECTION_HEADERS[type as ItemType]}</VHeader>
              <VCard style={{ padding: 0 }}>
                <VTable
                  columns={[
                    {
                      key: 'selected',
                      render: item => <VCheckbox checked={isItemSelected(item.key)} />
                    },
                    {
                      key: 'name',
                      dataKey: 'name'
                    },
                    {
                      key: 'cost',
                      render: item => `${item.cost} ${item.cost !== 'FREE' ? 'pcs' : ''}`
                    },
                    {
                      key: 'description',
                      render: item => getItemDescription(item),
                      width: '100%'
                    }
                  ]}
                  rows={filteredItemsOfType}
                  onRowClick={row => toggleItem(row.key)}
                  rowDisabled={item => !isItemAvailable(item)}
                />
              </VCard>
            </div>
          ) : null;
        })}
      </div>
    </StyledItemsDrawer>
  );
};