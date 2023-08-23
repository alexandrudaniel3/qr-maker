import './App.css';
import React from "react";
import TextQR from "./pages/TextQR";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import WifiQR from "./pages/WifiQR";

function App() {
    const location = useLocation();
    const navigation = useNavigate();

    const isTextQRSelected = location.pathname === '/';
    const isWifiQRSelected = location.pathname === '/wifi';
    return (
        <div className='app'>
            <h1>QR Code Generator</h1>
            <div className='nav-bar'>
                <button
                    className={`nav-button ${isTextQRSelected ? 'selected' : ''}`}
                    onClick={() => navigation('/')}
                >
                    Text/Links
                </button>
                <button
                    className={`nav-button ${isWifiQRSelected ? 'selected' : ''}`}
                    onClick={() => navigation('/wifi')}
                >
                    Wifi
                </button>
            </div>
            <div className='main'>
                <Routes>
                    <Route path='/' element={<TextQR />} />
                    <Route path='/wifi' element={<WifiQR />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
