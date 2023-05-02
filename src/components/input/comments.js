import { useContext, useEffect, useState } from 'react';

import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import NotificationContext from '@/store/notification-context';

function Comments(props) {
  const { eventId } = props;

  const { showNotificationHandler } = useContext(NotificationContext);

  const [showComments, setShowComments] = useState(false);
  const [comments, steComments] = useState([]);

  useEffect(() => {
    if (showComments) {
      fetch(`/api/comments/${eventId}`).then(response => response.json()).then(data => {
        steComments(data.comments);
      }).catch(err => {
        console.log(err);
      })
    }
  }, [showComments])

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData) {
    showNotificationHandler({ title: 'Sending Comment', message: 'Your Comment Is Currently being Stored Into A Database', status: 'pending' })
    fetch(`/api/comments/${eventId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData)
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong')
      });
    }).then(data => {
      showNotificationHandler({ title: 'Success', message: 'Your Comment Was Saved!', status: 'success' })
    }).catch(err => {
      console.log(err);
      showNotificationHandler({ title: 'Error', message: err.message || 'Something went wrong', status: 'error' })
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;
