import { FC, useCallback, useEffect } from 'react'
import { Formik, Field, Form } from 'formik';
import { useAuth, useAppDispatch } from "@/hooks";
import { fetchUser } from '@/store/authSlice';
import { getComments, addComment } from '@/store/boards'


type Props = {
  parentId: number | null
  boardId: number
}

export const FormBox: FC<Props> = ({parentId, boardId}): JSX.Element => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
  }, []);

  const onSubmit = useCallback(
    (value: { comment: string }) => {
    if (user) {
      dispatch(
        addComment({
          parentId: parentId,
          boardId: boardId,
          userId: user.id!,
          userLogin: user.login,
          comment: value.comment,
        })
      ).then(() => {
        return dispatch(getComments({ id: boardId }))
      })
    }
  }, [])

  if ((user)) {
    const initial = {
      parentId: parentId,
      boardId: boardId,
      userId: user.id,
      userLogin: user.login,
      comment: '',
    }
  
    return (
      <Formik
        initialValues={initial}
        onSubmit={onSubmit}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              id="newСomment"
              name="comment"
              title="newСomment"
              type='text'
              placeholder="Комментарий"
              key="newСomment"
            />   
            {parentId ? ( 
                <>
                  <Field
                    id="newСomment"
                    name="comment"
                    title="newСomment"
                    type='text'
                    placeholder="Комментарий"
                    key="newСomment"
                  />   
                  <button type="submit">Ответить!!</button>
                </> 
              ) : (
                <>
                  <Field
                    id="newСomment"
                    name="comment"
                    title="newСomment"
                    type='text'
                    placeholder="Ответ"
                    key="newСomment"
                  />   
                  <button type="submit">Комментировать!!</button>
                </>
              )
            }
          </Form>
        )}
      </Formik>
    )
  } else {
    return (
      <div>
        loading
      </div>
    )
  }
}
