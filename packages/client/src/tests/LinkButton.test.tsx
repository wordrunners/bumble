import { LinkButton } from '../components/LinkButton'
import { render } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'

test('LinkButton', async () => {
  const linkButton = render(
    <Router>
      <LinkButton to={''}>This is LinkButton!</LinkButton>
    </Router>
  );
  expect(linkButton).toMatchSnapshot();
}); 
