import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPhotos } from '../../services/Photos/actions'


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
    width: '80%',
    marginLeft: 'auto',
    marginRight: 'auto',
}

class Photos extends Component {
   
    constructor(props) {
        super(props);
        this.state = {  
            photos: null, // keeps a list of all the photos
            value: '',
            startsWithValue: '',
            selectedOption: null,
        } 
        this.titleContainsHandleChange = this.titleContainsHandleChange.bind(this);
        this.startsWithHandleChange = this.startsWithHandleChange.bind(this);
    }

    componentDidMount() {
        const { getPhotosAction } = this.props;
        getPhotosAction();
    }

    aToZClicked = event => {
        const { treeWithPhotos } = this.props;
        let arr = treeWithPhotos.firstToLast();

        let arrObj = [];
        for (let i = 0; i < arr.length; i++) {
            arrObj.push({
                found: [],
                pattern: '',
                url: arr[i]
            });
        }
        this.setState({
            photos: arrObj
        });
    };

    zToAClicked = event => {
        const { treeWithPhotos } = this.props;
        let arr = treeWithPhotos.lastToFirst();

        let arrObj = [];
        for (let i = 0; i < arr.length; i++) {
            arrObj.push({
                found: [],
                pattern: '',
                url: arr[i]
            });
        }
        this.setState({
            photos: arrObj,
        });
    };

    startsWithHandleChange(event) {
        let searchPattern = event.target.value.trim();

        if (!searchPattern || searchPattern === '') {
            console.log(`searchPattern: |${searchPattern}|`);

            this.setState({
                startsWithValue: searchPattern
            });

            const { treeWithPhotos } = this.props;
            let arr = treeWithPhotos.firstToLast();

            let arrObj = [];
            for (let i = 0; i < arr.length; i++) {
                arrObj.push({
                    found: [],
                    pattern: '',
                    url: arr[i]
                });
            }
            this.setState({
                photos: arrObj,
            });
        } else {

            this.setState({
                startsWithValue: searchPattern
            });
    
            const { treeWithPhotos } = this.props;
    
            let prepend = `http://localhost:6680/daily-photos/`;
            let results = treeWithPhotos.searchForStartingWith(prepend, searchPattern);
            this.setState({
                photos: results
            });
        }  
    }

    titleContainsHandleChange(event) {
       
        this.setState({
            value: event.target.value
        });
        const { treeWithPhotos } = this.props;
        let prepend = `http://localhost:6680/daily-photos/`;
        let results = treeWithPhotos.searchForAnyMatch(prepend, event.target.value);
        
        console.log(results);

        this.setState({
            photos: results
        });
    }

    static getDerivedStateFromProps(nextProps, prevState) {

        if (prevState.photos && prevState.photos.length === 0 && prevState.startsWithValue !== '') {
            console.log(' photo array is empty AND value of STARTS WITH exists');
            return {
                photos: []
            }
        }

        if (prevState.photos && prevState.photos.length === 0 && prevState.value !== '') {
            console.log(' photo array is empty AND value of TITLE CONTAINS exists');
            return {
                photos: []
            }
        }

        if (!prevState.photos) {
            console.log('no prev photo arr');
            if (nextProps.treeWithPhotos) {
                let arr = nextProps.treeWithPhotos.firstToLast();
                let arrObj = [];
                for (let i = 0; i < arr.length; i++) {
                    arrObj.push({
                        found: [],
                        pattern: '',
                        url: arr[i]
                    });
                }
                return {
                    photos: arrObj
                }
            } else {
                return {
                    photos: []
                }
            }

        }
        else if ((prevState.value === '' && prevState.photos && prevState.photos.length === 0)
        || (prevState.startsWithValue === '' && prevState.photos && prevState.photos.length === 0))  {
            if (nextProps.treeWithPhotos) {
                let arr = nextProps.treeWithPhotos.firstToLast();
                let arrObj = [];
                for (let i = 0; i < arr.length; i++) {
                    arrObj.push({
                        found: [],
                        pattern: '',
                        url: arr[i]
                    });
                }
                return {
                    photos: arrObj
                }
            } else {
                return {
                    photos: []
                }
            }
        }
        return {
            photos: prevState.photos,
        }
     }

    getURLTitle = url => {
        if (typeof url === 'string') {
            return url.substring(url.lastIndexOf('/')+1, url.length);
        } else if (typeof url === 'object') {
            return url.text;
        }
    }

    render() { 
        const { photos } = this.state;

        return (
            <div id="main" style={mainContainer}>
                <div style={searchStyle} className="btn-toolbar mb-3" role="toolbar" aria-label="Toolbar with button groups">
                    <div className="btn-group mr-2" role="group" aria-label="First group">
                        <button onClick={this.aToZClicked} type="button" className="btn btn-secondary">A to Z</button>
                        <button onClick={this.zToAClicked} type="button" className="btn btn-secondary">Z to A</button>
                    </div>
                    <div className="input-group">
                        <div className="input-group-prepend">
                        <div className="input-group-text" id="btnGroupAddon">Title contains: </div>
                        </div>
                        <input value={this.state.value} onChange={this.titleContainsHandleChange} 
                                type="text" className="form-control" placeholder="title name" 
                                aria-label="title name" aria-describedby="btnGroupAddon" />   
                    </div>

                    <div className="input-group">
                        <div className="input-group-prepend">
                        <div className="input-group-text" id="btnGroupStartsWith">Starts With: </div>
                        </div>
                        <input value={this.state.startsWithValue} onChange={this.startsWithHandleChange} 
                                type="text" className="form-control" placeholder="starts with" 
                                aria-label="starts with" aria-describedby="btnGroupStartsWith" />   
                    </div>

                </div>
                <div style={galleryContainer}>
                {   
                    photos.map(photoObj => (
                        <div key={photoObj.url} className="card" style={{width: '23%', margin: '10px'}}>
                            <div className="card-body">
                            <h5 className="card-title" style={{margin:'0',padding:'0'}}>{this.getURLTitle(photoObj.url)}</h5>
                            </div>
                            <a href={photoObj.url} target='_blank' rel='noopener noreferrer'>
                                <img src={photoObj.url} className="card-img-top" alt={photoObj.text} />
                            </a>
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
        // it is an AVL tree
        treeWithPhotos: photoReducer.photoData,
    }
}
  
  export default connect(mapStateToProps, {
    getPhotosAction: getPhotos,
  })(Photos);
