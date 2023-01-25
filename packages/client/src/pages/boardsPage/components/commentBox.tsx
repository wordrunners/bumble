import { FC, useState } from 'react'
import { addLike, Comment, selectBoardsData } from '@/store/boards'
import { useAuth, useAppDispatch, useAppSelector } from "@/hooks";
import { FormBox, Like, CommentsCounter } from '.'


type Props = {
  like: boolean | undefined
  comment: Comment
  childComment: Comment[]
}

export const CommentBox: FC<Props> = ({like, comment, childComment}): JSX.Element => {
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
    <div className="comment-box">
      {user ? (
        <div>
          <br></br>
          Комментарий:
          <b>"<i>{comment.comment}</i>"</b>

          {!comment.parent_id ? (
            <CommentsCounter 
              open={open}
              counter={childComment?.length}
              onClick={handleOpen}
            />
          ) : null}

          {open ? (
            status !== 'FETCH_FULFILLED' ? (
                <>loading</>
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
                    <>Ответы не найдены</>
                  )}
                  <FormBox
                    parentId={comment.id}
                    boardId={comment.board_id}
                  />
                </>
              )
            ) : null }
          <Like
            color={like ? 'red' : 'grey'}
            onClick={() => clickLike(!like)}
          />
        </div>
      ) : null}
    </div>
  )
}
