import React from 'react';
import { WhiteBackground } from '../../components/layout/Layout.styles';
import FiltersLine from "./FiltersLine";
import CardGrid from "./Card";

const Frame3 = () => {
  return (
      <WhiteBackground>
        <FiltersLine />
        <CardGrid />
      </WhiteBackground>
  );
};

export default Frame3;
