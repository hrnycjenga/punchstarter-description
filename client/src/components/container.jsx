import React, {Component} from "react";

class Container extends Component {
    constructor() {
        super();
        this.state = {
            id: null
        }
    }
    render() {
        return (
            <div> 
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
                    <hr/>
                <div>
                    <h1 id='title'>Magic Handmug</h1>
                    <p id='description'> SUMMARY: My product is state of the arts blah blah</p>
                </div>
                <div class='main-container'>
                    <div class = "left-main">
                        <div class="video">
                            <iframe src="http://www.youtube.com/embed/_OBlgSz8sSM" gesture="media" allow="encrypted-media" allowFullScreen></iframe>
                        </div>
                        <div class='click-container'>
                            <a class='click-inner'>
                                <i class="far fa-compass fa-xs"></i>
                                <div class='click'>Genre</div>
                            </a>
                            <a class='click-inner'>
                                <i class="fas fa-map-marker-alt fa-xs"></i>
                                <div class='click'>Location</div>
                            </a>
                        </div>
                    </div>
                    <div>
                        <div class="pledge1">Pledge Component</div>
                    </div>
                </div>
                <div class='navbar'>
                    <div>
                        NavBar

                    </div>
                </div>
            </div>
        );
    }
}
export default Container;