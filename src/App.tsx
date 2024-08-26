import { useEffect, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import './App.css';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';

interface Position {
  x: number;
  y: number;
}

function App() {
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [minimized, setMinimized] = useState<boolean>(false);

  useEffect(() => {
    const savedPosition = localStorage.getItem('dragPosition');
    if (savedPosition) {
      setPosition(JSON.parse(savedPosition));
    }
  }, []);

  const handleStop = (e: DraggableEvent, data: DraggableData) => {
    const newPosition: Position = { x: data.x, y: data.y };
    setPosition(newPosition);
    localStorage.setItem('dragPosition', JSON.stringify(newPosition));
  };

  const handleMinimize = () => {
    setMinimized(true);
  };

  const handleMaximize = () => {
    setMinimized(false);
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setPosition({ x: 0, y: 0 })}>
          Reset Position
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <Draggable
        position={position}
        onStop={handleStop}
      >
        <div className={`draggable-balloon ${minimized ? 'minimized' : ''}`}>
          <div className="handle">
            <button className="minimize-btn" onClick={minimized ? handleMaximize : handleMinimize}>
              {minimized ? '+' : '-'}
            </button>
          </div>
          <div className="content">
            {minimized ? 'Em ligação' : 'Drag me around! This is a balloon.'}
          </div>
        </div>
      </Draggable>
    </>
  );
}

export default App;
