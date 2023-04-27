import { useRouter } from 'next/router'
import React, { Fragment } from 'react';
import EventList from '@/components/events/event-list';
import ResultsTitle from '@/components/events/results-title';
import Button from '@/components/ui/button';
import ErrorAlert from '@/components/ui/error-alert';
import { getFilteredEvents } from '@/helpers/api-util';

const FilteredEventsPage = ({ hasError, events, date }) => {

    const { query } = useRouter();

    // const filterData = query.slug;

    // if (!filterData) {
    //     return <p className='center'>Loading...</p>
    // }

    // const filteredYear = filterData[0];
    // const filteredMonth = filterData[1];

    // const numYear = +filteredYear;
    // const numMonth = +filteredMonth;

    if (hasError) {
        return <Fragment>
            <ErrorAlert><p>Invalid date filter. Please adjust your values</p></ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>
    };

    const filteredEvents = events

    if (!filteredEvents || filteredEvents.length === 0) {
        return <Fragment>
            <ErrorAlert><p>No events found for the chosen filter</p></ErrorAlert>
            <div className='center'>
                <Button link='/events'>Show All Events</Button>
            </div>
        </Fragment>
    }

    const date = new Date(date.year, date.month - 1);

  return (
    <Fragment>
        <ResultsTitle date={date} />
        <EventList items={filteredEvents} />
    </Fragment>
  )
}

export async function getServerSideProps (context) {
    const { params } = context;
    const filterData = params.slug;
    const filteredYear = filterData[0];
    const filteredMonth = filterData[1];

    const numYear = +filteredYear;
    const numMonth = +filteredMonth;

    if (isNaN(numYear) || isNaN(numMonth) || numYear > 2030 || numYear < 2021 || numMonth < 1 || numMonth > 12) {
        return { props: { hasError: true } }
    };

    const filteredEvents = await getFilteredEvents({ year: numYear, month: numMonth });

    return { props: { events: filteredEvents, date: { year: numYear, month: numMonth } } }
}

export default FilteredEventsPage