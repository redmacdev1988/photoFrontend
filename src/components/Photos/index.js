import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhotos } from '../../services/Photos/actions';

const mainContainer = {
    backgroundColor:'black',
}

const galleryContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    alignContent: 'flex-start',
}

const searchStyle = {
    textTransform: 'uppercase',
    width: '40%',
    marginLeft: 'auto',
    marginRight: 'auto',
}
class Photos extends Component {
   
    constructor(props) {
        super(props);
        this.state = {  
            photos: null,
            value: '',
        } 
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const { getPhotosAction } = this.props;
        getPhotosAction();
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
        this.setState({
            value: event.target.value
        });
        const { treeWithPhotos } = this.props;
        let prepend = `http://139.199.66.12/daily-photos/${event.target.value}`;
        let results = treeWithPhotos.searchForAnyMatchStartingWith(prepend);
        this.setState({
            photos: results
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (!prevState.photos) {
            return {
                photos: (nextProps.treeWithPhotos) ? nextProps.treeWithPhotos.firstToLast() : [],
            }
        }
        else if (prevState.value === '' && prevState.photos && prevState.photos.length === 0) {
            return {
                photos: (nextProps.treeWithPhotos) ? nextProps.treeWithPhotos.firstToLast() : [],
            }
        }
        return {
            photos: prevState.photos,
        }
     }

    getURLTitle = url => (url.substring(url.lastIndexOf('/')+1, url.length));

    render() { 
        const { photos } = this.state;
        return (
            <div id="main" style={mainContainer}>

                    <div style={searchStyle} class="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                        <div class="btn-group mr-2" role="group" aria-label="First group">
                            <button onClick={this.aToZClicked} type="button" class="btn btn-secondary">A to Z</button>
                            <button onClick={this.zToAClicked} type="button" class="btn btn-secondary">Z to A</button>
                        </div>
                        <div class="input-group">
                            <div class="input-group-prepend">
                            <div class="input-group-text" id="btnGroupAddon">Search: </div>
                            </div>
                            <input value={this.state.value} onChange={this.handleChange} 
                                    type="text" class="form-control" placeholder="Image Title" 
                                    aria-label="Image Title" aria-describedby="btnGroupAddon" />
                        </div>
                    </div>

                <div style={galleryContainer}>
                {   
                    photos.map(photo => (
                        <div key={photo} class="card" style={{width: '23%', margin: '10px'}}>
                            <div class="card-body">
                            <h5 class="card-title" style={{margin:'0',padding:'0'}}>{this.getURLTitle(photo)}</h5>
                            </div>
                            <img src={photo} class="card-img-top" alt={photo} />
                      </div>
                    ))
                }
                </div>
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
