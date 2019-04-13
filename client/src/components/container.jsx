import React, {Component} from "react";
import axios from 'axios';

class Container extends Component {
    constructor() {
        super();
        this.state = {
            //main
            creator: null,
            title: null,
            summary: null,
            videoURL: null,
            genre: null,
            location: null,
            //paragraph
            paragraphs: null,
            //picture
            pictures: null
        }
        this.requestDB = this.requestDB.bind(this);
    }
    componentDidMount() {
        this.requestDB();
    }

    requestDB() {
        const path = window.location.pathname;
        axios.get(`/main${path}`)
            .then(({data})=>{
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
            .then(({data})=>{
                let paragraph = data[0];
                this.setState({
                    paragraphs: paragraph.paragraph
                })
            })
        axios.get(`/pictures${path}`)
            .then(({data})=>{
                let picture = data[0];
                this.setState({
                    pictures: picture.pictureURL
                })
            })
    }

    render() {
        return (
            <div id='start'> 
                <div class="header-container">
                    <div class="container">
                        <div class="flexHeader">
                            <a class="headerItem">Explore</a>
                            <a class="headerItem">Start a project</a>
                        </div>
                        <div class="hackstarter">HACKSTARTER</div>
                        <div class="flexHeader">
                            <a class="headerItem">Search 🔍</a>
                            <a class="headerItem">Sign in</a>
                        </div>
                    </div>
                </div>
                <div class='main'>
                    <div>
                        <h1 id='title'>{this.state.title}</h1>
                        <p id='description'>{this.state.summary}</p>
                    </div>
                    <div class='main-container'>
                        <div class = "left-main">
                            <div class="video">
                                <iframe src="http://www.youtube.com/embed/_OBlgSz8sSM" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
                            </div>
                            <div class='click-container'>
                                <a class='click-inner'>
                                    <i class="far fa-compass fa-xs"></i>
                                    <div class='click'>{this.state.genre}</div>
                                </a>
                                <a class='click-inner'>
                                    <i class="fas fa-map-marker-alt fa-xs"></i>
                                    <div class='click'>{this.state.location}</div>
                                </a>
                            </div>
                        </div>
                        <div>
                            <div id="pledge1" class="pledge1">Pledge Component 1</div>
                        </div>
                    </div>
                </div>
                <nav class='navbar'>
                    <div class='left-nav'>
                        <a href="#cam" class='click-nav'>Campaign</a>
                        <a href="#faq" class='click-nav'>FAQ</a>
                        <a href="#com" class='click-nav'>Comments</a>
                    </div>
                    <div class='right-nav'>
                        <a class='backThisProject'>Back this project</a>
                        <a class='remindMe'> <i class="fas fa-heart fa-xs"> </i> Remind me </a>
                    </div>
                </nav>
                <div class='info'>
                    <div class='info-left'>
                        <section id='cam'>
                            <hr/>
                            <div class='campaign'>
                                <div>Campaign</div>
                                <hr/>
                                <div>{this.state.paragraphs}</div>
                                <img src={this.state.pictures} />
                            </div>
                        </section>
                        <section id='faq'>
                            <hr/>
                            <div class='faq'>
                                <div>FAQ</div>
                                <hr/>
                                <div>{this.state.paragraphs}</div>
                                <img src={this.state.pictures} />
                            </div>
                        </section>
                        <section id='com'>
                            <hr/>
                            <div class='comments'>
                                <div>Comments Component</div>
                                <hr/>
                            </div>
                        </section>
                        <section class='top'>
                            <a href="#start" id='top'> <i class="far fa-caret-square-up fa-lg"></i> Top </a>
                        </section>
                    </div>
                    <div class='info-right'>
                        <div id="pledge2">Pledge Component 2</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Container;