import {
  NavLink,
} from "react-router-dom";

export default function Root() {
  return (
    <div id="zero-state">
      Pages:{" "}
      <br />
      <nav>
        <NavLink
          to={`onboarding`}
        >
          {<p>Страница входа - onboarding-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`sign-in`}
        >
          {<p>Авторизация - sign-in-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`sign-up`}
        >
          {<p>Страница регистрации - sign-up-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`sign-up`}
        >
          {<p>Страница пользователя - profile-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`leaders`}
        >
          {<p>Страница лидерборда - leaders-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`forum`}
        >
          {<p>Форум - forum-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`game-start`}
        >
          {<p>Начало игры - game-start-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`game`}
        >
          {<p>Механика игры на Canvas API - game-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`game-end`}
        >
          {<p>Завершение игры - game-end-page</p>}{" "}
        </NavLink>
        <NavLink
          to={`contacts`}
        >
          {<p>Контакты – Demo from reactrouter.com</p>}{" "}
        </NavLink>
      </nav>
    </div>
  );
}
