import React from 'react'
import auth from './auth'
import axios from 'axios'
import SignInSide from '../components/LoginPage'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        password: ''
      },
      error: ''

    }
  }

  handleChange(event) {
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data: data })
  }

  handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login',
      this.state.data, { headers: { 'Authorization': '' } })
      .then(res => {
        console.log(res)
        const token = res.data.token
        auth.setToken(token)
        this.props.history.push('/workouts')
      })
      .catch(err => this.setState({ error: err.response.data.message }))
  }

  render() {
    // const { error } = this.state
    return <>
      <SignInSide
        handleChange={(event) => this.handleChange(event)}
        handleSubmit={(event) => this.handleSubmit(event)}
        error={this.state.error}
      />
      {console.log('first error:' , this.state.error)}
    </>
  }


}
export default Login