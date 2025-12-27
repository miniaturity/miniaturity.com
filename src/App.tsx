import './App.css';
import { Outlet } from 'react-router-dom';
import Background from './components/Background';

function App() {
  return (
    <div>
      <Background 
        color={{
          hover: "#ff0000",
          idle: "#ffeded",
          active: "#ff0000",
          outline: "rgba(255, 159, 159, 0.2)",
          hoverOutline: "rgba(255, 0, 0, 1)"
        }}
        hoverScale={1.05}
        hoverField={0}
        squareSize={30}
      />
      <Outlet />
    </div>
  );
}

export default App;
