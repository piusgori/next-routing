import React, { useRef, useState } from 'react';

const HomePage = () => {

  const [feedbackItems, setFeedbackItems] = useState([]);

  const emailInputRef = useRef();
  const feedbackInputRef = useRef();

  const submitFormHandler = (e) => {
    e.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const enteredFeedback = feedbackInputRef.current.value;
    fetch('/api/feedback', { 
      method: 'POST', 
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: enteredEmail, text: enteredFeedback })
    }).then(response => {
      return response.json();
    }).then(resData => {
      console.log(resData)
    }).catch(err => {
      console.log(err);
    });
  };

  const loadFeedbackHandler = () => {
    fetch('/api/feedback').then(response => {
      return response.json();
    }).then(resData => {
      setFeedbackItems(resData.feedback)
    }).catch(err => {
      console.log(err);
    });
  }


  return (
    <div>
      <h1>The Home Page</h1>
      <form onSubmit={submitFormHandler}>
        <div>
          <label htmlFor='email'>Your Email Address</label>
          <input ref={emailInputRef} type='email' id='email' />
        </div>
        <div>
          <label htmlFor='feedback'>Your Feedback</label>
          <textarea ref={feedbackInputRef} rows='5' id='feedtback' />
        </div>
        <button type='submit'>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load feedback</button>
      <ul>
        {feedbackItems.map(item => <li key={item.id}>{item.text}</li>)}
      </ul>
    </div>
  )
}

export default HomePage;