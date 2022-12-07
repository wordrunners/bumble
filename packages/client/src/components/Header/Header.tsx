import { useCallback, useState } from "react";
import { Button } from "../Button";
import { GameRules } from "../GameRules";
import { LinkButton } from "../LinkButton";
import './Header.scss';

export const Header = ():JSX.Element => {
    const [isRulesOpen, setIsRulesOpen] = useState<boolean>(false);

    const handleOpenRules = useCallback(() => { setIsRulesOpen(true); }, []);
    const handleCloseRules = useCallback(() => { setIsRulesOpen(false); }, []);

    return (
        <>
            <header className='header'>
                <Button className='header__btn' onClick={handleOpenRules}>Правила</Button>
                <LinkButton to='/forum' modifier='header-btn'>Форум</LinkButton>
                <LinkButton to='/profile' modifier='header-btn'>Профиль</LinkButton>
                <LinkButton to='/leaderboard' modifier='header-btn'>Рейтинги</LinkButton>
            </header>
            {isRulesOpen && <GameRules open={isRulesOpen} onClose={handleCloseRules} />}
        </>
    )
};
