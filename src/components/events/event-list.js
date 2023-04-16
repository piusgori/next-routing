import React from 'react'
import EventItem from './event-item';
import classes from './event-list.module.css';

const EventList = ({ items }) => {
  return (
    <ul className={classes.list}>
      {items.map(event => <EventItem id={event.id} date={event.date} image={event.image} location={event.location} title={event.title} key={event.id} />)}
    </ul>
  )
}

export default EventList;