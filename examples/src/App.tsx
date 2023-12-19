import { Link, Route, useLocation } from 'wouter'
import './App.css'
import './styles/vars.scss'
import './styles/header.scss'
import './styles/pegboard.scss'
import './styles/main.scss'
import './styles/layout.scss'

import HelloWorld from './pages/HelloWorld'
import Data from './pages/Data'

function App() {
  const [pathname] = useLocation()

  console.log(pathname)

  return (
    <>
      <header>
        <Link to="/">
          <h1>Pegboard</h1>
        </Link>
        <nav>
          <Link to="/">
            <a className={pathname === '/' ? 'active' : undefined}>Basic</a>
          </Link>
          <Link to="/data">
            <a className={pathname === '/data' ? 'active' : undefined}>Data</a>
          </Link>
        </nav>
        <a
          href="https://github.com/sirajchokshi/pegboard"
          target="_blank"
          style={{ borderBottom: 'none' }}
        >
          <button>Github ↗</button>
        </a>
      </header>
      <Route path="/">
        <HelloWorld />
      </Route>
      <Route path="/data">
        <Data />
      </Route>
    </>
  )
}

// eslint-disable-next-line import/no-default-export
export default App
