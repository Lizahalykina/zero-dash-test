
import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import { FiltersProvider } from './FiltersContext';

function App() {
  return (
    <div className="App">
    <FiltersProvider>
      <Dashboard/>
    </FiltersProvider>
    </div>
  );
}

export default App;
