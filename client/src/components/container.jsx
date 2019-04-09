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
                <link href="https://fonts.googleapis.com/css?family=Titan+One" rel="stylesheet"/>
                <div class="header-container">
                    <div class="container">
                        <div class="flexHeader">
                            <div class="headerItem">Explore</div>
                            <div class="headerItem">Start a project</div>
                        </div>
                        <div class="hackstarter">HACKSTARTER</div>
                        <div class="flexHeader">
                            <div class="headerItem">Search 🔍</div>
                            <div class="headerItem">Sign in</div>
                        </div>
                    </div>
                </div>
                    <hr/>
                <div>
                    <h1 id='title'>Magic Handmug</h1>
                    <p id='description'> SUMMARY: My product is state of the arts blah blah</p>
                </div>
                <div class='main-container'>
                    <div>
                        <div class="video">
                            <div>
                                <iframe frameborder="0" allowfullscreen="" src="http://www.youtube.com/embed/_OBlgSz8sSM"></iframe>
                            </div>
                        </div>
                        <div class='click-container'>
                            <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossorigin="anonymous"/>
                            <div class='click'>Genre</div>
                            <i class="fas fa-map-marker-alt fa-xs"></i>
                            <div class='click'>Location</div>
                        </div>
                    </div>
                    <div>
                        <div class="pledge1">Pledge Component</div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Container;