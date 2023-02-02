import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { CardList } from './CardList';
import {
  filterByHearts,
  filterByDiamonds,
  filterByClubs,
  filterBySpades,
} from '../../../features/deck/selectors';

const CardsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding: 0.5em;
`;

export const CardTable = () => {
  const hearts = useSelector(filterByHearts);
  const diamonds = useSelector(filterByDiamonds);
  const clubs = useSelector(filterByClubs);
  const spades = useSelector(filterBySpades);

  return (
    <CardsContainer>
      <CardList cards={hearts} suit="hearts" />
      <CardList cards={diamonds} suit="diamonds" />
      <CardList cards={clubs} suit="clubs" />
      <CardList cards={spades} suit="spades" />
    </CardsContainer>
  );
};
