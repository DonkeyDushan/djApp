export const saveMixToLocalStorage = ({ name }) => {
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

export const loadMixFromLocalStorage = ({
  name,
  stopAll,
  setIsPlaying,
  setCheckedValues,
  setSliders,
}) => {
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
