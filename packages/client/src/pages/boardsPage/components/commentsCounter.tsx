import { FC } from "react";

type Props = {
  open: boolean,
  counter: number
  onClick: () => void,
}

export const CommentsCounter: FC<Props> = ({open, onClick, counter}): JSX.Element => {
  return (
    <div className='comments-counter' onClick={onClick} style={{color: `blue`}}>
      <u>{!open ?  (!counter ? 'Ответить' : 'Ответы: ' + counter) : 'Скрыть'}</u>
    </div>
  )
}
