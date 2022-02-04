import './App.css';
import Error from './components/Error/Error';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';
import SearchResults from './components/SearchForm/SearchResults';
import Spinner from './components/Spinner/Spinner';
import Wrapper from './components/Wrapper/Wrapper';
import useWeather from './hooks/useWeather';

const App = () => {
  const { isError, isLoading, locations, forecast, getLocations, getForecast } =
    useWeather();

  const onSubmit = (value) => {
    getLocations(value);
  };

  const onClickHandler = (id) => {
    getForecast(id);
  };

  return (
    <div className="App">
      <Header />
      <Wrapper>
        {!forecast && <SearchForm submitSearch={onSubmit} />}
        {!forecast && locations && (
          <SearchResults
            locations={locations}
            onSelectedLocation={onClickHandler}
          />
        )}
        {isError && <Error message={isError} />}
        {isLoading && <Spinner />}
      </Wrapper>
    </div>
  );
};

export default App;
