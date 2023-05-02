import FeaturedPosts from '@/components/home-page/featured-posts'
import Hero from '@/components/home-page/hero'
import React, { Fragment } from 'react';
import { getFeaturedPosts } from '../../lib/posts-util';

const HomePage = ({ posts }) => {
  return (
    <Fragment>
        <Hero />
        <FeaturedPosts posts={posts} />
    </Fragment>
  )
};

export const getStaticProps = async () => {
    const featuredPosts = getFeaturedPosts();
    return {
        props: { posts: featuredPosts },
    }
}

export default HomePage;