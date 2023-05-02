import PostContent from '@/components/posts/post-detail/post-content';
import React from 'react'
import { getPostData, getPostFiles } from '../../../lib/posts-util';

const PostDetailPage = ({ post }) => {
  return (
    <PostContent post={post} />
  )
};

export const getStaticProps = async (context) => {
    const { params } = context;
    const { slug } = params;
    const postData = getPostData(slug);
    return {
        props: { post: postData },
        revalidate: 600
    }
}

export const getStaticPaths = async (context) => {
    const postFilenames = getPostFiles();
    const slugs = postFilenames.map(fileName => fileName.replace(/\.md$/, ''));
    return {
        paths: slugs.map(slug => ({ params: { slug } })),
        fallback: false,
    }
}

export default PostDetailPage;