import { GameRules } from '../components/GameRules'
import { render } from '@testing-library/react'

test('GameRules', async () => {
  const gameRules = render(
    <GameRules onClose={() => ''} open={false}></GameRules>
  );
  expect(gameRules).toMatchSnapshot();
}); 
