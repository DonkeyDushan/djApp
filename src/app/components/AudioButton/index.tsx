// eslint-disable-next-line import/no-extraneous-dependencies
import { PauseCircle, PlayArrowRounded } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';

type Types = {
  text: string;
  checked: boolean;
  onClick: () => void;
  audio: HTMLAudioElement;
};

const AudioButton = ({ text, checked, onClick, audio }: Types) => {
  const [paused, setPaused] = useState(true);
  console.log(text, checked);

  return (
    <Stack justifyContent={'center'} color={'#000'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center' }}>
          <Checkbox checked={checked} onClick={onClick} sx={{ svg: { color: '#3267f4' } }} />
          {text}
        </Box>

        <IconButton
          onClick={() => {
            if (!audio.paused) {
              audio.pause();
              setPaused(true);
            } else {
              audio.play();
              setPaused(false);
            }
          }}
        >
          {(!checked && paused) || audio.paused ? (
            <PlayArrowRounded fontSize={'large'} />
          ) : (
            <PauseCircle fontSize={'large'} />
          )}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default AudioButton;
