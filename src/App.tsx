import './App.css';
import Background from './components/Background';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <div>
      <Background 
        color={{
          hover: "#ff0000",
          idle: "#fff",
          active: "#ff0000",
          outline: "rgba(0, 0, 0, 0)",
          hoverOutline: "rgba(0, 0, 0, 0)"
        }}
      />
      <Outlet />
    </div>
  );
}

export default App;
