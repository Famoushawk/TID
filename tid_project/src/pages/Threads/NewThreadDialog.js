import React, { useState } from 'react';
import styled from 'styled-components';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../components/ui/dialog';
import { useThread } from './ThreadContext';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  margin-top: ${({ theme }) => theme.spacing[4]};
`;

const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
  font-size: ${({ theme }) => theme.fontSizes.base};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.gray300};
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
  font-size: ${({ theme }) => theme.fontSizes.base};
  resize: vertical;
`;

const SubmitButton = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  border-radius: ${({ theme }) => theme.borderRadius.DEFAULT};
  border: none;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const NewThreadDialog = ({ isOpen, onClose }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const { createThread, refreshThreads } = useThread();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || loading) return;

    setLoading(true);
    try {
      await createThread(title, content);
      await refreshThreads();
      onClose();
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error creating thread:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Thread</DialogTitle>
        </DialogHeader>
        <Form onSubmit={handleSubmit}>
          <Input
            placeholder="Thread Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <TextArea
            placeholder="Thread Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <SubmitButton type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Thread'}
          </SubmitButton>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default NewThreadDialog;