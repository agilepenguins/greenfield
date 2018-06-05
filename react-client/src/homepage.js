import React from 'react';
import ReactDOM from 'react-dom';
import {
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import axios from 'axios';
// import styles from './homepage.css';

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
      <form>
        <p>Image URL</p><b/>
        <input onChange={this.onChangeURL}></input><b/>
        <input onClick={this.onSubmit} type="submit" value="submit"/>
      </form>
      <br/>
      <div className="grid-container">
        {
          this.state.labels.map((entry, index) => <div className="grid-item" key={index}>{`Location: ${entry.location}`}<br/><a href={entry.image_url}><img className="pic" src={entry.image_url}/></a></div>)
        }
        </div>
    </div>);
  }
}

export default Homepage;
