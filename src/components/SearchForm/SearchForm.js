import { useState } from 'react';
import styles from './SearchForm.module.css';

const SearchForm = (props) => {
  const [location, setLocation] = useState('');

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (!location || location === '') return;

    props.submitSearch(location);
    setLocation('');
  };

  return (
    <form className={`${styles.form}`} onSubmit={onSubmitHandler}>
      <div className={`${styles.search} mt-3`}>
        <input
          aria-label="location"
          type="text"
          className={`${styles.input} form-control`}
          placeholder="Search for location..."
          required
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button className="mb-3" type="submit" onClick={onSubmitHandler}>
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
