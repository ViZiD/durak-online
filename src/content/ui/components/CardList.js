import React from 'react';
import styled from 'styled-components';
import { CardItem } from './CardItem';
import { SuitIcon } from './SuitIcon';

const ListContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 0.1em;
`;

export const CardList = (props) => {
  const { cards, suit } = props;

  return (
    <ListContainer>
      <SuitIcon suit={suit} />
      {cards.map((card) => {
        return <CardItem key={card.value + card.suit} card={card} />;
      })}
      <SuitIcon suit={suit} />
    </ListContainer>
  );
};
