import styles from './SearchResults.module.css';

const SearchResults = () => {
  return (
    <div className={`${styles['results-list']} list-group mt-5 mb-5`}>
      <a href="#" className="list-group-item list-group-item-action">
        Result1
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Result2
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Result3
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Result4
      </a>
      <a href="#" className="list-group-item list-group-item-action">
        Result5
      </a>
    </div>
  );
};

export default SearchResults;
