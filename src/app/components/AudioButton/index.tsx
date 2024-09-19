// eslint-disable-next-line import/no-extraneous-dependencies
import { PauseCircle, PlayArrowRounded } from '@mui/icons-material';
import { Box, Checkbox, IconButton, Slider, Stack } from '@mui/material';
import React, { useEffect, useState } from 'react';

type Types = {
  checked: boolean;
  onClick: () => void;
  audioObject: { text: string; src: string; audio: Howl };
  sliders: { src: string; volume: number; rate: number } | undefined;
};

const AudioButton = ({ audioObject, checked, onClick, sliders }: Types) => {
  const { audio, text, src } = audioObject;
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(true);
  const [volume, setVolume] = useState(sliders?.volume || 50);
  const [rate, setRate] = useState(sliders?.rate || 10);

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

    audio.on('play', handlePlay);
    audio.on('pause', handlePause);
    audio.on('stop', handlePause);
    audio.on('load', handleLoad);

    return () => {
      audio.off('play', handlePlay);
      audio.off('pause', handlePause);
      audio.off('stop', handlePause);
      audio.off('end', customEndListener);
      audio.off('load', handleLoad);
    };
  }, [audio, src]);

  useEffect(() => {
    audio.volume(volume / 100);
  }, [audio, volume]);
  useEffect(() => {
    audio.rate(rate / 10);
  }, [audio, rate]);
  useEffect(() => {
    setVolume((sliders?.volume || 0.5) * 100);
    setRate((sliders?.rate || 1) * 10);
  }, [sliders]);

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
        min={5}
        max={20}
        step={0.25}
        value={rate}
        onChange={(e, v) => setRate(v as number)}
        disabled={loading}
      />
    </Stack>
  );
};

export default AudioButton;
