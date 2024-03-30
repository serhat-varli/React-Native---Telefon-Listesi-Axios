import {SafeAreaView} from 'react-native';
import {MainContext} from './context/MainContext';
import Search from './components/Header/Search';
import Home from './components/Home/Home';
import generalState from './state/GeneralState';

function App(): React.JSX.Element {
  return (
    <MainContext.Provider value={generalState()}>
      <SafeAreaView>
        <Search />
        <Home />
      </SafeAreaView>
    </MainContext.Provider>
  );
}
export default App;
