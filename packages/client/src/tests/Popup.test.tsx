import { Popup } from '../components/Popup'
import { render } from '@testing-library/react'

test('Popup', async () => {
  const popup = render(
    <Popup title={"This is Popup"} onClose={() => ''} isOpen={true}>Children</Popup>
  );
  expect(popup).toMatchSnapshot();
}); 
