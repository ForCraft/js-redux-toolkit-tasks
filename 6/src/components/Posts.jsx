import React from 'react';
import { useSelector } from 'react-redux';

import Post from './Post.jsx';

const Posts = () => {
  // BEGIN (write your solution here)
  const posts = useSelector((state) => state.posts.ids.map((id) => state.posts.entities[id]));

  return (
    <div>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );

  // END
};

export default Posts;
