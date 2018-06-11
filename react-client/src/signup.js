import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  NavLink,
  HashRouter,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { Input, TextField } from '@material-ui/core';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
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
        <Link to="/home" style={{ textDecoration: 'none' }}><Button className="signupbutton" onClick={this.onSubmitSignup}>SIGN UP</Button></Link>
      </div>
    </div>);
  }
}

export default Signup;
