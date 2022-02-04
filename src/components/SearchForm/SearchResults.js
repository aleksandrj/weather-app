import styles from './SearchResults.module.css';

const SearchResults = (props) => {
  return (
    <div className={`${styles['results-list']} list-group mt-5`}>
      {props.locations.map((location) => (
        <button
          type="button"
          className="list-group-item list-group-item-action"
          key={location.id}
        >
          {location.city}, {location.country}
        </button>
      ))}
    </div>
  );
};

export default SearchResults;
