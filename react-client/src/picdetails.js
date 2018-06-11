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
import ImageGallery from 'react-image-gallery';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

class PicDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      userLocation: 'Austin-Bergstrom+International+Airport', // set to Austin, TX for testing
      dbDetails: {
        ID: undefined, labels: undefined, location: undefined, related_images: '[]',
      },
      yelpData: {businesses:[]},
      yelpLoaded: false,
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

  componentDidUpdate() {

    console.log(this.state.dbDetails.location);
    if (this.state.dbDetails.location && !this.state.yelpLoaded) {
      axios.post('yelp', {location: this.state.dbDetails.location })
        .then((response) => {
          console.log('Got yelp data: ', response.data);
          this.setState({
            yelpData: response.data,
            yelpLoaded: true,
          });
        })
        .catch((err) => {
          console.log('ERROR: ', err);
        });
    }
  }

  render() {
    const images = JSON.parse(this.state.dbDetails.related_images).map(imgUrl => ({ original: imgUrl, thumbnail: imgUrl }));

    return (

    <div style={{ width: '100%' }}>
      <AppBar color="default">
        <Toolbar>
          <img className="appBarLogo" src="https://i.imgur.com/Y9EuxAX.png"/>
          <div className="locationTitle" style={{ width: '25%' }}><p>{this.state.dbDetails.location || 'Loading...'}</p></div>
          <div style={{ width: '75%', textAlign: 'right' }}>
          <Button color="default"><Link to={'/home'} style={{ textDecoration: 'none' }}>explore</Link></Button>
          <Button color="default"><Link to={'/'} style={{ textDecoration: 'none' }}>Logout</Link></Button>
          </div>
        </Toolbar>
      </AppBar>
      <div className="belowAppBar">

        <Grid container spacing={16} alignItems='center'>

          <Grid item xs={12}>
            <EmbeddedMap userLocation={this.state.userLocation}
            destination={this.state.dbDetails.location ?
              this.state.dbDetails.location.split(' ').join('+') : ''
              }/>
          </Grid>

      <Grid item xs={12}>
        <ImageGallery items={images} autoPlay={true}/>
      </Grid>

       <Grid item xs={12}>
          <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Top 10 Restaurants Nearby</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Typography>
          {
            this.state.yelpData.businesses.map(restaurant =>
            <div className="restaurant-border" key={restaurant.id}>
            <div className="restaurant-top">
            <div className="restaurant-item"><a style={{ textDecoration: 'none', color: 'black' }} href={restaurant.url}><h3>{restaurant.name}</h3></a></div>
            <div><h3>{restaurant.location.address1}</h3></div>
            </div>
            <div className="restaurant-bottom">
            <div style={{ paddingRight: '10px' }}><a style={{ textDecoration: 'none', color: 'black' }} href={restaurant.url}><img className="restaurant-pic" src={restaurant.image_url}/></a></div>
            <div>
            <div> Category: {restaurant.categories[0].title}</div>
            <div> Phone: {restaurant.display_phone}</div>
            <div> Rating (out of 5 stars): {restaurant.rating}</div>
            <div> Price: {restaurant.price}</div>
            </div>
            </div>

            </div>)
          }
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
            BOOK A HOTELBOOK A HOTELBOOK A HOTELBOOK A HOTELBOOK A HOTELBOOK A HOTELBOOK A HOTELBOOK A HOTELBOOK A HOTELBOOK A HOTEL
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
