import React from 'react';
import {
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import axios from 'axios';
import EmbeddedMap from './map';

class PicDetailsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      userLocation: { latitude: 30.3079827, longitude: -97.8934851 }, // set to Austin, TX for testing
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
    return (
    <div>
        <h1>{this.state.dbDetails.location}</h1>
        <EmbeddedMap userLocation={this.state.userLocation}
        destination={this.state.dbDetails.location.split(' ').join('+')}/>
        <div className="grid-container">
          {
            JSON.parse(this.state.dbDetails.related_images).map((entry, index) =>
            <div className="grid-item" key={index}><a href={entry}><img className="pic" src={entry} /></a></div>)
          }
        </div>
    </div>);
  }
}

export default PicDetailsPage;
