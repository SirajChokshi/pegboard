import { Link, Route } from 'wouter'
import './App.css'

import HelloWorld from './pages/HelloWorld'
import Data from './pages/Data'

function App() {
  return (
    <>
      <header>
        <Link to="/">
          <h1>Pegboard</h1>
        </Link>
        <nav>
          <Link to="/">
            <a>Basic</a>
          </Link>
          <Link to="/data">
            <a>Data-Driven</a>
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
