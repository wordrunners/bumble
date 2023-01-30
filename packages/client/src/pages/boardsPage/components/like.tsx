import { FC } from "react";

interface Props {
  color: string | undefined,
  onClick: () => void,
}

export const Like: FC<Props> = ({color, onClick}): JSX.Element => {
  return (
    <div className='change' onClick={onClick} style={{color: `${color}`}}>
      <u>LIKE</u>
    </div>
  )
}
