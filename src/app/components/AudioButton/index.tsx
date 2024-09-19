// eslint-disable-next-line import/no-extraneous-dependencies
import { PauseCircle, PlayArrowRounded } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

type Types = {
  checked: boolean;
  onClick: () => void;
  audioObject: { text: string; src: string; audio: Howl };
};

const AudioButton = ({ audioObject, checked, onClick }: Types) => {
  const { audio, text, src } = audioObject;
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    const customEndListener = () => {
      setPaused(true);
    };

    const handlePlay = () => {
      setPaused(false);
      audio.off('end', customEndListener);
      audio.on('end', customEndListener);
    };
    const handlePause = () => setPaused(true);

    audio.on('play', handlePlay);
    audio.on('pause', handlePause);
    audio.on('stop', handlePause);

    return () => {
      audio.off('play', handlePlay);
      audio.off('pause', handlePause);
      audio.off('stop', handlePause);
      audio.off('end', customEndListener);
    };
  }, [audio, src]);

  return (
    <Stack justifyContent={'center'} color={'#000'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center' }}>
          <Checkbox checked={checked} onClick={onClick} sx={{ svg: { color: '#3267f4' } }} />
          {text}
        </Box>

        <IconButton
          onClick={() => {
            if (!audio.playing()) {
              setPaused(false);
              audio.play();
            } else {
              setPaused(true);
              audio.pause();
            }
          }}
        >
          {paused ? <PlayArrowRounded fontSize={'large'} /> : <PauseCircle fontSize={'large'} />}
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default AudioButton;
