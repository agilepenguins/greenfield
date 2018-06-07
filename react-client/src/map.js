import React from 'react';
import ReactDOM from 'react-dom';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from 'react-google-maps';

let mapURLTest = 'https://www.google.com/maps/dir/?api=1&origin=Niagra+Falls+New+York&destination=Sydney+NSW+Australia';

const EmbeddedMap = props => (
    <div>
      <iframe
        width="600"
        height="450"
        frameBorder="0" style={{ border: '0' }}
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/directions?key=(API KEY HERE)
        &origin=${props.userLocation}
        &destination=${props.destination}
        &mode=flying`} >
      </iframe>
    </div>
);

export default EmbeddedMap;
