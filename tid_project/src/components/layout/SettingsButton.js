import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from './Layout.styles';

const SettingsButton = () => {
  const navigate = useNavigate();

  return (
    <IconButton onClick={() => navigate('/settings')}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/5f40718e6da41294f035e41818bdec52408146f5125a6b7fa2b8ab2221e89006"
        alt="Settings"
        style={{ width: '100%', aspectRatio: '1', objectFit: 'contain' }}
      />
    </IconButton>
  );
};

export default SettingsButton;