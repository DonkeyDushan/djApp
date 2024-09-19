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
  useEffect(() => {
    const handlePlay = () => setPaused(false);
    const handlePause = () => setPaused(true);
    const handleEnd = () => {
      if (!src.includes('Custom') && checked) {
        handleLoopAudio(audio, src);
      }
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnd);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [audio, checked, handleLoopAudio, src]);

  useEffect(() => {
    audio.loop = checked && audio.src.includes('Custom');
    if (!checked) audio.pause();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  return (
    <Stack justifyContent={'center'} color={'#000'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center' }}>
          <Checkbox checked={checked} onClick={onClick} sx={{ svg: { color: '#3267f4' } }} />
          {text}
        </Box>

        <IconButton
          onClick={() => {
            if (paused) {
              audio.play();
            } else {
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
