import { useState, useEffect } from 'react';
import axios from 'axios';

// Custom hook for form fields
const useField = (type) => {
  const [value, setValue] = useState('');

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

// Custom hook for API resource
const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };

    fetchData();
  }, [baseUrl]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources([...resources, response.data]);
  };

  const service = {
    create,
  };

  return [resources, service];
};

const App = () => {
  // Form fields
  const contentField = useField('text');
  const nameField = useField('text');
  const numberField = useField('text');

  // API resources
  const [notes, noteService] = useResource('http://localhost:3005/notes');
  const [persons, personService] = useResource('http://localhost:3005/persons');

  // Event handlers
  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: contentField.value });
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    personService.create({ name: nameField.value, number: numberField.value });
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...contentField} />
        <button>create</button>
      </form>
      {notes.map((note) => (
        <p key={note.id}>{note.content}</p>
      ))}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...nameField} /> <br />
        number <input {...numberField} />
        <button>create</button>
      </form>
      {persons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;