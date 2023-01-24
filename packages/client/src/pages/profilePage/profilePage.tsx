import { FC, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/store/store'
import { selectUser } from '@/store/authSlice';
import { ProfileData } from './profileData'
import { fetchUser } from '@/store/authSlice';
import { useNavigate } from 'react-router-dom';

export const ProfilePage: FC = () => {

  const userState = useSelector(selectUser);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchUser());
    if (!userState) {
      navigate('/')
    }
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
