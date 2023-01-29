import { FC, useEffect } from "react";
import { useParams } from 'react-router-dom'
import { useAuth, useAppDispatch, useAppSelector } from "@/hooks";
import { fetchUser } from '@/store/authSlice';
import {
  getComments,
  getLikes,
  getBoards,
  selectBoardsData,
} from '@/store/boards'
import { FormBox, CommentBox } from './components'
import { Loader } from "@/components/Loader";


type boardIdParams = {
  boardId?: string
}

export const BoardPage: FC = () => {
  const dispatch = useAppDispatch();

  const { user } = useAuth();
  const { boards, likes, comments, status } = useAppSelector(selectBoardsData)
  const { boardId } = useParams<boardIdParams>()
  const board = boards?.find(item => item.id === Number(boardId))

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (user.id! > 0) {
        dispatch(getComments({ id: Number(boardId) }))
        dispatch(getBoards())
        dispatch(getLikes({ id: user.id! }))
      }
    }
  }, [user])

  if ((user) && (board)) {
    return (
      <section className="forum">
        Board Page
        <FormBox
          parentId={null}
          boardId={Number(boardId)}
        />
        <div>
          ==================<br></br>
          <b>Тема:{board.title}</b><br></br>
          <i>Описание:{board.description}</i><br></br>
          ==================<br></br>
          {status !== 'FETCH_FULFILLED' ? (
              <Loader />
            ) : (
              <>
                {comments?.length ? (
                    <>
                      {comments
                        ?.filter(item => item.parent_id === null)
                        .slice(0).reverse().map(comment => {
                          return (
                            <CommentBox
                              key={`CommentBox=${comment.id}`}
                              like={
                                likes?.find(
                                  it => it.comment_id === comment.id
                                )?.isLike
                              }
                              comment={comment}
                              childComment={comments?.filter(
                                it => it.parent_id === comment.id
                              )}
                            />
                          )
                        })}
                    </>
                  ) : (
                  <>Комментариев нет</>
                )}
              </>
            )}
        </div>
      </section>
    )
  } else {
    return (
      <Loader />
    )
  }
}
