// eslint-disable-next-line import/no-extraneous-dependencies
import { PauseCircle, PlayArrowRounded } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

type Types = {
  checked: boolean;
  onClick: () => void;
  audioObject: { text: string; src: string; audio: HTMLAudioElement };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleLoopAudio: any;
};

const AudioButton = ({ audioObject, checked, onClick, handleLoopAudio }: Types) => {
  const { audio, text, src } = audioObject;
  const [paused, setPaused] = useState(true);

  const handleEnd = () => {
    console.log(checked, src, 'ended');
    setPaused(true);
    if (!src.includes('Custom')) handleLoopAudio(audio, src);
  };

  useEffect(() => {
    audio.loop = checked && audio.src.includes('Custom');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  useEffect(() => {
    if (!paused && checked && audio.src.includes('Custom')) {
      audio.removeEventListener('ended', () => handleEnd());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused, checked]);

  return (
    <Stack justifyContent={'center'} color={'#000'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center' }}>
          <Checkbox checked={checked} onClick={onClick} sx={{ svg: { color: '#3267f4' } }} />
          {text}
        </Box>

        <IconButton
          onClick={() => {
            if (!audio.paused || !paused) {
              audio.pause();
              setPaused(true);
            } else {
              audio.play();
              setPaused(false);
            }
          }}
        >
          {paused || audio.paused ? (
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
