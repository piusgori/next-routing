import React, { Fragment } from 'react'
import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { useRouter } from 'next/router';
import { getAllEvents } from '@/helpers/api-util';

const AllEventsPage = ({ events }) => {
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

export async function getStaticProps () {
  const events = await getAllEvents();
  return { props: { events }, revalidate: 60 }
}

export default AllEventsPage;