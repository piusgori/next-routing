import React, { Fragment, useState } from 'react'
import { buildFeedbackPath, extractFeedback } from '../api/feedback';

const FeedbackPage = ({ feedbackItems }) => {
    const [feedbackData, setFeedbackData] = useState();

    const loadFeedbackHandler = (id) => {
        fetch(`/api/${id}`).then(response => response.json()).then(data => {
            setFeedbackData(data.feedback)
        }).catch(err => { console.log(err) });
    }

  return (
    <Fragment>
        {feedbackData && <p>{feedbackData.email}</p>}
        <ul>
            {feedbackItems.map(item => <li key={item.id}>{item.text} <button onClick={loadFeedbackHandler.bind(null, item.id)}>Show Details</button></li>)}
        </ul>
    </Fragment>
  )
}

export async function getStaticProps () {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    return { props: { feedbackItems: data } }
}

export default FeedbackPage;