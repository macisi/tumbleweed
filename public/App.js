import { hot } from 'react-hot-loader';
import styled from 'styled-components';

const Wrapper = styled.div`
  background-color: #ccc;
  font-size: 24px;
`;

const App = () => {
  return <Wrapper>Weibo Client</Wrapper>;
};

export default hot(module)(App);
