import AllPosts from '@/components/posts/all-posts';
import React from 'react';
import { getAllPosts } from '../../../lib/posts-util';

const AllPostsPage = ({ posts }) => {
  return (
    <AllPosts posts={posts} />
  )
}

export const getStaticProps = async () => {
    const allPosts = getAllPosts();
    return {
        props: { posts: allPosts }
    }
}

export default AllPostsPage;
