import { useState } from "react";
import { Button } from "../Button";
import { GameRules } from "../GameRules";
import { LinkButton } from "../LinkButton";
import { useAuth } from "@/hooks";
import './Header.scss';
import { 
  PROFILE_ROUTE,
  BOARDS_ROUTE,
  FORUM_ROUTE,
  LEADERBOARD_ROUTE
} from '@/data/routes'

export const Header = ():JSX.Element => {
  const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);
  const { isAuth } = useAuth();
  
  const handleOpenRules = () => { setIsRulesOpen(true); };
  const handleCloseRules = () => { setIsRulesOpen(false); };

  return (
    <>
      <header className='header'>
        <Button className='header__btn' onClick={handleOpenRules}>Правила</Button>
        <LinkButton to={FORUM_ROUTE} modifier='header-btn'>Форум</LinkButton>
        {isAuth && (
          <>
            <LinkButton to={PROFILE_ROUTE} modifier='header-btn'>Профиль</LinkButton>
            <LinkButton to={LEADERBOARD_ROUTE} modifier='header-btn'>Рейтинги</LinkButton>
            <LinkButton to={BOARDS_ROUTE} modifier='header-btn'>BOARDS</LinkButton>
          </>
        )}
      </header>
      {isRulesOpen && <GameRules open={isRulesOpen} onClose={handleCloseRules} />}
    </>
  )
};
