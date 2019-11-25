import React from 'react'
import { Link } from 'react-router-dom'

const EventCard = ({ event }) => (
  <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
    <div className="card">
      <div className="card-image">
        {/* <div>
          <img src={event.images.url} alt="Placeholder image"/>
        </div> */}
      </div>
      <div className="card-content">
        <Link className="subtitle" to={`/events/${event.event_id}`}>{event.name}</Link>
        <br/>
        <br/>
        <p className="has-text-grey-darker"><span>{'entry: '}</span>{event.schedules[0].ticket_summary ? `${event.schedules[0].ticket_summary}` : 'free'}</p>
      </div>
    </div>
  </div>
)

export default EventCard