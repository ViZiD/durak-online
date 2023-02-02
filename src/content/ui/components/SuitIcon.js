import React from 'react';
import styled from 'styled-components';

import Hearts from '../../../assets/suits/hearts.svg';
import Diamonds from '../../../assets/suits/diamonds.svg';
import Clubs from '../../../assets/suits/clubs.svg';
import Spades from '../../../assets/suits/spades.svg';

const IconStyle = styled.div`
  svg {
    width: 27px;
    height: 27px;
  }
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-left: 0.3em;
  margin-right: 0.3em;
`;

const icons = {
  hearts: (
    <IconStyle>
      <Hearts />
    </IconStyle>
  ),
  diamonds: (
    <IconStyle>
      <Diamonds />
    </IconStyle>
  ),
  clubs: (
    <IconStyle>
      <Clubs />
    </IconStyle>
  ),
  spades: (
    <IconStyle>
      <Spades />
    </IconStyle>
  ),
};

export const SuitIcon = (props) => {
  const { suit } = props;
  return icons[suit];
};
