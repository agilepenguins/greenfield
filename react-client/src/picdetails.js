import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
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
      relatedImageDataMock: ["http://tinastraveldeals.co.uk/wp-content/uploads/2018/05/LV1.jpg", "https://www.letsgo2.com/blog/wp-content/uploads/2013/09/mgm-grand-las-vegas.jpg", "http://oneworld.com.lb/cms/wp-content/uploads/2014/09/mgm11.jpg", "http://freepost.me/wp-content/uploads/2018/01/mgm-grand-standard-room-fresh-in-unique-one-bedroom-suite-las-vegas-on-within-tower-4.jpg", "http://oneworld.com.lb/cms/wp-content/uploads/2014/09/mgm21.jpg"]
    };
  }

  componentDidMount() {
  }

  render() {
    return (
    <div>
        "This should be the picture details page, to be updated"
        <EmbeddedMap userLocation={'Austin+TX'} destination={'Niagra+Falls'}/>
        <div className="grid-container">
          {
            this.state.relatedImageDataMock.map((entry, index) => <div className="grid-item" key={index}><img className="pic" src={entry} /></div>)
          }
        </div>
    </div>);
  }
}

export default PicDetailsPage;
