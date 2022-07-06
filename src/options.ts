export interface Options {
  resize: {
    lockAspectRatio: boolean;
    snapTo5Px: boolean;
  };
}

const defaultOptions: Options = {
  resize: {
    lockAspectRatio: true,
    snapTo5Px: true,
  },
};

const readOptions = () => {
  const optionsStr = localStorage.getItem('Tile-Gen.options');
  if (optionsStr) {
    const options: Options = JSON.parse(optionsStr) as Options;
    return options;
  } else {
    return defaultOptions;
  }
};

export let options = readOptions();

export const setOptions = (newOptions: Options) => {
  options = newOptions;
  localStorage.setItem('Tile-Gen.options', JSON.stringify(newOptions));
};
