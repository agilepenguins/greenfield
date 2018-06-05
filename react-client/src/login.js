import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  onSubmit(e) {
    let data = e.target.value;
    axios.post('/login', data)
      .then((response) => {
        console.log(data, 'is submitted');
      })
      .catch((error) => {
        console.log('login error: ', error);
      });
  }

  render() {
    return (
    <div className="loginbody">
      <h1>Login</h1>
      <form>
        <input onChange={this.onChangeUsername}></input>
        <input onChange={this.onChangePassword}></input>
        <input onClick={this.onSubmit} type="submit" value="submit"/>
      </form>
    </div>);
  }
}

export default Login;
