import React from 'react';
import styled from 'styled-components';

import TwoClubs from '../../../assets/cards/2-2.png';
import TwoSpades from '../../../assets/cards/2-3.png';
import TwoDiamonds from '../../../assets/cards/2-1.png';
import TwoHearts from '../../../assets/cards/2-0.png';
import ThreeHearts from '../../../assets/cards/3-0.png';
import ThreeSpades from '../../../assets/cards/3-3.png';
import ThreeClubs from '../../../assets/cards/3-2.png';
import ThreeDiamonds from '../../../assets/cards/3-1.png';
import FourClubs from '../../../assets/cards/4-2.png';
import FourHearts from '../../../assets/cards/4-0.png';
import FourSpades from '../../../assets/cards/4-3.png';
import FourDiamonds from '../../../assets/cards/4-1.png';
import FiveSpades from '../../../assets/cards/5-3.png';
import FiveDiamonds from '../../../assets/cards/5-1.png';
import FiveClubs from '../../../assets/cards/5-2.png';
import FiveHearts from '../../../assets/cards/5-0.png';
import SixClubs from '../../../assets/cards/6-2.png';
import SixSpades from '../../../assets/cards/6-3.png';
import SixHearts from '../../../assets/cards/6-0.png';
import SixDiamonds from '../../../assets/cards/6-1.png';
import SevenClubs from '../../../assets/cards/7-2.png';
import SevenHearts from '../../../assets/cards/7-0.png';
import SevenSpades from '../../../assets/cards/7-3.png';
import SevenDiamonds from '../../../assets/cards/7-1.png';
import EightClubs from '../../../assets/cards/8-2.png';
import EightDiamonds from '../../../assets/cards/8-1.png';
import EightHearts from '../../../assets/cards/8-0.png';
import EightSpades from '../../../assets/cards/8-3.png';
import NineHearts from '../../../assets/cards/9-0.png';
import NineSpades from '../../../assets/cards/9-3.png';
import NineClubs from '../../../assets/cards/9-2.png';
import NineDiamonds from '../../../assets/cards/9-1.png';
import TenHearts from '../../../assets/cards/10-0.png';
import TenClubs from '../../../assets/cards/10-2.png';
import TenSpades from '../../../assets/cards/10-3.png';
import TenDiamonds from '../../../assets/cards/10-1.png';
import JackClubs from '../../../assets/cards/11-2.png';
import JackSpades from '../../../assets/cards/11-3.png';
import JackHearts from '../../../assets/cards/11-0.png';
import JackDiamonds from '../../../assets/cards/11-1.png';
import QueenClubs from '../../../assets/cards/12-2.png';
import QueenSpades from '../../../assets/cards/12-3.png';
import QueenHearts from '../../../assets/cards/12-0.png';
import QueenDiamonds from '../../../assets/cards/12-1.png';
import KingSpades from '../../../assets/cards/13-3.png';
import KingHearts from '../../../assets/cards/13-0.png';
import KingDiamonds from '../../../assets/cards/13-1.png';
import KingClubs from '../../../assets/cards/13-2.png';
import AceHearts from '../../../assets/cards/14-0.png';
import AceSpades from '../../../assets/cards/14-3.png';
import AceClubs from '../../../assets/cards/14-2.png';
import AceDiamonds from '../../../assets/cards/14-1.png';

const cardIcons = {
  '2-2': TwoClubs,
  '2-3': TwoSpades,
  '2-1': TwoDiamonds,
  '2-0': TwoHearts,
  '3-0': ThreeHearts,
  '3-3': ThreeSpades,
  '3-2': ThreeClubs,
  '3-1': ThreeDiamonds,
  '4-2': FourClubs,
  '4-0': FourHearts,
  '4-3': FourSpades,
  '4-1': FourDiamonds,
  '5-3': FiveSpades,
  '5-1': FiveDiamonds,
  '5-2': FiveClubs,
  '5-0': FiveHearts,
  '6-2': SixClubs,
  '6-3': SixSpades,
  '6-0': SixHearts,
  '6-1': SixDiamonds,
  '7-2': SevenClubs,
  '7-0': SevenHearts,
  '7-3': SevenSpades,
  '7-1': SevenDiamonds,
  '8-2': EightClubs,
  '8-1': EightDiamonds,
  '8-0': EightHearts,
  '8-3': EightSpades,
  '9-0': NineHearts,
  '9-3': NineSpades,
  '9-2': NineClubs,
  '9-1': NineDiamonds,
  '10-0': TenHearts,
  '10-2': TenClubs,
  '10-3': TenSpades,
  '10-1': TenDiamonds,
  '11-2': JackClubs,
  '11-3': JackSpades,
  '11-0': JackHearts,
  '11-1': JackDiamonds,
  '12-2': QueenClubs,
  '12-3': QueenSpades,
  '12-0': QueenHearts,
  '12-1': QueenDiamonds,
  '13-3': KingSpades,
  '13-0': KingHearts,
  '13-1': KingDiamonds,
  '13-2': KingClubs,
  '14-0': AceHearts,
  '14-3': AceSpades,
  '14-2': AceClubs,
  '14-1': AceDiamonds,
};

const CardImg = styled.div`
  width: auto;
  height: 80px;
  overflow: hidden;
  border-radius: 2px;
  clip-path: inset(0 50% 50% 0);
  margin-right: -35px;
  img {
    flex: 1;
    height: 100%;
  }
`;
export const CardImage = ({ cardId }) => {
  card = cardIcons[cardId];
  return (
    <CardImg>
      <img src={card} />
    </CardImg>
  );
};
