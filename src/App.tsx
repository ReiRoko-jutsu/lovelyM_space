
import './App.css'
// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Birthday from './pages/Birthday';
import ValentineArchive from './pages/ValentineArchive';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/birthday" element={<Birthday />} />
          <Route path="/valentine" element={<ValentineArchive />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;