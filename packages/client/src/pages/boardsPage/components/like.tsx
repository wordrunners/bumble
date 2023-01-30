import { FC } from "react";
import '../boardPage.scss';

interface Props {
  color: string | undefined,
  onClick: () => void,
}

export const Like: FC<Props> = ({color, onClick}): JSX.Element => {
  return (
    <div className='forum__like' onClick={onClick} style={{color: `${color}`}}>
      <u>LIKE</u>
    </div>
  )
}
