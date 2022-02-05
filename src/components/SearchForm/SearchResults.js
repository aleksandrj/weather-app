import styles from './SearchResults.module.css';

const SearchResults = (props) => {
  const onClickHandler = (event) => {
    props.onSelectedLocation(
      event.target.id,
      event.target.dataset.city,
      event.target.dataset.country
    );
  };

  return (
    <div className={`${styles['results-list']} rounded-0 list-group mb-3`}>
      {props.locations.map((location) => (
        <button
          type="button"
          className={`${styles['list-item']} list-group-item list-group-item-action`}
          key={location.id}
          id={location.id}
          data-city={location.city}
          data-country={location.country}
          onClick={onClickHandler}
        >
          {location.city}, {location.country}
        </button>
      ))}
    </div>
  );
};

export default SearchResults;
