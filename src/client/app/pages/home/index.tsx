import * as React from 'react';
import { Container } from './components';

interface IProps {
  children?: React.ReactChild;
}

const Home: React.FC<IProps> = () => <Container>Home</Container>;

export default Home;
