import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, updateBlog, deleteBlog }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const increaseLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1
    };
    updateBlog(updatedBlog);
  };

  const removeBlog = () => {
    deleteBlog(blog);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div style={blogStyle} className='blog'>
      <div>
        <p>
          {blog.title} - {blog.author}{' '}
          <button onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
        </p>
      </div>
      {visible && (
        <div>
          <p>{blog.url}</p>
          <p>
            {blog.likes} <button id='like-button' onClick={increaseLikes}>like</button>
          </p>
          <button id='remove' onClick={removeBlog}>remove</button>
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired
};

export default Blog;