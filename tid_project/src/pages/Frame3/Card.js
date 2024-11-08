import React from "react";
import styled from "styled-components";

const cardData = [
  { title: "Blog post", date: "Updated today", type: "blog" },
  { title: "Video", date: "Updated yesterday", type: "video" },
  { title: "Debate", date: "Updated 2 days ago", type: "debate" },
  { title: "Video", date: "Updated today", type: "video" },
  { title: "Debate", date: "Updated yesterday", type: "debate" },
  { title: "Debate", date: "Updated 2 days ago", type: "debate" },
  { title: "Blog post", date: "Updated today", type: "blog" },
  { title: "Video", date: "Updated yesterday", type: "video" },
  { title: "Video", date: "Updated 2 days ago", type: "video" },
  { title: "Blog post", date: "Updated today", type: "blog" },
  { title: "Blog post", date: "Updated today", type: "blog" },
  { title: "Video", date: "Updated yesterday", type: "video" },
  { title: "Debate", date: "Updated 2 days ago", type: "debate" },
  { title: "Video", date: "Updated today", type: "video" },
  { title: "Debate", date: "Updated yesterday", type: "debate" },
  { title: "Debate", date: "Updated 2 days ago", type: "debate" },
  { title: "Blog post", date: "Updated today", type: "blog" },
  { title: "Video", date: "Updated yesterday", type: "video" },
  { title: "Video", date: "Updated 2 days ago", type: "video" },
  { title: "Debate", date: "Updated yesterday", type: "debate" },
  { title: "Debate", date: "Updated 2 days ago", type: "debate" },
];

function CardGrid() {
  return (
    <GridContainer>
      {cardData.map((card, index) => (
        <Card key={index}>
          <CardImage src="https://cdn.builder.io/api/v1/image/assets/TEMP/2d23df4276f92df3f4c284ccb58821f758e6ad1938c526deb3aedd30f0d776ad?placeholderIfAbsent=true&apiKey=d8134f90761a4e9db589863aef8c0d7c" alt={card.title} />
          <CardContent>
            <CardTitle>{card.title}</CardTitle>
            <CardDate>{card.date}</CardDate>
          </CardContent>
        </Card>
      ))}
    </GridContainer>
  );
}

const GridContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: start;
  gap: 16px 24px;
  justify-content: start;
  flex-wrap: wrap;
  padding: 0 24px 32px;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;

const Card = styled.article`
  display: flex;
  min-width: 120px;
  min-height: 160px;
  max-width: 220px;
  flex-direction: column;
  flex: 1;
  flex-basis: 0%;
`;

const CardImage = styled.img`
  aspect-ratio: 1.12;
  object-fit: contain;
  width: 134px;
  border-radius: 16px;
`;

const CardContent = styled.div`
  display: flex;
  margin-top: 4px;
  width: 100%;
  flex-direction: column;
  &:hover {
    background-color: #d1d5db;
  }
`;

const CardTitle = styled.h3`
  color: #1d1b20;
  text-overflow: ellipsis;
  letter-spacing: 0.1px;
  font: 500 14px/20px Roboto, sans-serif;
  margin: 0;
`;

const CardDate = styled.p`
  color: #49454f;
  text-overflow: ellipsis;
  letter-spacing: 0.4px;
  font: 400 12px/16px Roboto, sans-serif;
  margin: 0;
`;


export default CardGrid;