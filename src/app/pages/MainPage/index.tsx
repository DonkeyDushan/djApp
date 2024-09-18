/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, IconButton, Stack, Tooltip } from '@mui/material';
import styles from './index.module.css';
import AudioButton from 'app/components/AudioButton';
import { InfoOutlined, PauseCircle, PlayArrowRounded } from '@mui/icons-material';

export const MainPage = () => {
  const [checkedValues, setCheckedValues] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // Funk
  const bass1 = useMemo(() => new Audio(`Funk_Bass1.wav`), []);
  const bass2 = useMemo(() => new Audio(`Funk_Bass2.wav`), []);
  const drums1 = useMemo(() => new Audio(`Funk_Drumz1.wav`), []);
  const drums2 = useMemo(() => new Audio(`Funk_Drumz2.wav`), []);
  const drums3 = useMemo(() => new Audio(`Funk_Drumz3.wav`), []);
  const keys1 = useMemo(() => new Audio(`Funk_Keys1.wav`), []);
  const keys2 = useMemo(() => new Audio(`Funk_Keys2.wav`), []);
  const keys3 = useMemo(() => new Audio(`Funk_Keys3.wav`), []);
  // Anodic
  const arp1 = useMemo(() => new Audio(`Anodic_Arp1.wav`), []);
  const arp2 = useMemo(() => new Audio(`Anodic_Arp2.wav`), []);
  const arp3 = useMemo(() => new Audio(`Anodic_Arp3.wav`), []);
  const anodicDrums1 = useMemo(() => new Audio(`Anodic_Drums1.wav`), []);
  const anodicDrums2 = useMemo(() => new Audio(`Anodic_Drums2.wav`), []);
  const anodicDrums3 = useMemo(() => new Audio(`Anodic_Drums3.wav`), []);
  const pad1 = useMemo(() => new Audio(`Anodic_Pad1.wav`), []);
  const pad2 = useMemo(() => new Audio(`Anodic_Pad2.wav`), []);
  const pad3 = useMemo(() => new Audio(`Anodic_Pad3.wav`), []);
  // Custom
  const custom1 = useMemo(() => new Audio(`Custom1.mp3`), []);
  const custom2 = useMemo(() => new Audio(`Custom2.mp3`), []);
  const custom3 = useMemo(() => new Audio(`Custom3.mp3`), []);

  const bassList = useMemo(
    () => [
      { text: 'Funk Bass 1', src: 'Funk_Bass1', audio: bass1 },
      { text: 'Funk Bass 2', src: 'Funk_Bass2', audio: bass2 },
    ],
    [bass1, bass2],
  );
  const drumsList = useMemo(
    () => [
      { text: 'Funk Drums 1', src: 'Funk_Drumz1', audio: drums1 },
      { text: 'Funk Drums 2', src: 'Funk_Drumz2', audio: drums2 },
      { text: 'Funk Drums 3', src: 'Funk_Drumz3', audio: drums3 },
      { text: 'Anodic Drums 1', src: 'Anodic_Drums1', audio: anodicDrums1 },
      { text: 'Anodic Drums 2', src: 'Anodic_Drums2', audio: anodicDrums2 },
      { text: 'Anodic Drums 3', src: 'Anodic_Drums3', audio: anodicDrums3 },
    ],
    [drums1, drums2, drums3, anodicDrums1, anodicDrums2, anodicDrums3],
  );
  const keysList = useMemo(
    () => [
      { text: 'Funk Keys 1', src: 'Funk_Keys1', audio: keys1 },
      { text: 'Funk Keys 2', src: 'Funk_Keys2', audio: keys2 },
      { text: 'Funk Keys 3', src: 'Funk_Keys3', audio: keys3 },
    ],
    [keys1, keys2, keys3],
  );
  const arpList = useMemo(
    () => [
      { text: 'Anodic Arp 1', src: 'Anodic_Arp1', audio: arp1 },
      { text: 'Anodic Arp 2', src: 'Anodic_Arp2', audio: arp2 },
      { text: 'Anodic Arp 3', src: 'Anodic_Arp3', audio: arp3 },
    ],
    [arp1, arp2, arp3],
  );
  const padList = useMemo(
    () => [
      { text: 'Anodic Pad 1', src: 'Anodic_Pad1', audio: pad1 },
      { text: 'Anodic Pad 2', src: 'Anodic_Pad2', audio: pad2 },
      { text: 'Anodic Pad 3', src: 'Anodic_Pad3', audio: pad3 },
    ],
    [pad1, pad2, pad3],
  );
  const customList = useMemo(
    () => [
      { text: 'Custom Sound 1', src: 'Custom1', audio: custom1 },
      { text: 'Custom Sound 2', src: 'Custom2', audio: custom2 },
      { text: 'Custom Sound 3', src: 'Custom3', audio: custom3 },
    ],
    [custom1, custom2, custom3],
  );

  const audioLists = [bassList, drumsList, keysList, arpList, padList, customList];

  const getAllAudio = () => {
    const checked = [
      ...bassList.filter((item) => checkedValues.includes(item.src)),
      ...keysList.filter((item) => checkedValues.includes(item.src)),
      ...drumsList.filter((item) => checkedValues.includes(item.src)),
      ...arpList.filter((item) => checkedValues.includes(item.src)),
      ...padList.filter((item) => checkedValues.includes(item.src)),
      ...customList.filter((item) => checkedValues.includes(item.src)),
    ];
    const checkedAudio = checked.map((item) => item.audio);
    return checkedAudio;
  };

  const allAudio = useMemo(
    () => getAllAudio(),
    [bassList, drumsList, keysList, arpList, padList, checkedValues],
  );

  const playAll = ({ zeroTime }: { zeroTime?: boolean }) => {
    allAudio.forEach((audio) => {
      if (zeroTime) audio.currentTime = 0;
      audio?.play();
    });

    setIsPlaying(true);
  };

  useEffect(() => {
    if (allAudio.filter((n) => n).length === 0) {
      setIsPlaying(false);
    }
  }, [allAudio]);

  const stopAll = () => {
    allAudio.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  const handleCheck = ({ key, audio }: { key: string; audio: HTMLAudioElement }) => {
    if (checkedValues.includes(key)) {
      const newValues = checkedValues.filter((v: string) => v !== key);
      setCheckedValues(newValues);
      audio.pause();
      audio.currentTime = 0;
    } else {
      setCheckedValues([...checkedValues, key]);
      const playingAudio = allAudio.find((a) => !a.paused);
      const currentTime = playingAudio && !key.includes('Custom') ? playingAudio.currentTime : 0;
      audio.currentTime = currentTime;
      if (isPlaying) {
        audio.play();
      }
    }
  };

  /*   const checkIsChecked = (src: string, checked: string[]) => {
    const audioTitle = src.split('/')[3].split('.')[0];
    return checked.includes(audioTitle);
  }; */

  /* const handleLoopAudio = useCallback(
    (audio: HTMLAudioElement) => {
      const checked = checkIsChecked(audio.src, checkedValues);
      console.log(audio.src, checked);

      const loopAudio = () => {
        if (checked) {
          if (!audio.src.includes('Custom')) {
            allAudio.forEach((a) => {
              if (a) {
                a.currentTime = 0;
                a.play();
              }
            });
          } else {
            audio.currentTime = 0;
            audio.play();
          }
        }
      };
      audio.removeEventListener('ended', loopAudio);
      if (checkedValues.includes(audio.src.split('/')[3].split('.')[0])) {
        audio.addEventListener('ended', loopAudio);
      }
    },
    [checkedValues],
  );
 */
  const saveCheckedValuesToLocalStorage = () => {
    localStorage.setItem('checkedAudioValues', JSON.stringify(checkedValues));
  };
  const loadCheckedValuesFromLocalStorage = () => {
    setCheckedValues([]);
    stopAll();
    setIsPlaying(false);
    const savedValues = JSON.parse(localStorage.getItem('checkedAudioValues') || '');
    setCheckedValues(savedValues || []);
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.window}>
        <Box className={styles.header}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <h2>{'Audio mixing tool'}</h2>
            <Tooltip title={'Test'}>
              <InfoOutlined />
            </Tooltip>
          </Stack>

          <Stack direction={'row'} gap={'24px'} alignItems={'center'} justifyContent={'end'}>
            <Button onClick={saveCheckedValuesToLocalStorage} className={styles.headerButton}>
              Save
            </Button>
            <Button onClick={loadCheckedValuesFromLocalStorage} className={styles.headerButton}>
              Load saved mix
            </Button>
            <Button
              onClick={() => {
                setCheckedValues([]);
                stopAll();
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
          {audioLists.map((list, i) => (
            <Box key={`audioList-${i}`} className={styles.grid}>
              {list.map(({ text, src, audio }) => (
                <AudioButton
                  key={src}
                  text={text}
                  checked={checkedValues.includes(src)}
                  audio={audio}
                  onClick={() => handleCheck({ key: src, audio: audio })}
                />
              ))}
            </Box>
          ))}
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
