import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhotos } from '../../services/Photos/actions'
import Carousel from 'react-bootstrap/Carousel';

// Component has bunch of methods we are going to inherit into Counter class
class Photos extends Component {
    state = {  
        count: 0,
        imageUrl: "https://picsum.photos/200",
        photos: [],
    } 

    componentDidMount() {
        console.log(`Photos/index.js - componentDidMount`);
        const { getPhotosAction } = this.props;
        getPhotosAction();
    }
    formatCount() {
        return this.state.count === 0 ? "Zero" : this.state.count;
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += this.state.count === 0 ? "warning" : "primary";
        return classes;
    }

    styles = {
        fontSize: 30,
        fontWeightz: 'bold'
    }

    aToZClicked = event => {
        console.log("aToZClickedclicked");
        const { treeWithPhotos } = this.props;
        this.setState({
            photos: treeWithPhotos.firstToLast(),
        });
    };

    zToAClicked = event => {
        console.log("zToAClicked was clicked");
        const { treeWithPhotos } = this.props;
        this.setState({
            photos: treeWithPhotos.lastToFirst(),
        });
    };

    render() { 
        console.log('--render--');
        const { photos } = this.state;
        console.log(photos);
        return (
            <div id="main">
                <button onClick={this.aToZClicked} className="btn btn-secondary btn-sm">A-Z</button>
                <button onClick={this.zToAClicked} className="btn btn-secondary btn-sm">Z-A</button>
                <ul className="list-group">
                {
                    photos.map(photo => (
                        <li className="list-group-item" style={{color: 'black'}} key={photo}>
                            <img src={photo} alt="some photos"/> 
                        </li>
                    )) // map
                }
                </ul>
            </div> 
        );
    }
}
/*
<a class="left carousel-control" data-slide="prev" href="#gallery-carousel"><span class="icon-prev"></span></a>
<a class="right carousel-control" data-slide="next" href="#gallery-carousel"><span class="icon-next"></span></a>
 */

/* // works great
<div id="main">
                <span style={this.styles} className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button onClick={this.aToZClicked} className="btn btn-secondary btn-sm">A-Z</button>
                <button onClick={this.zToAClicked} className="btn btn-secondary btn-sm">Z-A</button>
                <ul className="list-group">
                {
                    photos.map(photo => (
                        <li className="list-group-item" style={{color: 'black'}} key={photo}>
                            <img src={photo} alt="some photos"/> 
                        </li>
                    )) // map
                }
                </ul>
           </div>

*/

const mapStateToProps = function(state) {
    const { photoReducer } = state;
    return {
        treeWithPhotos: photoReducer.photoData,
    }
}
  
  export default connect(mapStateToProps, {
    getPhotosAction: getPhotos,
  })(Photos);
