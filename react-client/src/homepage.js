import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  NavLink,
  HashRouter,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { TextField } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import StarBorderIcon from '@material-ui/icons/StarBorder';


class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['empty'],
      image_url: '',
      location: '',
    };
    this.onChangeURL = this.onChangeURL.bind(this);
    this.onChangeLocation = this.onChangeLocation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    axios.get('/home')
      .then((response) => {
        this.setState({
          labels: response.data,
        });
        console.log('finished GETTING from server - clientside');
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      });
  }

  onChangeURL(e) {
    this.setState({ image_url: e.target.value });
  }

  onChangeLocation(e) {
    this.setState({ location: e.target.value });
  }

  onSubmit(e) {
    console.log('searching');
    let data = { image_url: this.state.image_url, location: this.state.location };
    if (data.image_url) {
      axios.post('/submit', data)
        .then((response) => {
          console.log('Response from server', JSON.stringify(response.data));
          console.log('Passing request from front-end...');
          window.location.reload();
        })
        .catch((error) => {
          console.log('SUBMIT NOT WORKING', error);
        });
    } else {
      alert('Image URL was empty, try again');
    }
  }

  render() {
    return (
    <div>
      <AppBar color="default">
        <Toolbar>
          <img className="appBarLogo" src="https://i.imgur.com/Y9EuxAX.png"/>
          <TextField className="searchfield" onChange={this.onChangeURL} color="inherit" placeholder="Search Image URL" fullWidth></TextField>
          <Button onClick={this.onSubmit} color="inherit">Search</Button>
          <Button color="inherit">explore</Button>
          <Button color="inherit">home</Button>
          <Button color="inherit">Logout</Button>
        </Toolbar>
      </AppBar>
      <div className="belowAppBar">

        {/* <GridList cols={5} className="gridList">
          {
            this.state.labels.map((entry, index) =>
            <GridListTile key={index}>
                <a href={entry.image_url}><img className="pic" src={entry.image_url}/></a>
                <GridListTileBar
                title={`Location: ${entry.location}`}
                titlePosition="top"
                actionIcon={
                  <IconButton className="starIcon">
                    <StarBorderIcon />
                  </IconButton>
                }
                actionPosition="left"
                className="titleBar"/>
            </GridListTile>)
          }
        </GridList> */}

        <div className="grid-container">
          {
            this.state.labels.map((entry, index) =>
            <div className="item" key={index}>
            <Link to="/picdetails" query={{ testvalue: 'hello' }}><img className="pic" src={entry.image_url}/></Link>
            </div>)
          }
        </div>

        {/* <div className="grid-container">
          {
            this.state.labels.map((entry, index) =>
            <div className="item" key={index}>
            <div className="content">{`Location: ${entry.location}`}<br/>
            <a href={entry.image_url}><img className="pic" src={entry.image_url}/></a>
            </div>
            </div>)
          }
        </div> */}

      </div>
    </div>);
  }
}

export default Homepage;
