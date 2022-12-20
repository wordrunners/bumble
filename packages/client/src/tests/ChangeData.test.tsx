import { ChangeData } from '../components/ChangeData'
import { render } from '@testing-library/react'

test('ChangeData', async () => {
  const changeData = render(
    <ChangeData placeholder="This is ChangeData"></ChangeData>
  );
  expect(changeData).toMatchSnapshot();
}); 
