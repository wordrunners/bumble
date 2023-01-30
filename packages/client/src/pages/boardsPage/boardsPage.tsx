import { FC, useEffect } from "react";
import { Link } from 'react-router-dom'
import { Formik, Field, Form } from 'formik';
import { useAuth, useAppDispatch, useAppSelector } from "@/hooks";
import { BOARDS_ROUTE } from '@/data/routes'
import { fetchUser } from '@/store/authSlice';
import { 
  selectBoardsData, 
  getBoards, 
  addBoard
} from '@/store/boards'


export const BoardsPage: FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { boards, status } = useAppSelector(selectBoardsData)

  useEffect(() => {
    if (!user) {
      dispatch(fetchUser());
    }
    dispatch(getBoards())
  }, []);

  const onSubmitAddBoard = (value: { title: string, description: string, }) => {
    dispatch(addBoard(value))
      .then(() => { 
        return dispatch(getBoards()) 
      })
    }

  if (user) {
    
    const initial = {
      title: '',
      description: '',
      userId: user.id,
      userLogin: user.login,
    }

    return (
      <div className="page">
        Boards Page
        <Formik
          initialValues={initial}
          onSubmit={onSubmitAddBoard}
        >
          {() => (
            <Form>
              <Field
                id="newTitle"
                name="title"
                title="newTitle"
                type='text'
                placeholder="Название темы"
                key="newTitle"
              />
              <Field
                id="newDescription"
                name="description"
                title="newDescription"
                type='text'
                placeholder="Описание темы"
                key="newDescription"
              />      
              <button type="submit">Создать тему!</button>
            </Form>
          )}
        </Formik>
        {status !== 'FETCH_FULFILLED' ? (
            <>loading</>
          ) : (
            <>
              {boards?.slice(0).reverse().map(({ title, description, id }) => (
                <Link to={`${BOARDS_ROUTE}/${id}`} key={`link-${id}`}>
                  {id}.{title} - {description}<br></br>
                </Link>
              ))}
            </>
        )}
      </div>
    )
  } else {
    return (
      <div className="page">
        Boards Page
      </div>
    )
  }
}
