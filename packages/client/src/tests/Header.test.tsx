import { Header } from '../components/Header'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

test('Header', async () => {
  const header = render(

    <Router>
      <Header></Header>
    </Router>

  );
  expect(header).toMatchSnapshot();
}); 
