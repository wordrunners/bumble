import { useAppSelector, useAppDispatch } from '../hooks/useStore';
import {
  decrement,
  increment,
  selectCount,
} from '../components/counterSlice';

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
