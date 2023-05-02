import { useContext, useRef } from 'react';
import classes from './newsletter-registration.module.css';
import NotificationContext from '@/store/notification-context';

function NewsletterRegistration() {
  const emailInputRef = useRef();
  const { showNotificationHandler } = useContext(NotificationContext);

  function registrationHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;

    showNotificationHandler({ title: 'Signing Up', message: 'Registering for newsletter', status: 'pending' })

    fetch('/api/newsletter', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: enteredEmail })
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong')
      });
    }).then(data => {
      console.log(data);
      showNotificationHandler({ title: 'Success', message: 'Successfully registered for newsletter!', status: 'success' })
    }).catch(err => {
      console.log(err);
      showNotificationHandler({ title: 'Error', message: err.message || 'Something went wrong', status: 'error' })
    });
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={emailInputRef}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
