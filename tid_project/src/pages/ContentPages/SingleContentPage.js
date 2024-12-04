import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { VideoContext } from "../ContentPages/VideoContext";
import { BlogContext } from "../ContentPages/BlogContext";
import { ThreadContext } from "../Threads/ThreadContext";

const SingleContentPage = () => {
    const { id, type } = useParams();
    const { videos, loading: videoLoading, error: videoError } = useContext(VideoContext);
    const { blogPosts, loading: blogLoading, error: blogError } = useContext(BlogContext);
    const { threads, loading: threadLoading, error: threadError } = useContext(ThreadContext);
  
    const [content, setContent] = useState(null);
    const navigate = useNavigate();
  
    const loading = videoLoading || blogLoading || threadLoading;
    const error = videoError || blogError || threadError;
  
    useEffect(() => {
      if (loading) return;
  
      let selected;
      if (type === "Video") {
        selected = videos.find((video) => video.objectID === id);
      } else if (type === "Blog") {
        selected = blogPosts.find((post) => post.objectID === id);
      } else if (type === "Debate") {
        selected = threads.find((thread) => thread.objectID === id);
      }
  
      setContent(selected);
    }, [id, type, videos, blogPosts, threads, loading]);
  
    if (loading) return <LoadingMessage>Loading...</LoadingMessage>;
    if (error) return <ErrorMessage>Error: {error}</ErrorMessage>;
    if (!content) return <ErrorMessage>Content not found.</ErrorMessage>;
  
    return (
      <ContentContainer>
        <BackButton onClick={() => navigate("/frame3")}>Back</BackButton>
        <ContentTitle>{content.title}</ContentTitle>
        <ContentType>Type: {type}</ContentType>
        <ContentBody>{content.body || "No content available."}</ContentBody>
      </ContentContainer>
    );
  };
  
  const ContentContainer = styled.div`
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  `;
  
  const BackButton = styled.button`
    margin-bottom: 20px;
    padding: 10px 20px;
    background-color: #ddd;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  
    &:hover {
      background-color: #ccc;
    }
  `;
  
  const ContentTitle = styled.h1`
    font-size: 2rem;
    margin-bottom: 10px;
  `;
  
  const ContentType = styled.p`
    font-size: 1rem;
    color: #555;
    margin-bottom: 20px;
  `;
  
  const ContentBody = styled.div`
    font-size: 1rem;
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