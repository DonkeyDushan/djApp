// eslint-disable-next-line import/no-extraneous-dependencies
import { PauseCircle, PlayArrowRounded } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Slider, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

type Types = {
  checked: boolean;
  onClick: () => void;
  audioObject: { text: string; src: string; audio: Howl };
  slider: { src: string; volume: number; rate: number } | undefined;
};

const AudioButton = ({ audioObject, checked, onClick, slider }: Types) => {
  const { audio, text, src } = audioObject;
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(slider?.volume || 50);
  const [rate, setRate] = useState(slider?.rate || 10);

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
    const handleLoad = () => {
      setLoading(false);
    };
    const handleStop = () => {
      setPaused(true);
    };

    audio.on('play', handlePlay);
    audio.on('pause', handlePause);
    audio.on('stop', handleStop);
    audio.on('load', handleLoad);

    return () => {
      audio.off('play', handlePlay);
      audio.off('pause', handlePause);
      audio.off('stop', handleStop);
      audio.off('end', customEndListener);
      audio.off('load', handleLoad);
    };
  }, [audio, slider?.rate, slider?.volume, src]);

  useEffect(() => {
    audio.volume(volume / 100);
  }, [audio, volume]);
  useEffect(() => {
    audio.rate(rate / 10);
  }, [audio, rate]);
  useEffect(() => {
    setTimeout(() => {
      setVolume((slider?.volume || 0.5) * 100);
    }, 6000);
    setRate((slider?.rate || 1) * 10);
  }, [slider]);

  return (
    <Stack justifyContent={'center'} color={'#000'}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
        <Box sx={{ display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center' }}>
          <Checkbox
            checked={checked}
            onClick={onClick}
            sx={{ svg: { color: loading ? 'grey' : '#3267f4' } }}
            disabled={loading}
          />
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
          disabled={loading}
        >
          {paused ? <PlayArrowRounded fontSize={'large'} /> : <PauseCircle fontSize={'large'} />}
        </IconButton>
      </Stack>
      <Slider
        size="small"
        min={0}
        max={100}
        value={volume}
        onChange={(e, v) => setVolume(v as number)}
        disabled={loading}
      />

      <Slider
        size="small"
        min={1}
        max={40}
        step={0.25}
        value={rate}
        onChange={(e, v) => setRate(v as number)}
        disabled={loading}
      />
    </Stack>
  );
};

export default AudioButton;
