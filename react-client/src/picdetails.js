import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import axios from 'axios';

class PicDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      testvalue: 'a',
    };
  }

  componentDidMount() {
  }

  render() {
    return (
    <div>
      This is: {this.state.testvalue}<br/>
      This should be the picture details page, to be updated
    </div>);
  }
}

export default PicDetailsPage;
