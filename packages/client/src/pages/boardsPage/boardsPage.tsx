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
import { DiscussIcon } from "../forumPage/forumPage";
import { SubforumRow } from "@/components/SubforumRow";
import { format } from "date-fns";
import './boardPage.scss';
import { LinkButton } from "@/components/LinkButton";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/Button";

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
      userId: user?.id,
      userLogin: user?.login,
    };

    return (
      <section className="forum">
        <LinkButton to='/' modifier='header-btn'>Назад</LinkButton>
        <div className="forum__wrapper">
          <h2 className='forum__title'>ФОРУМ</h2>
          <div className="forum__topics">
            {status !== 'FETCH_FULFILLED' ? (
                <Loader />
              ) : (
                <>
                  {boards?.slice(0).reverse().map(({ title, description, id, createdAt }) => {
                    const formattedDate: string = format(new Date(createdAt), "dd-MM-yyyy, HH:mm");
                    return <Link to={`${BOARDS_ROUTE}/${id}`} key={`link-${id}`} className='forum__link'>
                      <SubforumRow
                        icon={<DiscussIcon />}
                        title={title}
                        description={description}
                        numberOfComments="24"
                        date={formattedDate}
                      />
                    </Link>
                  })}
                </>
            )}
          </div> 
          <Formik
            initialValues={initial}
            onSubmit={onSubmitAddBoard}
          >
            {() => (
              <Form className="forum__form">
                <Field
                  id="newTitle"
                  name="title"
                  title="newTitle"
                  type='text'
                  placeholder="Введите название"
                  key="newTitle"
                  className="forum__field"
                />
                <Field
                  id="newDescription"
                  name="description"
                  title="newDescription"
                  type='text'
                  placeholder="Введите описание темы"
                  key="newDescription"
                  className="forum__field forum__field_desc"
                />      
                <Button type="submit" className="forum__button">Создать тему</Button>
              </Form>
            )}
          </Formik>
        </div>
        
      </section>
    )
  } else {
    return (
      <Loader />
    )
  }
}
