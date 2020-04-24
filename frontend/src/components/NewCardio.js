import React from 'react'
import axios from 'axios'
import auth from '../auth/auth'

class NewCardio extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {
        type: '',
        duration: '',
        distance: '',
        speed: ''
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
    const dataToPost = this.state.data
    const speed = Number(dataToPost.duration) / Number(dataToPost.distance)
    dataToPost.speed = speed
    axios.post('/api/workouts/cardio/',
      dataToPost,
      { headers: { Authorization: `Bearer ${auth.getToken()}` } })
      .then(res => this.props.history.push('/workouts'))
      .catch(err => this.setState({ error: err.response.data.errors }))
    console.log(dataToPost)
  }



  render() {
    const data = this.state.data
    return <section className="section">
      <div className="box">
        <form className="form"
          onSubmit={(event) => this.handleSubmit(event)}
        >
          <div className="field">
            <label className="label">Type of cardio</label>
            <div className="control">
              <input className="input" type="text"
                placeholder="e.g.  run, cycle etc"
                value={data.type}
                name="type"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </div>

          <div className="field">
            <label className="label">Duration (mins)</label>
            <div className="control">
              <input className="input" type="text"
                value={data.duration}
                name="duration"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Distance (km)</label>
            <div className="control">
              <input className="input" type="text"
                value={data.distance}
                name="distance"
                onChange={(event) => this.handleChange(event)}
              />
            </div>
            <button
              onClick={(event) => this.handleSubmit(event)}
              className="button">
              Post Workout
            </button>
          </div>

        </form>
      </div>
    </section>



  }

}

export default NewCardio