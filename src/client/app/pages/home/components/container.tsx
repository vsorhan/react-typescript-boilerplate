import * as React from 'react';

interface IProps {
  children?: React.ReactChild;
}

const Container: React.FC<IProps> = ({ children }) => <div>{children}</div>;

export default Container;
