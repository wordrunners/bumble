import { FormField } from '../components/FormField'
import { render } from '@testing-library/react'

test('Form', async () => {
  const formField = render(
    <FormField value={"This is FormField"}></FormField>
  );
  expect(formField).toMatchSnapshot();
}); 
