import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { selectUser } from '@/store/authSlice';
import { selectTheme  } from '@/store/theme/themeSlice';
import { changeTheme } from '@/store/theme'
import { fetchUser } from '@/store/authSlice';
import { AppDispatch } from '@/store/store'

import './ThemeTogglerButton.scss';

export const ThemeTogglerButton = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  const user = useSelector(selectUser);
  const theme = useSelector(selectTheme);

  const [checked, setChecked] = useState(false)
  const handleThemeChange = () => {
    if ((user) && (user.id)) {
      dispatch(
        changeTheme({
          userId: user.id,
          themeId: theme === 'dark' ? 2 : 1,
        })
      )
    }
    
    setChecked(prevChecked => !prevChecked)
  }

  useEffect(() => {
    setChecked(theme === 'dark')
  }, [theme])

  return (
    <label className="container">
      <input type="checkbox" onChange={handleThemeChange} checked={checked}></input>
      <span className="checkmark"></span>
    </label>
  );
}; 
