import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, IconButton, TextField } from '@mui/material';
import styles from './index.module.scss';
import { CopyIcon } from '../icons/CopyIcon';
import { RiddleType } from 'app/utils/types';
import { CloseIcon } from '../icons/CloseIcon';

export interface DialogProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  riddle: RiddleType;
  correct: undefined | false | true;
  setCorrect: (correct: undefined | false | true) => void;
}

export const DialogContent = ({ open, setOpen, correct, setCorrect, riddle }: DialogProps) => {
  const [answer, setAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    if (!correct) {
      setAnswer('');
      setCorrect(undefined);
    }
    setShowHint(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleCheck = () => {
    setCorrect(answer === riddle.answer);
    if (answer === riddle.answer) {
      setShowHint(false);
    }
    if (answer !== riddle.answer) {
      setAnswer('');
    }
  };

  const copyContent = async () => {
    await navigator.clipboard.writeText(riddle.location);
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)} className={styles.dialog}>
      <IconButton
        aria-label="close"
        onClick={() => setOpen(false)}
        sx={{
          position: 'absolute',
          right: 8,
          top: -48,
        }}
      >
        <CloseIcon />
      </IconButton>
      {correct && riddle.question}
      <TextField
        className={styles.textField}
        value={answer}
        onChange={(e) => setAnswer(e.target.value.toUpperCase())}
        disabled={correct}
        onKeyDown={(e) => {
          if (e.code === 'Enter') handleCheck();
        }}
      />
      {showHint && <Box className={styles.instructions}>{`${riddle.hint}`}</Box>}
      {correct === false && (
        <Box className={styles.instructions}>
          {'To není odpověď, kterou chceme slyšet. Zkus to znovu :)'}
        </Box>
      )}
      {!correct && (
        <Box className={styles.buttonsWrapper}>
          {!showHint && (
            <Button
              onClick={() => {
                setShowHint(true);
                setCorrect(undefined);
              }}
            >
              Chci nápovědu
            </Button>
          )}
          <Button onClick={handleCheck} sx={{ gridColumn: 2 }}>
            Potvrdit odpověď
          </Button>
        </Box>
      )}
      {correct && (
        <Box className={styles.instructions} sx={{ fontWeight: 600 }}>
          {riddle.location}
          {riddle.location.includes('N,') && (
            <IconButton
              aria-label="copy"
              size="small"
              onClick={() => {
                copyContent();
              }}
            >
              <CopyIcon />
            </IconButton>
          )}
        </Box>
      )}
    </Dialog>
  );
};
