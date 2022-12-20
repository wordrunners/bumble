import { SubforumRow } from '../components/SubforumRow'
import { render } from '@testing-library/react'

test('SubforumRow', async () => {
  const subforumRow = render(
    <SubforumRow title={"This is SubforumRow"}></SubforumRow>
  );
  expect(subforumRow).toMatchSnapshot();
}); 
