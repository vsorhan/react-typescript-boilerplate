import * as React from 'react';
import { Container } from './components';

interface IProps {
  children?: React.ReactChild;
}

const About: React.FC<IProps> = () => <Container>About</Container>;

export default About;
