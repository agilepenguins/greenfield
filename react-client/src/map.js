import React from 'react';
import MAPS_API_KEY from './config';

const EmbeddedMap = props => (
    <div>
      <iframe
        width="100%"
        height="675"
        frameBorder="0" style={{ border: '0' }}
        allowFullScreen
      src={`https://www.google.com/maps/embed/v1/directions?key=${MAPS_API_KEY}
        &origin=${props.userLocation}
        &destination=${props.destination}
        &mode=flying`} >
      </iframe>
    </div>
);

export default EmbeddedMap;
