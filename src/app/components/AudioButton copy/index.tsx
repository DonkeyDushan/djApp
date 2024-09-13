// eslint-disable-next-line import/no-extraneous-dependencies
import { PauseCircle, PlayArrowRounded, StopCircleRounded } from '@mui/icons-material';
import { Checkbox, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';

type Types = {
  text: string;
  checked: boolean;
  /*  check: (checked: string) => void; */
  onClick: () => void;
  audio: HTMLAudioElement;
};

const AudioButton = ({ text, checked, onClick, audio }: Types) => {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const [paused, setPaused] = useState(true);

  const start = () => {
    audio.play();
  };
  const pause = () => {
    audio.pause();
  };
  const stop = () => {
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <Stack justifyContent={'center'} color={'#000'}>
      <Stack direction={'row'} alignItems={'center'}>
        <Checkbox checked={checked} onClick={onClick} />
        {text}

        <IconButton
          onClick={() => {
            if (!audio.paused) {
              pause();
              setPaused(true);
            } else {
              start();
              setPaused(false);
            }
          }}
        >
          {paused ? <PlayArrowRounded /> : <PauseCircle />}
        </IconButton>
        {!paused && (
          <IconButton
            onClick={() => {
              setPaused(true);
              stop();
            }}
          >
            <StopCircleRounded />
          </IconButton>
        )}
      </Stack>
    </Stack>
  );
};

export default AudioButton;
