import React from 'react';
import {
  Route,
  NavLink,
  HashRouter,
  Link,
} from 'react-router-dom';
import axios from 'axios';
import EmbeddedMap from './map';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ImageGallery from 'react-image-gallery';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar } from '@material-ui/core';
import Button from '@material-ui/core/Button';

class PicDetailsPage extends React.Component {
  

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      userLocation: 'Austin-Bergstrom+International+Airport', // set to Austin, TX for testing
      dbDetails: {
        ID: undefined, labels: undefined, location: 'Loading...', related_images: '[]',
      },
    };
  }

  // TODO: try using this in deployment to get user location
  getLocation() {
    const geolocation = navigator.geolocation;

    const location = new Promise((resolve, reject) => {
      if (!geolocation) {
        reject(new Error('Not Supported'));
      }

      geolocation.getCurrentPosition((position) => {
        resolve(position);
      }, () => {
        reject(new Error('Permission denied'));
      });
    });

    location()
      .then((result) => {
        console.log(result); // should look like {latitude, longitude}
        const { coords: { latitude, longitude } } = result;
        this.setState({
          userLocation: coords,
        });
      })
      .catch(err => console.log(err));
  }

  componentDidMount() {
    let data = { ID: this.state.id };
    axios.post('/details', data)
      .then((response) => {
        this.setState({
          dbDetails: response.data[0],
        });
        console.log('got pic details from db');
      })
      .catch((error) => {
        console.log('ERROR: ', error);
      });
  }

  render() {
    const images = JSON.parse(this.state.dbDetails.related_images).map(imgUrl => { return {original:imgUrl, thumbnail:imgUrl};});

    return (
    <div style={{ width: '100%' }}>
      <AppBar color="default">
      <Toolbar>
        <img className="appBarLogo" src="https://i.imgur.com/Y9EuxAX.png"/>
        <p className="appLocation">{this.state.dbDetails.location}</p>
        <div className="appBarButtons">
          <Link to="/home"><Button color="default">explore</Button></Link>
          <Link to="/"><Button color="default">Logout</Button></Link>
        </div>
      </Toolbar>
      </AppBar>
      <div className="belowAppBar">
      {/* <h1>{this.state.dbDetails.location}</h1> */}
        <Grid container spacing={16} alignItems='center'>

          <Grid item xs={12}>
            <EmbeddedMap userLocation={this.state.userLocation}
            destination={this.state.dbDetails.location.split(' ').join('+')}/>
          </Grid>

      <Grid item xs={12}>
        <ImageGallery items={images} autoPlay={true}/>
      </Grid>

       <Grid item xs={12}>
          <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Restaurants Nearby</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            RESTAURANTS NEAR!!!!!!
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Flights</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            FLIGHTS NEARBY
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Hotels</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            BOOK A HOTEL
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Events</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
            LOOK AT EVENTS
          </Typography>
        </ExpansionPanelDetails>
      </ExpansionPanel>
          </Grid>


        </Grid>
        </div>
    </div>);
  }
}


export default PicDetailsPage;
