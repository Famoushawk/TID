import React from 'react';
import { WhiteBackground } from '../../components/layout/Layout.styles';
import Content from './Content';
import { ThreadProvider } from './ThreadContext';

const Frame4 = () => {
  return (
    <ThreadProvider>
      <WhiteBackground>
        <Content />
      </WhiteBackground>
    </ThreadProvider>
  );
};

export default Frame4;