import React from 'react'
import axios from 'axios'
import EventCard from './EventCard'

var config = {
  headers: { 'Authorization': 'Bearer ' + process.env.API_KEY }
}

class Events extends React.Component {

  constructor() {
    super()
    this.state = {
      allEvents: [],
      tags: 'music',
      pages: 1
      // tabs: []
    }
  }

  componentDidMount() {
    this.loadData()
  }

  handleClick(e) {
    console.log(e.target.innerHTML)
    this.setState({
      tags: e.target.innerHTML
    }, () => {
      this.loadData()
    })

  }

  loadData() {
    axios.get(`https://api.list.co.uk/v1/events?tags=${this.state.tags}&location=london&page=${this.state.pages}`, config)
      .then(resp => this.setState({ allEvents: resp.data }))
  }

  page1(e) {
    this.setState({
      pages: e.target.innerHTML
    }, () => {
      this.loadData()
    })
  }

  page2(e) {
    this.setState({
      pages: e.target.innerHTML
    }, () => {
      this.loadData()
    })
  }

  // openTab(e) {

  // }

  // onClick={openTab(e)}

  render() {
    if (!this.state.allEvents) {
      return <h2>Loading...</h2>
    }
    return (
      <div>
        <section className="hero is-large">
          <div className="hero-body">
            <div className="container">
              <p className="title has-text-centered">events</p>
              <p className="subtitle has-text-centered">find your next culture trip...</p>
            </div>
          </div>
        </section>

        <div className="tabs is-centered is-boxed is-mobile is-multiline">
          <ul>
            <li>
              <a className="active">
                <span onClick={(e) => this.handleClick(e)}>contemporary</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={(e) => this.handleClick(e)}>exhibitions</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={(e) => this.handleClick(e)}>music</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={(e) => this.handleClick(e)}>visual art</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={(e) => this.handleClick(e)}>mixed media</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={(e) => this.handleClick(e)}>installation</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={(e) => this.handleClick(e)}>photography</span>
              </a>
            </li>
            <li>
              <a>
                <span onClick={(e) => this.handleClick(e)}>prints</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="columns is-mobile is-multiline is-centered">
          <div className="section">
            <div className="container">
              <div className="columns is-mobile is-multiline is-centered">
                {this.state.allEvents.map((event, i) => {
                  return <EventCard key={i} event={event}/>
                })}
              </div>
            </div>
          </div>
        </div>

        <div className= "has-text-centered">
          <div className="button is-white has-text-centered" onClick={(e) => this.page1(e)}>1</div>
          <div className="button is-white has-text-centered" onClick={(e) => this.page2(e)}>2</div>
        </div>

      </div>
    )
  }

}

export default Events