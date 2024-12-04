import React from "react";
import styled from "styled-components";

function FiltersLine({ filterOptions = ["All", "Video", "Blog"], currentFilter, onFilterChange }) { //Perhaps add Debate as filter option again
  return (
    <FilterContainer>
      {filterOptions.map((option, index) => (
        <FilterButton key={index}
          onClick={() => onFilterChange(option)}
          className={currentFilter === option ? "active" : ""}>
          <ButtonContent>{option}</ButtonContent>
        </FilterButton>
      ))}
    </FilterContainer>
  );
}

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  gap: 4px;
  overflow: hidden;
  color: #49454f;
  text-align: center;
  letter-spacing: 0.1px;
  flex-wrap: wrap;
  padding: 16px 24px;
  font: 500 14px/20px Roboto, sans-serif;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const FilterButton = styled.button`
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #cac4d0;
  display: flex;
  min-height: 32px;
  overflow: hidden;
  white-space: nowrap;
  background: none;
  cursor: pointer;
  &:hover {
    background-color: #d1d5db;
  }
`;

const ButtonContent = styled.span`
  padding: 6px 16px;
`;

export default FiltersLine;