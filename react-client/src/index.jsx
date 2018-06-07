import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';

import Home from './homepage';
import Login from './login';
import UserPage from './userpage';
import PicDetailsPage from './picdetails';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <HashRouter>
        <div className="content">
          <Route exact path="/" component={Login}/>
          <Route path="/home" component={Home}/>
          <Route path="/userpage" component={UserPage}/>
          <Route path="/picdetails/:id" component={PicDetailsPage}/>
        </div>
      </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
