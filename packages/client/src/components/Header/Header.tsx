import { useState } from "react";
import { Button } from "../Button";
import { GameRules } from "../GameRules";
import { LinkButton } from "../LinkButton";
import { useAuth } from "@/hooks";
import './Header.scss';
import { 
  PROFILE_ROUTE,
  BOARDS_ROUTE,
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
        {isAuth && (
          <>
            <LinkButton to={PROFILE_ROUTE} modifier='header-btn'>Профиль</LinkButton>
            <LinkButton to={BOARDS_ROUTE} modifier='header-btn'>Форум</LinkButton>
            <LinkButton to={LEADERBOARD_ROUTE} modifier='header-btn'>Рейтинги</LinkButton>
          </>
        )}
      </header>
      {isRulesOpen && <GameRules open={isRulesOpen} onClose={handleCloseRules} />}
    </>
  )
};
