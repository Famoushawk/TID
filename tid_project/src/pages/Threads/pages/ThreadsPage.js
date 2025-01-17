import React from 'react';
import { WhiteBackground } from '../../../components/layout/Layout.styles';
import Content from './ThreadDetailPage';
import { ThreadProvider } from '../ThreadContext';

const Threads = () => {
  return (
    <ThreadProvider>
      <WhiteBackground>
        <Content />
      </WhiteBackground>
    </ThreadProvider>
  );
};

export default Threads;