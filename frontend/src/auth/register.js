import React from 'react'
import axios from 'axios'
import SignUp from '../components/RegisterPage'

class Register extends React.Component {

  constructor() {
    super()
    this.state = {
      data: {
        email: '',
        username: '',
        password: '',
        password_confirmation: ''
      },
      errors: {}
    }
  }

  handleChange(event) {
    console.log(event)
    const { name, value } = event.target
    const data = { ...this.state.data, [name]: value }
    this.setState({ data })
    console.log(this.state.data)
  }

  handleSubmit(event) {
    event.preventDefault()
    console.log(this.state.data)
    axios.post('/api/register',
      this.state.data, { headers: { 'Authorization': '' } })
      .then(() => this.props.history.push('/'))
      .catch(err => this.setState({ errors: err.response.data }))
    // console.log('err:', err.response.data))


  }

  render() {
    return <>
      <SignUp
        {...this.state.errors}
        handleChange={(event) => this.handleChange(event)}
        handleSubmit={(event) => this.handleSubmit(event)} />
      {console.log('errors:', this.state.errors)}
    </>
  }

}

export default Register