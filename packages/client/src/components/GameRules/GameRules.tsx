import { Popup } from "../Popup";
import './GameRules.scss';

interface Props {
    open: boolean;
    onClose: () => void
}
export const GameRules = ({ open, onClose }: Props): JSX.Element => {
    return (
        <Popup
            title='ПРАВИЛА'
            isOpen={open}
            onClose={onClose}
        >
            <div className='rules'>
                <p className='rules__text'>
                    Bumble – это очень простая и быстрая игра в слова.
                </p>
                <p className='rules__text'>
                    Собери слово из букв за минуту. Чем длиннее - тем лучше. Ведь за каждую букву начисляются победные баллы.
                </p>
                <p className='rules__text'>
                    Каждая буква может использоваться в слове ровно столько раз, сколько раз она присутствует на карточке.
                </p>
            </div>
        </Popup>
    );
};
