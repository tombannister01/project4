import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Login from './auth/login'
import Register from './auth/register'
import Workouts from './components/Workouts'
import './style.scss'
import NewCardio from './components/NewCardio'
import 'bulma'
import NewMuscleTraining from './components/NewMuscleTraining'

const App = () => {
  return <HashRouter>
    <Switch>
      <Route exact path = "/muscle_training/new" component={NewMuscleTraining} />
      <Route exact path = "/cardio/new" component={NewCardio} />
      <Route exact path = "/register" component={Register} />
      <Route exact path = "/workouts" component={Workouts} />
      <Route exact path = "/" component={Login} />
    </Switch>
  </HashRouter>
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
