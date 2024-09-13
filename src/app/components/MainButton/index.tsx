import React from 'react';
import { Button } from '@mui/material';
import { ColorsType } from 'app/utils/types';
import { colors } from 'app/utils/colors';
import styles from './index.module.css';

export const MainButton = ({ color }: { color: keyof ColorsType }) => {
  return (
    <Button
      variant="contained"
      className={styles.root}
      sx={{
        backgroundColor: colors[color],

        '&:hover': {
          backgroundColor: colors[color],
          outlineColor: `${colors[color]}4E !important`,
        },
      }}
    />
  );
};
