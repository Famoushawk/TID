import React from "react";
import Card from "./Card";

//Import cardData. Shouldn't be hardcoded. 
const cardData = [
{ type: 'Blog post', date: 'Updated today' },
  { type: 'Video', date: 'Updated yesterday' },
  { type: 'Debate', date: 'Updated 2 days ago' },
  { type: 'Video', date: 'Updated today' },
  { type: 'Debate', date: 'Updated yesterday' },
  { type: 'Debate', date: 'Updated 2 days ago' },
  { type: 'Blog post', date: 'Updated today' },
  { type: 'Video', date: 'Updated yesterday' },
  { type: 'Video', date: 'Updated 2 days ago' },
  { type: 'Blog post', date: 'Updated today' },
  { type: 'Blog post', date: 'Updated today' },
  { type: 'Video', date: 'Updated yesterday' },
  { type: 'Debate', date: 'Updated 2 days ago' },
  { type: 'Video', date: 'Updated today' },
  { type: 'Debate', date: 'Updated yesterday' },
  { type: 'Debate', date: 'Updated 2 days ago' },
  { type: 'Blog post', date: 'Updated today' },
  { type: 'Video', date: 'Updated 2 days ago' },
  { type: 'Blog post', date: 'Updated today' },
  { type: 'Video', date: 'Updated today' },
  { type: 'Debate', date: 'Updated yesterday' },
  { type: 'Debate', date: 'Updated 2 days ago' },
  { type: 'Blog post', date: 'Updated today' },
  { type: 'Blog post', date: 'Updated today' },
]

function CardGrid() {
    return (
      <section className="flex flex-wrap gap-4 items-start px-6 pb-8 w-full max-md:px-5 max-md:pb-9 max-md:max-w-full">
        {cardData.map((card, index) => (
          <Card key={index} type={card.type} date={card.date} />
        ))}
        {[...Array(5)].map((_, index) => (
          <div key={index + cardData.length} 
          className="w-64 h-80 bg-transparent"/>
        ))}
      </section>
    );
  }
  
  export default CardGrid;