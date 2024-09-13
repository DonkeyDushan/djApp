/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import { Box, IconButton, Stack } from '@mui/material';
import styles from './index.module.css';
import AudioButton from 'app/components/AudioButton copy';
import { PauseCircle, PlayArrowRounded } from '@mui/icons-material';

export const MainPage = () => {
  const [checkedDrums, setCheckedDrums] = useState<string>('');
  const [checkedKeys, setCheckedKeys] = useState<string>('');
  const [checkedBass, setCheckedBass] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const bass1 = useMemo(() => new Audio(`Funk01 - Bass1.wav`), []);
  const bass2 = useMemo(() => new Audio(`Funk01 - Bass2.wav`), []);
  const drums1 = useMemo(() => new Audio(`Funk01 - Drums1.wav`), []);
  const drums2 = useMemo(() => new Audio(`Funk01 - Drums2.wav`), []);
  const keys1 = useMemo(() => new Audio(`Funk01 - Keys1.wav`), []);
  const keys2 = useMemo(() => new Audio(`Funk01 - Keys2.wav`), []);

  const bassList = useMemo(
    () => [
      { text: 'Bass 1', src: 'Funk01 - Bass1', audio: bass1 },
      { text: 'Bass 2', src: 'Funk01 - Bass2', audio: bass2 },
    ],
    [bass1, bass2],
  );
  const drumsList = useMemo(
    () => [
      { text: 'Drums 1', src: 'Funk01 - Drums1', audio: drums1 },
      { text: 'Drums 2', src: 'Funk01 - Drums2', audio: drums2 },
    ],
    [drums1, drums2],
  );
  const keysList = useMemo(
    () => [
      { text: 'Keys 1', src: 'Funk01 - Keys1', audio: keys1 },
      { text: 'Keys 2', src: 'Funk01 - Keys2', audio: keys2 },
    ],
    [keys1, keys2],
  );

  const allAudio = useMemo(
    () => [
      bassList.find((item) => checkedBass === item.src)?.audio,
      drumsList.find((item) => checkedDrums === item.src)?.audio,
      keysList.find((item) => checkedKeys === item.src)?.audio,
    ],
    [bassList, checkedBass, checkedDrums, checkedKeys, drumsList, keysList],
  );

  const playAll = () => {
    allAudio.forEach((audio) => {
      audio?.play();
    });

    setIsPlaying(true);
  };

  useEffect(() => {
    if (allAudio.filter((n) => n).length === 0) {
      setIsPlaying(false);
    } else if (isPlaying) playAll();
  }, [allAudio]);

  const stopAll = () => {
    allAudio.forEach((audio) => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
  };

  return (
    <Box className={styles.root}>
      <Box className={styles.window}>
        <Box className={styles.header}>Audio mixing tool</Box>
        <Box className={styles.content}>
          <Box className={styles.grid}>
            {drumsList.map(({ text, src, audio }) => (
              <AudioButton
                key={src}
                text={text}
                checked={checkedDrums === src}
                audio={audio}
                onClick={() => {
                  stopAll();
                  if (checkedDrums === src) {
                    setCheckedDrums('');
                  } else setCheckedDrums(src);
                }}
              />
            ))}
          </Box>
          <Box className={styles.grid}>
            {bassList.map(({ text, src, audio }) => (
              <AudioButton
                key={src}
                text={text}
                audio={audio}
                onClick={() => {
                  stopAll();
                  if (checkedBass === src) {
                    setCheckedBass('');
                  } else setCheckedBass(src);
                }}
                checked={checkedBass === src}
              />
            ))}
          </Box>
          <Box className={styles.grid}>
            {keysList.map(({ text, src, audio }) => (
              <AudioButton
                key={src}
                text={text}
                audio={audio}
                onClick={() => {
                  stopAll();
                  if (checkedKeys === src) {
                    setCheckedKeys('');
                  } else setCheckedKeys(src);
                }}
                checked={checkedKeys === src}
              />
            ))}
          </Box>
        </Box>
        <Stack>
          <IconButton
            onClick={() => {
              if (isPlaying) {
                stopAll();
                setIsPlaying(false);
              } else {
                playAll();
              }
            }}
          >
            {isPlaying ? <PauseCircle /> : <PlayArrowRounded />}
          </IconButton>
        </Stack>
      </Box>
    </Box>
  );
};
