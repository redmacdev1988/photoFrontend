import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhotos } from '../../services/Photos/actions'

// Component has bunch of methods we are going to inherit into Counter class
class Photos extends Component {
   
    constructor(props) {
        console.log('Photos - constructor');
        super(props);
        this.state = {  
            photos: [],
            value: '',
        } 

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        console.log(`Photos/index.js - componentDidMount`);
        const { getPhotosAction } = this.props;
        getPhotosAction();

        // const { treeWithPhotos } = this.props;
        // this.setState({
        //     photos: treeWithPhotos.firstToLast(),
        // });

        console.log(`done  - componentDidMount`);
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
        const { treeWithPhotos } = this.props;
        this.setState({
            photos: treeWithPhotos.firstToLast(),
        });
    };

    zToAClicked = event => {
        const { treeWithPhotos } = this.props;
        this.setState({
            photos: treeWithPhotos.lastToFirst(),
        });
    };

    handleChange(event) {
        this.setState({value: event.target.value});
        const { treeWithPhotos } = this.props;
        let prepend = `http://139.199.66.12/daily-photos/${event.target.value}`;
        let results = treeWithPhotos.searchForAnyMatchStartingWith(prepend);
        this.setState({
            photos: results,
        })
    }

    render() { 
        console.log('--render--');
        const { photos } = this.state;
        
        if (photos.length === 0) {
            console.log('no photos, we just use initial array');
            const { initialArray } = this.props;
            return (
                <div id="main">
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <button onClick={this.aToZClicked} className="btn btn-secondary btn-sm">A-Z</button>
                    <button onClick={this.zToAClicked} className="btn btn-secondary btn-sm">Z-A</button> 
                    {   
                        (initialArray) ? initialArray.map(photo => (
                            <li className="list-group-item" style={{color: 'black'}} key={photo}>
                                <img src={photo} alt="some photos"/> 
                            </li>
                        )) // map
                        : null
                    }
                </div> 
            );
        }

        return (
            <div id="main">
                <input type="text" value={this.state.value} onChange={this.handleChange} />
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

const mapStateToProps = function(state) {
    console.log(`-- mapStateToProps --`);
    const { photoReducer } = state;
    console.log(photoReducer.photoData);
    return {
        treeWithPhotos: photoReducer.photoData,
        initialArray: photoReducer.initialArray,
    }
}
  
  export default connect(mapStateToProps, {
    getPhotosAction: getPhotos,
  })(Photos);
