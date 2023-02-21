import { App } from './App'
import { render, screen } from '@testing-library/react'

const appContent = 'Тестовый App для тестового теста Jest'

// @ts-ignore
global.fetch = jest.fn(() =>
  Promise.resolve({ json: () => Promise.resolve('hey') })
)

test('Example test', async () => {
  render(<App />)
  expect(screen.getByText(appContent)).toBeDefined()
})
