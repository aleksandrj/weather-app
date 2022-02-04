import './App.css';
import Header from './components/Header/Header';
import SearchForm from './components/SearchForm/SearchForm';
import SearchResults from './components/SearchForm/SearchResults';
import Wrapper from './components/Wrapper/Wrapper';

const App = () => {
  const onSubmit = (value) => {};

  return (
    <div className="App">
      <Header />
      <Wrapper>
        <SearchForm onSubmit={onSubmit} />
        <SearchResults />
      </Wrapper>
    </div>
  );
};

export default App;
