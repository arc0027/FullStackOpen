import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  // Mock function
  const createBlog = jest.fn();

  // Render component
  const { container, getByLabelText } = render(<BlogForm createBlog={createBlog} />);

  // Get input element and form element
  const input = getByLabelText('Title');
  const form = container.querySelector('form');

  // Simulate user input and form submission
  fireEvent.change(input, { target: { value: 'Go To Statement Considered Harmful' } });
  fireEvent.submit(form);

  // Assertions
  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith({ title: 'Go To Statement Considered Harmful' });
});
