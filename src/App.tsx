import { Route, Routes } from 'react-router';
import './App.css';
import Main from './routes/Main';
import Background from './components/Background';

function App() {
  return (
    <div>
      
      <Routes>
        <Route index element={<Main />}/>
      </Routes>


    </div>
  );
}

export default App;
