import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { selectUser } from '@/store/authSlice';
import { ProfileData } from './profileData'
import { fetchUser } from '@/store/authSlice';

export const ProfilePage: FC = () => {

  const userState = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <>
      { userState ? (
        <div className='wrapper'>
          <ProfileData></ProfileData>
        </div>
        ) : (
          null
        )
      }
    </>
  )
}
