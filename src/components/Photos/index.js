import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhotos } from '../../services/Photos/actions'

// Component has bunch of methods we are going to inherit into Counter class
class Photos extends Component {
   
    constructor(props) {
        super(props);
        this.state = {  
            count: 0,
            imageUrl: "https://picsum.photos/200",
            photos: [],
            value:'',
        } 

        this.handleChange = this.handleChange.bind(this);
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

    handleChange(event) {
        console.log(`handleChange: ${event.target.value}`);
        this.setState({value: event.target.value});

        const { treeWithPhotos } = this.props;
        
        let prepend = `http://139.199.66.12/daily-photos/${event.target.value}`;
        let results = treeWithPhotos.searchForAnyMatchStartingWith(prepend);
        console.log(results);

        // https://github.com/moroshko/react-autosuggest
        // use react autosugget
      }

    render() { 
        //console.log('--render--');
        const { photos } = this.state;
        //console.log(photos);
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
    const { photoReducer } = state;
    return {
        treeWithPhotos: photoReducer.photoData,
    }
}
  
  export default connect(mapStateToProps, {
    getPhotosAction: getPhotos,
  })(Photos);
