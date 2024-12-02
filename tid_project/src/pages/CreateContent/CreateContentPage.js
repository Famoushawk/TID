import React, { useState } from "react";
import { ThreadProvider } from "../Frame4/ThreadContext"
import { useNavigate } from 'react-router-dom';
import { 
  ContentPageContainer, 
  PageTitle, 
  FormContainer, 
  SectionTitle, 
  FormGroup, 
  Label, 
  Input, 
  Textarea, 
  Button, 
  ButtonGroup,
} from './CreateContent.styles';
import { BlogProvider } from "../ContentPages/BlogContext";
import { VideoProvider } from "../ContentPages/VideoContext";


const CreateContentPage = () => {
  const [type, setType] = useState("blog");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || loading) return;

    setLoading(true);
    try {
      if (type === "blog") {
        await BlogProvider.createBlogPost(title, content);
      } else if (type === "video") {
        await VideoProvider.createVideo(title, content);
      } else if (type === "debate") {
        await ThreadProvider.createThread(title, content);
      }
      setTitle("");
      setContent("");

      navigate("/frame3");
    } catch (error) {
      console.error("Error creating content:", error);
    } finally{
        setLoading(false);
    }
  };

  return (
    <ContentPageContainer>
      <PageTitle>Create New Content</PageTitle>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <SectionTitle>Type</SectionTitle>
            <Label>
              Select Content Type:  
              <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="blog">Blog Post</option>
                <option value="video">Video</option>
                <option value="debate">Debate</option>
              </select>
            </Label>
          </FormGroup>

          <FormGroup>
            <SectionTitle>Title</SectionTitle>
            <Label>
              Enter Title:
              <Input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </Label>
          </FormGroup>

          <FormGroup>
            <SectionTitle>Content</SectionTitle>
            <Label>
              Enter Content:
              <Textarea 
                value={content} 
                onChange={(e) => setContent(e.target.value)} 
                required 
              />
            </Label>
          </FormGroup>

          <ButtonGroup>
            <Button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Submit"}
            </Button>
            <Button type="button" onClick={() => navigate("/frame3")}>
              Cancel
            </Button>
          </ButtonGroup>
        </form>
      </FormContainer>
    </ContentPageContainer>
  );
};

export default CreateContentPage;