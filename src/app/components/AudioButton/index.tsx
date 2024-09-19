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
    const handleEnd = () => {
      if (!src.includes('Custom') && checked) {
        handleLoopAudio(audio, src);
      } else {
        setPaused(true);
      }
    };

    audio.addEventListener('ended', handleEnd);
    audio.addEventListener('paused', () => {
      setPaused(true);
    });
    audio.addEventListener('play', () => {
      setPaused(false);
    });
    return () => {
      audio.removeEventListener('ended', handleEnd);
      audio.removeEventListener('paused', handleEnd);
      audio.removeEventListener('play', handleEnd);
    };
  }, [audio, checked, handleLoopAudio, src]);

  useEffect(() => {
    audio.loop = checked && audio.src.includes('Custom');
    if (!checked) setPaused(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checked]);

  useEffect(() => {
    if (paused) audio.pause();
    if (!paused) audio.play();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paused]);

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
              setPaused(false);
            } else {
              setPaused(true);
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
