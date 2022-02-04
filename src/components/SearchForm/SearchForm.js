import { useState } from 'react';
import Error from '../Error/Error';
import styles from './SearchForm.module.css';

const SearchForm = (props) => {
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    setError('');

    if (!location || location === '') return;

    // Can be separated for unique messages (return concatenated string)
    if (location.length > 30 || /\d/.test(location)) {
      setError('Input must contain only letters and be <= 30 characters long.');
      return;
    }

    props.submitSearch(location);
    setLocation('');
  };

  return (
    <form className={`${styles.form}`} onSubmit={onSubmitHandler}>
      <div className={`${styles.search}`}>
        <input
          aria-label="location"
          type="text"
          className={`${styles.input} form-control`}
          placeholder="Search for location..."
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          className="btn btn-primary"
          type="submit"
          onClick={onSubmitHandler}
        >
          Search
        </button>
      </div>
      {error && <Error message={error} />}
    </form>
  );
};

export default SearchForm;
