import React from 'react';
import '../feed.css'
const Feedbasic = () => {
  // Assuming you have a list of posts or content for the feed
  const posts = [
    {
      id: 1,
      title: 'Post 1',
      content: 'This is the content of Post 1.',
    },
    {
      id: 2,
      title: 'Post 2',
      content: 'This is the content of Post 2.',
    },
    // Add more posts as needed
  ];

  return (

    <div className="centered-container">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h2>{post.title}</h2>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default Feedbasic;
