import { Router } from '@/pages'

import { CurrentTheme } from '@/utils/currentTheme';
import { Splash } from './components/Splash';

export function App() {
  const style = CurrentTheme()

  return (
    <div className={`app ${style}`}>
      <Splash/>
      <Router />
    </div>
  )
}
