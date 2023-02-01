import { useAppDispatch, useAppSelector } from '@/hooks';
import { selectTheme, changeTheme } from '@/store/themeSlice';
import { Button } from '../Button';
import { themes } from '@/utils/themeContext';

import './themeTogglerButton.scss';

export const ThemeTogglerButton = () => {
  const currentTheme = useAppSelector(selectTheme);
  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    const theme = JSON.stringify(currentTheme) === JSON.stringify(themes.light) ? themes.dark : themes.light;
    dispatch(changeTheme(theme));
  };

  return (
    <Button className={'themeTogglerButton'} onClick={toggleTheme}>
      Сменить тему
    </Button>
  );
};
