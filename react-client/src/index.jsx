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

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <HashRouter>
        <div>
          <div className="content">
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login}/>
          </div>
        </div>
        </HashRouter>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
