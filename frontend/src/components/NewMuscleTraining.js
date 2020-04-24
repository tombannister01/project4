import React from 'react'
import axios from 'axios'
import auth from '../auth/auth'

class NewMuscleTraining extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {
        name: '',
        muscles_worked: '',
        weight: '',
        sets: '',
        reps: ''
      }
    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
  }

  handleSubmit(event) {
    event.preventDefault()
    axios.post('/api/workouts/muscle_training/',
      this.state.data,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.props.history.push('/workouts'))
      .catch(err => this.setState({ error: err.response.data.errors }))
  }



  render() {
    const data = this.state.data
    return <section className="section">
      <div className="box">
        <form className="form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <div className="field">
            <label className="label">Name of workout</label>
            <div className="control">
              <input className="input" type="text"
                placeholder="e.g.  Bicep curls, Bench press etc."
                value={data.name}
                name="name"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Muscle/Muscle groups worked</label>
            <div className="control">
              <input className="input" type="text"
                placeholder="e.g.  Arms, Chest etc."
                name="muscles_worked"
                value={data.muscles_worked}
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Weight(kg)</label>
            <div className="control">
              <input className="input" type="text"
                name="weight"
                value={data.weight}
                onChange={(event) => this.handleChange(event)}

              />
            </div>
          </div>
          <div className="field">
            <label className="label">Sets</label>
            <div className="control">
              <input className="input" type="text"
                name="sets"
                value={data.sets}
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Reps</label>
            <div className="control">
              <input className="input" type="text"
                name="reps"
                value={data.reps}
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </div>
          <button
            onClick={(event) => this.handleSubmit(event)}
            className="button">
            Post Workout
          </button>
        </form>
      </div>
    </section>

  }





}

export default NewMuscleTraining