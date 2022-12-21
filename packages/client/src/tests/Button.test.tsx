import { Button } from '../components/Button'
import { fireEvent, render, screen } from '@testing-library/react'

const testingContentString = 'Test'
it('Component should be rendered', async () => {
  render(<Button children={testingContentString}/>)
  expect(screen.getByText(testingContentString)).toBeDefined()
})

it('Element should return button', () => {
  render(<Button />);
  expect(screen.getByRole('button')).toBeTruthy();
});

describe('Should properties change state', ()=> {
  it('Change children prop', ()=>{
      const component = render(<Button children={testingContentString}/>)
      expect(screen.findByText(testingContentString)).toBeTruthy()
      expect(component).toMatchSnapshot();

      const anyOtherContent = 'Any'
      component.rerender(<Button children={anyOtherContent}/>)
      expect(screen.getByText(anyOtherContent)).toBeTruthy()
      expect(component).toMatchSnapshot();
    }
  )
})

test('Should call onClick prop when clicked', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click Me</Button>)
  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
