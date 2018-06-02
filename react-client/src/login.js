import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
    Route,
    NavLink,
    HashRouter
  } from "react-router-dom";
import axios from 'axios';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
        username: '',
        password: ''
    }
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);    
    this.onSubmit = this.onSubmit.bind(this);    
  }

  componentDidMount() {
    // $.ajax({
    //   method: 'GET',
    //   url: '/home',
    //   contentType: "application/json",
    //   dataType: "HTML"
    // }).done((response) => {
    //   this.setState({
    //     labels: JSON.parse(response)
    //   });
    //   console.log('Finished GETTING from server - clientside');
    // });
  }

  onChangeUsername(e) {
    this.setState({username: e.target.value});
  }

  onChangePassword(e) {
    this.setState({password: e.target.value});
  }

  onSubmit(e) {
    let data = e.target.value;
    axios.post('/login', data)
    .then((response) => {
      console.log(data, 'is submitted');
    })
    .catch((error) => {
      console.log('login error: ', error)
    })

    // $.ajax({
    //   method: 'POST',
    //   url: '/login',
    //   contentType: 'application/json',
    //   data: data
    // })
    // .done((response) => {
    // });
  }

  render () {
    return (
    <div>
      <h1>Login</h1>
      <form>
        <input onChange={this.onChangeUsername}></input>
        <input onChange={this.onChangePassword}></input>        
        <input onClick={this.onSubmit} type="submit" value="submit"/>
      </form>
    </div>)
  }
}

export default Login