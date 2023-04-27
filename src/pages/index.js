import React from 'react'
import { getFeaturedEvents } from '../helpers/api-util'
import EventList from '@/components/events/event-list';

const HomePage = ({ events }) => {

  return (
    <div>
        <EventList items={events} />
    </div>
  )
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents();
  return { props: { events: featuredEvents } };
}

export default HomePage;