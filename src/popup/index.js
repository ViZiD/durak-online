import React from 'react';
import { createRoot } from 'react-dom/client';
import styled from 'styled-components';

const Popup = styled.div`
  background-color: #44014c;
  width: 300px;
  min-height: 200px;
  margin: 30px auto;
  box-sizing: border-box;
`;

function App() {
  return (
    <Popup>
      <p className="count">count:</p>
      <button>{'CLick me!'}</button>
    </Popup>
  );
}

const root = createRoot(document.getElementById('popup'));
root.render(<App />);
