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
                <div class="grid-container">
                    <div class="container">
                        <div class="flexHeader">
                            <div class="headerItem">Explore</div>
                            <div class="headerItem">Start a project</div>
                        </div>
                        <div class="item1">HACKSTARTER</div>
                        <div class="flexHeader">
                            <div class="headerItem">Search</div>
                            <div class="headerItem">Sign in</div>
                        </div>
                    </div>
                </div>
                    <hr/>
                <div>
                    <h1 id='title'>Magic Handmug</h1>
                    <p id='description'> SUMMARY: My product is state of the arts blah blah</p>
                </div>
            </div>
        );
    }
}
export default Container;