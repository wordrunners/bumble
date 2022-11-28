import { useAppSelector, useAppDispatch } from '../game/hooks/useStore';
import {
  decrement,
  increment,
  selectCount,
} from '../game/components/gameSlice';

export function Counter() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div >
        <button
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
        <span >{count}</span>
        <button
          onClick={() => dispatch(increment())}
        >
          +
        </button>
      </div>
    </div>
  );
}
