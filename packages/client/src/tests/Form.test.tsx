import { Form } from '../components/Form'
import { render } from '@testing-library/react'

test('Form', async () => {
  const form = render(
    <Form>This is Form!</Form>
  );
  expect(form).toMatchSnapshot();
}); 
