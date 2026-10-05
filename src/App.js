import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import Home from './pages/Home';
import EditorPage from './pages/EditorPage';

function App() {
    return (
        <>
            <Toaster />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor/:roomId" element={<EditorPage />} />
            </Routes>
        </>
    );
}

export default App;