import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {
  Route,
  NavLink,
  HashRouter,
} from 'react-router-dom';
import axios from 'axios';

class Homepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: ['empty'],
      image_url: '',
    };
    this.onChangeURL = this.onChangeURL.bind(this);
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

    // $.ajax({
    //   method: 'GET',
    //   url: '/home',
    //   contentType: "application/json",
    //   dataType: "HTML"
    // }).done((response) => {
    //   this.setState({
    //     labels: JSON.parse(response)
    //   });
    //   console.log('Finished GETTING from server - clientside');
    // });
  }

  onChangeURL(e) {
    this.setState({ image_url: e.target.value });
    console.log(this.state.image_url);
  }

  onSubmit(e) {
    let data = { image_url: this.state.image_url };
    axios.post('/submit', data)
      .then((response) => {
        console.log('Passing request from front-end...');
        window.location.reload();
      })
      .catch((error) => {
        console.log('SUBMIT NOT WORKING', error);
      });

    // $.ajax({
    //   method: 'POST',
    //   url: '/submit',
    //   contentType: 'application/json',
    //   data: data
    // })
    // .done((response) => {
    //   console.log(`Passing request from front-end...`);
    //   window.location.reload();
    // });
  }

  render() {
    return (
    <div>
      <h1>A picture is worth a thousand words...</h1>
      <form>
        <input onChange={this.onChangeURL}></input>
        <input onClick={this.onSubmit} type="submit" value="submit"/>
      </form>
      <br/>
      <div className="grid-container">
        {
          this.state.labels.map((entry, index) => <div className="grid-item" key={index}>{`Labels: ${entry.labels}`}<br/><a href={entry.image_url}><img className="pic" src={entry.image_url}/></a></div>)
        }
        </div>
    </div>);
  }
}

export default Homepage;
