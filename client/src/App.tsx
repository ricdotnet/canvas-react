import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Canvas } from './Components/Canvas/Canvas';
import { Room } from './Components/Room/Room';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Canvas />} />
        <Route path="/room/:roomId" element={<Room />} />
        {/*<Route path="/:roomId" element={<Room />} />*/}
        {/* <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/list" element={<Lists />} />
        <Route path="/list/:id" element={<Items />} />
        <Route path="/list/s/:id" element={<Items isShared="true" />} />

        <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Router>
    // <>
    //   <Canvas />

    // </>
  );
}
