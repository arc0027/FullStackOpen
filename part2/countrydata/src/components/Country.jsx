const Country = ({ country }) => {
  console.log(country);

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <h2>Spoken languages</h2>

      <ul>
        {Object.entries(country.languages).map(([code, language]) => (
          <li key={code}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt="Country flag" />
    </div>
  );
};

export default Country;
