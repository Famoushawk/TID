import React from 'react';
import { WhiteBackground } from '../../components/layout/Layout.styles';
import Content from './Content';
import { ThreadProvider } from './ThreadContext';

const Frame4 = () => {
  console.log('Frame4 component rendering');
  return (
    <ThreadProvider>
      <WhiteBackground>
        <Content />
      </WhiteBackground>
    </ThreadProvider>
  );
};

export default Frame4;