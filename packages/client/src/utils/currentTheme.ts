import { useAppDispatch } from "@/hooks";
import { useEffect } from "react";
import { fetchTheme } from '@/store/theme/'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/authSlice';
import { selectTheme  } from '@/store/theme/themeSlice';

export function CurrentTheme() {

  const dispatch = useAppDispatch()
  const theme = useSelector(selectTheme);
  const user = useSelector(selectUser);

  useEffect(() => {
    if ((user)&& (user.id)) {
      dispatch(fetchTheme({id: user.id}))
    }
  }, [user])

  const style = theme === 'dark' ? 'dark__theme' : ''

  return style
}
