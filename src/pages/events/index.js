import React, { Fragment } from 'react'
import { getAllEvents } from '../../../dummy-data'
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { useRouter } from 'next/router';

const AllEventsPage = () => {

    const events = getAllEvents();
    const { push } = useRouter();

    function findEventsHandler (year, month) {
        push(`/events/${year}/${month}`);
    }

  return (
    <Fragment>
        <EventsSearch onSearch={findEventsHandler} />
        <EventList items={events} />
    </Fragment>
  )
}

export default AllEventsPage;