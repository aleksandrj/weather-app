import styles from './SearchForm.module.css';

const SearchForm = () => {
  const onSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div className={`${styles.search} mt-5`}>
        <input
          aria-label="location"
          type="text"
          className={`${styles.input} form-control`}
          placeholder="Search for location..."
          required
          onChange={(e) => e}
        />

        <button
          className="btn btn-primary"
          type="submit"
          onClick={onSubmitHandler}
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchForm;
