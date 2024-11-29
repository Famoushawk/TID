import React, {useState} from 'react';
import { WhiteBackground } from '../../components/layout/Layout.styles';
import FiltersLine from "./FiltersLine";
import CardGrid from "./Card";

const Frame3 = () => {
  const [filter, setFilter] = useState("All");

  return (
      <WhiteBackground>
        <FiltersLine currentFilter={filter} onFilterChange={setFilter} />
        <CardGrid filter={filter} />
      </WhiteBackground>
  );
};

export default Frame3;
