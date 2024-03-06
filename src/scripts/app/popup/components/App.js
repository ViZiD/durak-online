import { useEffect, useState } from 'preact/hooks';
import styled from 'styled-components';

const TimeContainer = styled.div`
  padding: 4em;
  background: papayawhip;
`;
const TimeText = styled.div`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;
const App = () => {
  const [state, setState] = useState({ time: Date.now() });

  useEffect(() => {
    const timer = setInterval(() => {
      setState({ time: Date.now() });
    }, 1000);
    return () => clearInterval(timer);
  }, [state]);

  return (
    <TimeContainer>
      <TimeText>{new Date(state.time).toLocaleTimeString()}</TimeText>
    </TimeContainer>
  );
};

export default App;
