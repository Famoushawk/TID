import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { BlogPostService } from "../../api/services/BlogPostService";
import { VideoService } from "../../api/services/VideoService";

const SingleContentPage = () => {
  const { id, type } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);

        let response;
        if (type === "Video") {
          response = await VideoService.getVideo(id);
        } else if (type === "Blog") {
          response = await BlogPostService.getBlogPost(id);
        }

        setContent(response);
        setError(null);
      } catch (err) {
        console.error("Error fetching content:", err);
        setError("Failed to load content.");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [id, type]);


  if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
  if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
  if (!content) return <ErrorMessage>Content not found.</ErrorMessage>;

  return (
    <ContentContainer>
      <BackButton onClick={() => navigate("/contentpage")}>Back</BackButton>
      <ContentTitle>{content.title}</ContentTitle>
      <ContentBody>{content.content || "No content available."}</ContentBody>
    </ContentContainer>
  );
};

const ContentContainer = styled.div`
    border-radius: 28px;
    background: var(--Schemes-Surface-Container-Lowest, #fff);
    display: flex;
    margin-top: 16px;
    min-height: 652px;
    flex-direction: column;
    @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const BackButton = styled.button`
    margin: 16px;
    padding: 8px 16px;
    background-color: ${({ theme }) => theme.colors.primary};
    border: none;
    border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
    cursor: pointer;

    &:hover {
        background-color: ${({ theme }) => theme.colors.secondary};
    }
`;

const ContentTitle = styled.h1`
    font-size: 2rem;
    margin-left: 20px;
    margin-bottom: 5px;
  `;


const ContentBody = styled.div`
    font-size: 1rem;
    margin-left: 30px;
    line-height: 1.5;
  `;

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    margin-top: 50px;
  `;

const ErrorMessage = styled.div`
    text-align: center;
    font-size: 1.5rem;
    color: red;
    margin-top: 50px;
  `;

export default SingleContentPage;