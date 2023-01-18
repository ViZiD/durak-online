import React from 'react';
import styled from 'styled-components';

const Positon = styled.div`
  position: relative;
  left: 45.5px;
  top: 0px;
  color: #f25800;
`;

export default function App() {
  const test_unicode = '\u{1F0DD}';
  return <Positon>test {test_unicode}</Positon>;
}
