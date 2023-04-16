import { useRouter } from 'next/router';
import React from 'react';

const BlogPostsPage = () => {

    const { query } = useRouter();
    console.log(query);

  return (
    <div>BlogPostsPage</div>
  )
}

export default BlogPostsPage;