/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, IconButton, Stack } from '@mui/material';
import styles from './index.module.css';
import AudioButton from 'app/components/AudioButton';
import { PauseCircle, PlayArrowRounded } from '@mui/icons-material';
import { Howler } from 'howler';
import {
  anodicDrums1,
  anodicDrums2,
  anodicDrums3,
  arp1,
  arp2,
  arp3,
  bass1,
  bass2,
  custom1,
  custom2,
  custom3,
  drums1,
  drums2,
  drums3,
  keys1,
  keys2,
  keys3,
  pad1,
  pad2,
  pad3,
} from './sounds';
import InfoDialog from 'app/components/InfoDialog';
import SaveDialog from 'app/components/SaveDialog';
import LoadDialog from 'app/components/LoadDialog';

export const MainPage = () => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [sliders, setSliders] = useState<{ src: string; volume: number; rate: number }[]>([]);

  const audioList = useMemo(
    () => [
      { text: 'Funk Bass 1', src: 'Funk_Bass1.wav', audio: bass1 },
      { text: 'Funk Bass 2', src: 'Funk_Bass2.wav', audio: bass2 },
      { text: 'Funk Drums 1', src: 'Funk_Drumz1.wav', audio: drums1 },
      { text: 'Funk Drums 2', src: 'Funk_Drumz2.wav', audio: drums2 },
      { text: 'Funk Drums 3', src: 'Funk_Drumz3.wav', audio: drums3 },
      { text: 'Anodic Drums 1', src: 'Anodic_Drums1.wav', audio: anodicDrums1 },
      { text: 'Anodic Drums 2', src: 'Anodic_Drums2.wav', audio: anodicDrums2 },
      { text: 'Anodic Drums 3', src: 'Anodic_Drums3.wav', audio: anodicDrums3 },
      { text: 'Funk Keys 1', src: 'Funk_Keys1.wav', audio: keys1 },
      { text: 'Funk Keys 2', src: 'Funk_Keys2.wav', audio: keys2 },
      { text: 'Funk Keys 3', src: 'Funk_Keys3.wav', audio: keys3 },
      { text: 'Anodic Arp 1', src: 'Anodic_Arp1.wav', audio: arp1 },
      { text: 'Anodic Arp 2', src: 'Anodic_Arp2.wav', audio: arp2 },
      { text: 'Anodic Arp 3', src: 'Anodic_Arp3.wav', audio: arp3 },
      { text: 'Anodic Pad 1', src: 'Anodic_Pad1.wav', audio: pad1 },
      { text: 'Anodic Pad 2', src: 'Anodic_Pad2.wav', audio: pad2 },
      { text: 'Anodic Pad 3', src: 'Anodic_Pad3.wav', audio: pad3 },
      { text: 'Custom Sound 1', src: 'Custom1.mp3', audio: custom1 },
      { text: 'Custom Sound 2', src: 'Custom2.mp3', audio: custom2 },
      { text: 'Custom Sound 3', src: 'Custom3.mp3', audio: custom3 },
    ],
    [],
  );

  const allAudio = audioList.map((item) => item.audio);
  const allCheckedAudio = audioList
    .filter((item) => checkedValues.includes(item.src))
    .map((item) => item.audio);

  const playAll = ({ zeroTime }: { zeroTime?: boolean }) => {
    allCheckedAudio.forEach((audio) => {
      if (zeroTime) audio.seek(0);
      audio.play();
    });

    setIsPlaying(true);
  };
  const stopAll = () => {
    Howler.stop();
    allAudio.forEach((audio) => {
      audio.seek(0);
    });
  };

  const handleCheck = ({ key, audio }: { key: string; audio: Howl }) => {
    let newValues;
    if (checkedValues.includes(key)) {
      newValues = checkedValues.filter((v: string) => v !== key);
      setCheckedValues(newValues);
      audio.pause();
    } else {
      newValues = [...checkedValues, key];
      setCheckedValues(newValues);
      const playingAudio = allCheckedAudio.find(
        (a, i) => a.playing() && !audioList[i].src.includes('Custom'),
      );
      const currentTime = playingAudio && !key.includes('Custom') ? playingAudio.seek() : 0;
      audio.seek(currentTime);
      if (isPlaying) {
        audio.play();
      }
    }
  };

  const saveMixToLocalStorage = (name: string) => {
    const mixData = {
      checkedValues: checkedValues,
      sliders: allAudio.map((audio, i) => ({
        src: audioList[i].src,
        volume: audio.volume(),
        rate: audio.rate(),
      })),
    };

    localStorage.setItem(name, JSON.stringify(mixData));
  };

  const loadMixFromLocalStorage = (name: string) => {
    stopAll();
    setIsPlaying(false);

    const savedMix = JSON.parse(localStorage.getItem(name) || '{}');

    if (savedMix.checkedValues && savedMix.sliders) {
      setCheckedValues(savedMix.checkedValues || []);
      setSliders(savedMix.sliders);
    } else {
      console.error('Invalid mix data loaded');
      setCheckedValues([]);
      setSliders([]);
    }
  };

  const handleLoopAudio = (audio: Howl, src: string) => {
    if (checkedValues.includes(src)) {
      if (!src.includes('Custom')) {
        Howler.stop();
        playAll({ zeroTime: true });
      } else {
        audio.seek(0);
        audio.play();
      }
    }
  };

  useEffect(() => {
    audioList.forEach(({ audio, src }) => {
      if (checkedValues.includes(src)) {
        audio.off('end', () => handleLoopAudio(audio, src));
        audio.on('end', () => handleLoopAudio(audio, src));
      }
    });

    return () => {
      audioList.forEach(({ audio }) => {
        audio.off('end');
      });
    };
  }, [checkedValues]);

  useEffect(() => {
    if (allCheckedAudio.filter((n) => n).length === 0) {
      setIsPlaying(false);
    }
  }, [allCheckedAudio]);

  return (
    <Box className={styles.root}>
      <Box className={styles.window}>
        <Box className={styles.header}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <h2>{'Audio mixing tool'}</h2>
            <InfoDialog />
          </Stack>

          <Stack direction={'row'} gap={'24px'} alignItems={'center'} justifyContent={'end'}>
            <SaveDialog handleSave={saveMixToLocalStorage} />
            <LoadDialog handleSave={loadMixFromLocalStorage} />
            <Button
              onClick={() => {
                setCheckedValues([]);
                stopAll();
                setSliders([]);
              }}
              className={styles.headerButton}
            >
              Clear all
            </Button>
            <Button
              onClick={() => {
                location.reload();
              }}
              className={styles.headerButton}
            >
              Restart
            </Button>
          </Stack>
        </Box>
        <Box className={styles.content}>
          <Box className={styles.grid}>
            {audioList.map((audioObject) => (
              <AudioButton
                key={audioObject.src}
                checked={checkedValues.includes(audioObject.src)}
                audioObject={audioObject}
                onClick={() => handleCheck({ key: audioObject.src, audio: audioObject.audio })}
                sliders={sliders.find((slider) => slider.src === audioObject.src)}
              />
            ))}
          </Box>
          <Stack direction={'row'} justifyContent={'center'} sx={{ padding: '12px' }}>
            <IconButton
              onClick={() => {
                if (isPlaying) {
                  stopAll();
                  setIsPlaying(false);
                } else if (checkedValues) {
                  playAll({ zeroTime: false });
                }
              }}
              className={styles.playButton}
              sx={{ width: 'fit-content' }}
            >
              {isPlaying ? (
                <PauseCircle fontSize={'large'} />
              ) : (
                <PlayArrowRounded fontSize={'large'} />
              )}
            </IconButton>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
