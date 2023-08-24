import './App.css';
import React from "react";
import TextQR from "./pages/TextQR";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import WifiQR from "./pages/WifiQR";
import LinkQR from "./pages/LinkQR";
import EmailQR from "./pages/EmailQR";

function App() {
    const location = useLocation();
    const navigation = useNavigate();

    const isTextQRSelected = location.pathname === '/';
    const isLinkQRSelected = location.pathname ==='/link';
    const isWifiQRSelected = location.pathname === '/wifi';
    const isEmailQRSelected = location.pathname === '/email';

    return (
        <div className='app'>
            <h1>QR Code Generator</h1>
            <div className='nav-bar'>
                <button
                    className={`nav-button ${isTextQRSelected ? 'selected' : ''}`}
                    onClick={() => navigation('/')}
                >
                    Text
                </button>
                <button
                    className={`nav-button ${isLinkQRSelected ? 'selected' : ''}`}
                    onClick={() => navigation('/link')}
                >
                    Link
                </button>
                <button
                    className={`nav-button ${isWifiQRSelected ? 'selected' : ''}`}
                    onClick={() => navigation('/wifi')}
                >
                    Wi-Fi
                </button>
                <button
                    className={`nav-button ${isEmailQRSelected ? 'selected' : ''}`}
                    onClick={() => navigation('/email')}
                >
                    Email
                </button>
            </div>
            <div className='main'>
                <Routes>
                    <Route path='/' element={<TextQR />} />
                    <Route path='/link' element={<LinkQR />} />
                    <Route path='/wifi' element={<WifiQR />} />
                    <Route path='/email' element={<EmailQR />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
