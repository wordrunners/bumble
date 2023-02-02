import { FC } from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from '@/store/authSlice';
import { ProfileData } from './profileData'

export const ProfilePage: FC = () => {

  const userState = useSelector(selectUser);

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
