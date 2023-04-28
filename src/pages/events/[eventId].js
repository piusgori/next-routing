import React, { Fragment } from 'react';
import EventSummary from '@/components/event-detail/event-summary';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventContent from '@/components/event-detail/event-content';
import ErrorAlert from '@/components/ui/error-alert';
import { getEventById, getFeaturedEvents } from '@/helpers/api-util';
import Head from 'next/head';

const EventDetailsPage = ({ event }) => {

    if (!event) {
        return <ErrorAlert><p>No Event Found!</p></ErrorAlert>
    }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name='description' content={event.description} />
      </Head>
        <EventSummary title={event.title} />
        <EventLogistics date={event.date} address={event.location} image={event.image} imageAlt={event.title} />
        <EventContent>
            <p>{event.description}</p>
        </EventContent>
    </Fragment>
  )
}

export async function getStaticProps (context) {
  const eventId = context.params.eventId;
  const theEvent = await getEventById(eventId);
  return { props: { event: theEvent }, revalidate: 30 }
}

export async function getStaticPaths () {
  const events = await getFeaturedEvents();
  const paths = events.map(event => ({ params: { eventId: event.id } }))

  return { paths, fallback: 'blocking' }
}

export default EventDetailsPage;