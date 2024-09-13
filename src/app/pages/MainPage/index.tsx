import React from 'react';
import { Box } from '@mui/material';
import styles from './index.module.css';
import { riddles } from 'app/utils/riddles';
import { RiddleDialog } from 'app/components/RiddleDialog';

export const MainPage = () => {
  return (
    <Box className={styles.root}>
      <Box className={styles.grid}>
        {riddles.map((riddle) => (
          <RiddleDialog key={riddle.color} riddle={riddle} />
        ))}
      </Box>
    </Box>
  );
};
