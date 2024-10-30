import React from 'react';
import FiltersLine from './FiltersLine';
import CardGrid from './CardGrid';


const Frame3 = () => {
  return (
    <div className='flex'>
      <div className='flex-grow p-4 mr-[20px] bg-white rounded-lg'>
      <FiltersLine />
      <CardGrid />
      </div>
    </div> 
  );
};

export default Frame3;
