import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'

// import 'bulma'
import './styles/style.scss'

import Home from './components/Home'
import Navbar from './components/Navbar'
import Events from './components/Events'
import SingleEvent from './components/SingleEvent'
import About from './components/About'

const App = () => (
  <HashRouter>
    <Navbar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/events/:id" component={SingleEvent} />
      <Route path="/events" component={Events} />
      <Route path="/about" component={About} />
    </Switch>
  </HashRouter>
)

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
