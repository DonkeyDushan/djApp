import React, { useEffect, useMemo, useState } from 'react';
import { Box, Button, Stack } from '@mui/material';
import styles from './index.module.css';
import AudioButton from 'app/components/AudioButton';

const bassList = [
  { text: 'Bass 1', src: 'Funk01 - Bass1' },
  { text: 'Bass 2', src: 'Funk01 - Bass2' },
];
const drumsList = [
  { text: 'Drums 1', src: 'Funk01 - Drums1' },
  { text: 'Drums 2', src: 'Funk01 - Drums2' },
];
const keysList = [
  { text: 'Keys 1', src: 'Funk01 - Keys1' },
  { text: 'Keys 2', src: 'Funk01 - Keys2' },
];

export const MainPage = () => {
  const [context] = useState(new (window.AudioContext || window.AudioContext)());
  const [sources, setSources] = useState<AudioBufferSourceNode[]>([]);

  const [checkedDrums, setCheckedDrums] = useState<string>('');
  const [checkedKeys, setCheckedKeys] = useState<string>('');
  const [checkedBass, setCheckedBass] = useState<string>('');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const drumsAudio = useMemo(() => new Audio(`${checkedDrums}.wav`), [checkedDrums]);
  const keysAudio = useMemo(() => new Audio(`${checkedKeys}.wav`), [checkedKeys]);
  const bassAudio = useMemo(() => new Audio(`${checkedBass}.wav`), [checkedBass]);

  const loadAudioBuffer = async (source: string) => {
    const response = await fetch(`${source}.wav`);
    const arrayBuffer = await response.arrayBuffer();
    return context.decodeAudioData(arrayBuffer);
  };

  const playCombinedAudio = async () => {
    // Load audio buffers
    const bassBuffer = await loadAudioBuffer(checkedBass);
    const drumsBuffer = await loadAudioBuffer(checkedDrums);
    const keysBuffer = await loadAudioBuffer(checkedKeys);

    // Create buffer sources for each audio
    const bassSource = context.createBufferSource();
    bassSource.buffer = bassBuffer;

    const drumsSource = context.createBufferSource();
    drumsSource.buffer = drumsBuffer;

    const keysSource = context.createBufferSource();
    keysSource.buffer = keysBuffer;

    // Connect the sources to the audio context's destination (speakers)
    bassSource.connect(context.destination);
    drumsSource.connect(context.destination);
    keysSource.connect(context.destination);

    // Start playback of all sources at the same time
    const startTime = context.currentTime;
    bassSource.start(startTime);
    drumsSource.start(startTime);
    keysSource.start(startTime);

    setSources([bassSource, drumsSource, keysSource]);
  };

  const stopCombinedAudio = () => {
    sources.forEach((source) => {
      source.stop(); // Stops each audio source
    });
    setSources([]); // Clear the sources array
  };

  const playAll = () => {
    if (!isPlaying) {
      drumsAudio.play();
      keysAudio.play();
      bassAudio.play();
      setIsPlaying(true); // Nastavíme, že přehrávání probíhá
    }
  };

  // Funkce pro zastavení všech audia stop
  const stopAll = () => {
    drumsAudio.pause();
    drumsAudio.currentTime = 0;
    keysAudio.pause();
    keysAudio.currentTime = 0;
    bassAudio.pause();
    bassAudio.currentTime = 0;
    setIsPlaying(false); // Znovu umožníme přehrávání
  };
  useEffect(() => {
    stopCombinedAudio();
    stopAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkedDrums, checkedBass, checkedKeys /*,bassAudio, keysAudio, drumsAudio */]);
  return (
    <Box className={styles.root}>
      <Box className={styles.window}>
        <Box className={styles.header}>Audio mixing tool</Box>
        <Box className={styles.content}>
          <Box className={styles.grid}>
            {drumsList.map(({ text, src }) => (
              <AudioButton
                key={src}
                text={text}
                src={src}
                checked={checkedDrums === src}
                onClick={() => {
                  if (checkedDrums === src) {
                    drumsAudio.pause();
                    drumsAudio.currentTime = 0;
                    setCheckedDrums('');
                  } else setCheckedDrums(src);
                }}
                isPlaying={isPlaying}
              />
            ))}
          </Box>
          <Box className={styles.grid}>
            {bassList.map(({ text, src }) => (
              <AudioButton
                key={src}
                text={text}
                src={src}
                onClick={() => {
                  if (checkedBass === src) {
                    bassAudio.pause();
                    bassAudio.currentTime = 0;
                    setCheckedBass('');
                  } else setCheckedBass(src);
                }}
                checked={checkedBass === src}
              />
            ))}
          </Box>
          <Box className={styles.grid}>
            {keysList.map(({ text, src }) => (
              <AudioButton
                key={src}
                text={text}
                src={src}
                onClick={() => {
                  if (checkedKeys === src) {
                    keysAudio.pause();
                    keysAudio.currentTime = 0;
                    setCheckedKeys('');
                  } else setCheckedKeys(src);
                }}
                checked={checkedKeys === src}
              />
            ))}
          </Box>
        </Box>
        {/* <Stack direction="row">
          <Button onClick={() => playCombinedAudio()}>Play</Button>
          <Button
            onClick={() => {
              stopCombinedAudio();
            }}
          >
            STOP
          </Button>
        </Stack> */}
        <Stack direction="row">
          <button onClick={playAll} disabled={isPlaying}>
            Play All
          </button>
          <button onClick={stopAll}>Stop</button>
        </Stack>
      </Box>
    </Box>
  );
};
