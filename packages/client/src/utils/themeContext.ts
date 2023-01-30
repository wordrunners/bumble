import { createContext } from 'react';

export const themes = {
  light: {
    style: ''
  },
  dark: {
    style: 'dark__theme'
  },
};

export const ThemeContext = createContext(themes.dark);
