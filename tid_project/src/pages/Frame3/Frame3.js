import React from 'react';
import FiltersLine from './FiltersLine';
import CardGrid from './CardGrid';
import { WhiteBackground } from '../../components/layout/Layout.styles';

const Frame3 = () => {
  return (
      <WhiteBackground>
      <FiltersLine />
      <CardGrid />
      </WhiteBackground>
  );
};

export default Frame3;
