import { FC, useState } from 'react'
import { addLike, Comment, selectBoardsData } from '@/store/boards'
import { useAuth, useAppDispatch, useAppSelector } from "@/hooks";
import { FormBox, Like, CommentsCounter } from '.'
import { Loader } from '@/components/Loader';
import '../boardPage.scss';

type Props = {
  like: boolean | undefined
  comment: Comment
  childComment: Comment[]
  userLogin: string;
}

export const CommentBox: FC<Props> = ({like, comment, childComment, userLogin}): JSX.Element => {
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const {  status } = useAppSelector(selectBoardsData)

  const clickLike = (value: boolean) => {
    if (user) {
      dispatch(
        addLike({
          isLike: value,
          commentId: comment.id,
          userId: user.id!,
          userLogin: user.login,
        })
      )
    }
  }

  const [open, setOpen] = useState(false)
  const handleOpen = () => {
    setOpen(previous => !previous)
  }

  return (
    <div className="forum__comment-box">
      {user ? (
        <>
          <p className='forum__text forum__text_login'>{userLogin}</p>
          <p className='forum__text'>{comment.comment}</p>
          <Like
            color={like ? '#dedc00' : 'grey'}
            onClick={() => clickLike(!like)}
          />
          {!comment.parent_id ? (
            <CommentsCounter 
              open={open}
              counter={childComment?.length}
              onClick={handleOpen}
            />
          ) : null}

          {open ? (
            status !== 'FETCH_FULFILLED' ? (
                <Loader />
              ) : (
                <>
                  {childComment?.length ? (
                    <>
                      Ответы:
                      {childComment?.map(comment => {
                        return (
                          <div key={`comment-${comment.id}`}>
                            {comment.user_login}: <b>"<i>{comment.comment}</i>"</b>
                          </div>
                        )
                      })}
                    </>
                  ) : (
                    null
                  )}
                  <FormBox
                    parentId={comment.id}
                    boardId={comment.board_id}
                  />
                </>
              )
            ) : null }
        </>
      ) : null}
    </div>
  )
}
