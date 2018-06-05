import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Input, TextField } from '@material-ui/core';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmitLogin = this.onSubmitLogin.bind(this);
    this.onSubmitSignup = this.onSubmitSignup.bind(this);
  }

  componentDidMount() {
  }

  onChangeUsername(e) {
    this.setState({ username: e.target.value });
  }

  onChangePassword(e) {
    this.setState({ password: e.target.value });
  }

  // NEED TO ADD BUTTON FUNCTIONALITY THESE ARE JUST FOR STYLING ATM

  onSubmitLogin(e) {
    let data = e.target.value;
    axios.post('/login', data)
      .then((response) => {
        console.log(data, 'is submitted');
      })
      .catch((error) => {
        console.log('login error: ', error);
      });
  }

  onSubmitSignup(e) {
    let data = e.target.value;
    axios.post('/signup', data)
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
      <div className="loginform">
        <img className="logo" src="https://i.imgur.com/Y9EuxAX.png"/><br/>
        <TextField className="username" onChange={this.onChangeUsername} placeholder="Username"></TextField><br/>
        <TextField className="password" onChange={this.onChangePassword} placeholder="Password"></TextField><br/>
        <Button className="loginbutton" onClick={this.onSubmitLogin}>LOGIN</Button><br/>
        <Button className="signupbutton" onClick={this.onSubmitSignup}>SIGN UP</Button><br/>
        <hr className="linebreak"/>
        <div className="or">or</div>
        <Button className="google">placeholder</Button><br/>
        <Button className="facebook">placeholder</Button><br/>
      </div>
    </div>);
  }
}

export default Login;
