import React from 'react'
import axios from 'axios'
import auth from '../auth/auth'
import SpringModal from './ModalDisplay'
import DashBoard from './DisplayWorkouts'
import Dashboard from './DisplayWorkouts'

class Workouts extends React.Component {

  constructor() {
    super()
    this.state = {
      workouts: {
        muscle_trainings: [],
        cardios: []
      },
      errors: {}
    }

  }

  componentDidMount() {
    axios.get('/api/profile', { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then((res) => this.setState({ workouts: res.data }))
    // .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  render() {
    const { workouts } = this.state
    console.log('workouts', this.state.workouts)

    return <>
    <Dashboard {...this.state.workouts}/>
    {/* {workouts.muscle_trainings.map((workoutMuscle, key) => {
      return <div key={key}>{workoutMuscle.name}</div>
    })}
    
    {workouts.cardios.map((workout, key) => {
      return <div key={key}>{workout.type}</div>
    })} */}
    </>
    
    
    // <SpringModal {...this.state.workouts} />




  }


}

export default Workouts