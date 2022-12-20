import { Button } from '../components/Button'
import { render } from '@testing-library/react'

test('Button', async () => {
  const button = render(
    <Button onClick={() => ''}>This is Button!</Button>
  );
  expect(button).toMatchSnapshot();
}); 
