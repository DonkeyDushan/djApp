const timeouts: { [key: string]: number | undefined } = {}; // Ukládání ID timeoutů pro každé audio

export const fadeOutAudio = ({
  audio,
  src,
}: {
  audio: Howl;
  src: string; // Abychom mohli identifikovat konkrétní stopu
}) => {
  const ogVolume = audio.volume();
  // Pokud již existuje timeout pro toto audio, zruš ho
  if (timeouts[src]) {
    clearTimeout(timeouts[src]);
    timeouts[src] = undefined;
  }

  audio.fade(ogVolume, 0, 3000); // Fade na nulu během zadaného trvání

  timeouts[src] = window.setTimeout(() => {
    audio.stop(); // Po skončení fade-out zastav zvuk
    audio.volume(ogVolume); // Obnov původní hlasitost po zastavení
    timeouts[src] = undefined; // Po dokončení fade-out zruš timeout
  }, 6000);
};

export const fadeInAudio = ({
  audio,
  src,
  maxVolume,
  minVolume = 0,
}: {
  audio: Howl;
  src: string; // Pro identifikaci audio
  maxVolume?: number;
  minVolume?: number;
}) => {
  // Před spuštěním audia zruš případný timeout pro fade-out
  if (timeouts[src]) {
    clearTimeout(timeouts[src]);
    timeouts[src] = undefined;
  }

  audio.volume(minVolume); // Nastav hlasitost na minVolume před spuštěním
  audio.fade(minVolume, maxVolume || 0.5, 6000); // Fade-in na maxVolume během 3 sekund
};
