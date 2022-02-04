import './App.css';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';
import SearchResults from './components/SearchForm/SearchResults';
import Wrapper from './components/Wrapper/Wrapper';
import useWeather from './hooks/useWeather';

const App = () => {
  const { isError, isLoading, locations, getLocations } = useWeather();
  const onSubmit = (value) => {
    getLocations(value);
  };

  return (
    <div className="App">
      <Header />
      <Wrapper>
        <SearchForm submitSearch={onSubmit} />
        {locations && <SearchResults locations={locations} />}
      </Wrapper>
    </div>
  );
};

export default App;
