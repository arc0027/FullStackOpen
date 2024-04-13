import Person from './Person'

const Content = ({persons, allPersons, deletePerson}) => {
  if (persons.length === 0) {
    return (
      <ul>
        {Array.isArray(allPersons) && allPersons.map((person, i) =>
          <Person key={i} person={person} deletePerson={deletePerson} />
        )}
      </ul>
    )
  } else {
    return (
      <ul>
        {persons.map((person, i) =>
          <Person key={i} person={person} deletePerson={deletePerson} />
        )}
      </ul>
    )
  }
}

export default Content