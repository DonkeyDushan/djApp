import React, { useState } from 'react';
import { Button } from '@mui/material';
import { RiddleType } from 'app/utils/types';
import styles from './index.module.scss';
import { colors } from 'app/utils/colors';
import { CheckIcon } from '../icons/CheckIcon';
import { DialogContent } from '../DialogContent';

export const RiddleDialog = ({ riddle }: { riddle: RiddleType }) => {
  const [open, setOpen] = useState(false);
  const [correct, setCorrect] = useState<undefined | false | true>();

  return (
    <>
      <Button
        className={styles.root}
        sx={{
          backgroundColor: colors[riddle.color],

          '&:hover': {
            backgroundColor: colors[riddle.color],
            outlineColor: `${colors[riddle.color]}4E !important`,
          },
        }}
        onClick={() => setOpen(true)}
      >
        {correct && <CheckIcon />}
      </Button>
      <DialogContent
        open={open}
        setOpen={setOpen}
        riddle={riddle}
        correct={correct}
        setCorrect={setCorrect}
      />
    </>
  );
};
