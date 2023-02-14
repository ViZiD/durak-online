import React from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectDeckTrumpSuit } from '../../../features/game/selectors';
import { durakSuitName } from '../../scripts/constants';

import { CardList } from './CardList';

const CardsContainer = styled.div`
  display: flex;
  flex-flow: column nowrap;
  padding-top: 0.3em;
  padding-bottom: 0.3em;
  #${(props) => props.suitName} {
    background-color: ${(props) => props.theme.colors.trumpsuit};
  }
`;

export const CardTable = () => {
  const deckTrumpSuit = useSelector(selectDeckTrumpSuit, shallowEqual);

  return (
    <CardsContainer suitName={durakSuitName[deckTrumpSuit]}>
      <CardList id={'hearts'} suit="hearts" />
      <CardList id={'diamonds'} suit="diamonds" />
      <CardList id={'clubs'} suit="clubs" />
      <CardList id={'spades'} suit="spades" />
    </CardsContainer>
  );
};
