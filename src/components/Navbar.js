import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class Navbar extends React.Component {

  constructor() {
    super()
    this.state = {
      isOpen: false
    }
  }

  toggleNavbar() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.setState({ isOpen: false })
    }
  }

  render() {
    return <div className="navbar is-fixed-top">
      <div className="container">
        <div className="navbar-brand">
          <Link className="navbar-item" to="/">a + l</Link>
          <a
            role="button"
            className={`navbar-burger burger ${this.state.isOpen ? 'is-active' : ''}`}
            onClick={() => this.toggleNavbar()}
            aria-label="menu"
            aria-expanded="false"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        {/* Adding the appropriate bulma classes conditionally, to
        open and close the navbar */}
        <div className={`navbar-menu ${this.state.isOpen ? 'is-active' : ''}`}>
          <div className="navbar-end">
            <div className="navbar-item">
              <Link className="navbar-item" to="/events">Events</Link>
            </div>
            <div className="navbar-item">
              <Link className="navbar-item" to="/about">About</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

}

export default withRouter(Navbar)