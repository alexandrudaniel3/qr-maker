import './App.css';
import React, {useState} from "react";
import TextQR from "./pages/TextQR";
import {Route, Routes, useLocation, useNavigate} from "react-router-dom";
import WifiQR from "./pages/WifiQR";
import LinkQR from "./pages/LinkQR";
import EmailQR from "./pages/EmailQR";

function App() {
    const location = useLocation();
    const navigation = useNavigate();

    const isTextQRSelected = location.pathname === '/';
    const isLinkQRSelected = location.pathname === '/link';
    const isWifiQRSelected = location.pathname === '/wifi';
    const isEmailQRSelected = location.pathname === '/email';

    const [bgColor, setBgColor] = useState('white');
    const [fgColor, setFgColor] = useState('black');
    const [selected, setSelected] = useState(0);


    return (
        <div className='app'>
            <h1>QR Code Generator</h1>
            <div className='nav-bar'>
                <button
                    className={`nav-button ${isTextQRSelected ? 'nav-selected' : ''}`}
                    onClick={() => navigation('/')}
                >
                    Text
                </button>
                <button
                    className={`nav-button ${isLinkQRSelected ? 'nav-selected' : ''}`}
                    onClick={() => navigation('/link')}
                >
                    Link
                </button>
                <button
                    className={`nav-button ${isWifiQRSelected ? 'nav-selected' : ''}`}
                    onClick={() => navigation('/wifi')}
                >
                    Wi-Fi
                </button>
                <button
                    className={`nav-button ${isEmailQRSelected ? 'nav-selected' : ''}`}
                    onClick={() => navigation('/email')}
                >
                    Email
                </button>
            </div>
            <div className='main'>
                <Routes>
                    <Route path='/' element={<TextQR {...{bgColor, fgColor, selected, setBgColor, setFgColor, setSelected}}/>}/>
                    <Route path='/link' element={<LinkQR {...{bgColor, fgColor, selected, setBgColor, setFgColor, setSelected}}/>}/>
                    <Route path='/wifi' element={<WifiQR {...{bgColor, fgColor, selected, setBgColor, setFgColor, setSelected}}/>}/>
                    <Route path='/email' element={<EmailQR {...{bgColor, fgColor, selected, setBgColor, setFgColor, setSelected}}/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
