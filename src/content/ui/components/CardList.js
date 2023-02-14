import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { CardItem } from './CardItem';
import { SuitIcon } from './SuitIcon';

import { filterBySuit } from '../../../features/deck/selectors';

const ItemContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0.1em;
  padding-left: 0.3em;
  padding-right: 0.3em;
`;

export const CardList = ({ suit, id }) => {
  const cards = useSelector((state) => filterBySuit(state, suit));

  return (
    <ItemContainer id={id}>
      <SuitIcon suit={suit} />
      {cards.map((card) => {
        return <CardItem key={card.id} card={card} />;
      })}
      <SuitIcon suit={suit} />
    </ItemContainer>
  );
};
