import React, { Component } from "react";
import axios from 'axios';

class Container extends Component {
  constructor() {
    super();
    this.state = {
      creator: null,
      title: null,
      summary: null,
      videoURL:"http://www.youtube.com/embed/vbBzXPQ4CFk",
      genre: null,
      location: null,
      paragraphs: null,
      pictures: null
    }
    this.requestDB = this.requestDB.bind(this);
    this.getData = this.getData.bind(this)
  }
  componentDidMount() {
    // sqlite db request
    // this.requestDB();
    // postgresql db request
    this.getData()
  }

  requestDB() {
    const path = window.location.pathname;
    console.log('logging path =>', path)
    axios.get(`/main${path}`)
      .then(({ data }) => {
        let main = data[0];
        this.setState({
          creator: main.creator,
          title: main.title,
          summary: main.summary,
          videoURL: main.videoURL,
          genre: main.genre,
          location: main.location
        })
      })
    axios.get(`/paragraphs${path}`)
      .then(({ data }) => {
        let paragraph = data[0];
        this.setState({
          paragraphs: paragraph.paragraph
        })
      })
    axios.get(`/pictures${path}`)
      .then(({ data }) => {
        let picture = data[0];
        this.setState({
          pictures: picture.pictureURL
        })
      })
  }

  getData () {
    let id = window.location.pathname.split('/')[1];
    axios.get('/main', {params: {id:id}})
    .then(({data}) => {
      data = data.rows[0]
      this.setState({
        title: data.projecttitle,
        summary: data.projectsummary,
        videoURL: data.projectvideo,
        location: data.address
      })
    })
    .then(() => {
      return axios.get('/paragraph', {params: {id:id}})
    })
    .then(({data}) => {
      data = data.rows[0]
      this.setState({
        paragraphs: data.descriptionentry
      })
    })
    .then(() => {
      return axios.get('/pictures', {params: {id:id}})
    })
    .then(({data}) => {
      data = data.rows[0]
      this.setState({
        pictures: data.pictureurl
      })
    })
    .catch((e) => {
      if(e) console.log('error in client =>', e)
    })
  }

  render() {
    return (
      <div id='start'>
        <div className="header-container">
          <div className="container">
            <div className="flexHeader">
              <a className="headerItem">Explore</a>
              <a className="headerItem">Start a project</a>
            </div>
            <div className="hackstarter">HACKSTARTER</div>
            <div className="flexHeader">
              <a className="headerItem">Search 🔍</a>
              <a className="headerItem">Sign in</a>
            </div>
          </div>
        </div>
        <div className='main'>
          <div>
            <h1 id='title'>{this.state.title}</h1>
            <p id='description'>{this.state.summary}</p>
          </div>
          <div className='main-container'>
            <div className="left-main">
              <div className="video">
                <iframe src={this.state.videoURL} allow="encrypted-media" allowFullScreen></iframe>
              </div>
              <div className='click-container'>
                <a className='click-inner'>
                  <i className="far fa-compass fa-xs"></i>
                  <div className='click'>{this.state.genre}</div>
                </a>
                <a className='click-inner'>
                  <i className="fas fa-map-marker-alt fa-xs"></i>
                  <div className='click'>{this.state.location}</div>
                </a>
              </div>
            </div>
          </div>
        </div>
        <nav className='navbar'>
          <div className='left-nav'>
            <a href="#cam" className='click-nav'>Campaign</a>
            <a href="#faq" className='click-nav'>FAQ</a>
            <a href="#com" className='click-nav'>Comments</a>
          </div>
          <div className='right-nav'>
            <a className='backThisProject'>Back this project</a>
            <a className='remindMe'> <i className="fas fa-heart fa-xs"> </i> Remind me </a>
          </div>
        </nav>
        <div className='info'>
          <div className='info-left'>
            <section id='cam'>
              <hr />
              <div className='campaign'>
                <div>Campaign</div>
                <hr />
                <div>{this.state.paragraphs}</div>
                <img src={this.state.pictures} />
              </div>
            </section>
            <section id='faq'>
              <hr />
              <div className='faq'>
                <div>FAQ</div>
                <hr />
                <div>{this.state.paragraphs}</div>
                <img src={this.state.pictures} />
              </div>
            </section>
            <section id='com'>
              <hr />
              <div className='comments'>
                <div>Comments Component</div>
                <hr />
              </div>
            </section>
            <section className='top'>
              <a href="#start" id='top'> <i class="far fa-caret-square-up fa-lg"></i> Top </a>
            </section>
          </div>
        </div>
      </div>
    );
  }
}
export default Container;