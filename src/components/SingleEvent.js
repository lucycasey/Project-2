import React from 'react'
import axios from 'axios'
import MapGL, { Marker, Popup } from 'react-map-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

var config = {
  headers: { 'Authorization': 'Bearer ' + process.env.API_KEY }
}

const Token = 'pk.eyJ1IjoicGhvZWJleHh4YyIsImEiOiJjazMxenUxYmUwZGdhM2xzMmVwZG5iNnQ0In0.NS8058Cpk5wl3Qko8cJQiQ'

class SingleEvent extends React.Component {

  constructor() {
    super()
    this.state = {
      viewport: {
        width: 800,
        height: 600,
        longitude: -0.12743,
        latitude: 51.5074,
        zoom: 14,
        bearing: 0,
        pitch: 0
      },
      event: {}
    }
  }

  componentDidMount() {
    const id = this.props.match.params.id
    axios.get(`https://api.list.co.uk/v1/events/${id}`, config)

      .then(resp => 
        this.setState({ event: resp.data }))
  }

  _updateViewport = ()=> {
    this.setState(preveState =>
      ({ viewport: {
        ...preveState.viewport,
        longitude: this.state.event.schedules[0].place.lng,
        latitude: this.state.event.schedules[0].place.lat
      } })
    )
  }

  _renderPopup() {
    return (
      this.state.info && (
        <Popup 
          tipSize={5}
          anchor="top"
          longitude={this.state.info.schedules[0].place.lng}
          latitude={this.state.info.schedules[0].place.lat}
          closeOnClick={false}
          onClose={() => this.setState({ info: null })}
        >
          <div>{this.state.info.name}</div>
          <div>{this.state.info.schedules[0].place.address}</div>
          <div>{this.state.event.schedules[0].place.town}</div>
          <div>{this.state.event.schedules[0].place.postal_code}</div>
          <img width={240} src={this.state.event.images ? this.state.event.images[0].url : null} />
          <div>
            <a href={this.state.info.website} target='_blank'>More Info</a>
          </div>
        </Popup>
      )
    )
  }

  render() {
    if (!this.state.event.schedules, !this.state.event.descriptions) {
      return <h1>Loading...</h1>
    }
    return <div className="column"> 
      <div className="section">
        <div className="container">
          <div className="columns is-multiline">
            <div className="column is-half-tablet">
              <br/>
              <p className="title">
                {this.state.event.name}
              </p>
              <p className="subtitle">
                {`${this.state.event.schedules[0].place.address} , ${this.state.event.schedules[0].place.postal_code}`}
              </p>
              <p className="has-text-grey-darker">
                {this.state.event.descriptions[0].description}
              </p>
              <br/>
              <MapGL
                {...this.state.viewport}
                mapStyle="mapbox://styles/mapbox/light-v10"
                onViewportChange={this._updateViewport}
                mapboxApiAccessToken={Token}
              >
                <Marker  
                  longitude={this.state.event.schedules[0].place.lng} 
                  latitude={this.state.event.schedules[0].place.lat}
                >
                  <img 
                    src='https://www.seekclipart.com/clipng/big/8-89932_red-location-pin-png-clip-stock-location-logo.png' 
                    height="30" 
                    width="30" 
                    onClick={() => this.setState({ info: this.state.event })} 
                  />
                </Marker>

                {this._renderPopup()}

              </MapGL> 
            </div>
          </div>
        </div>
      </div>
    </div>  
  }

}

export default SingleEvent
