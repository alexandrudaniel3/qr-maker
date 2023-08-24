import './styles/EmailQR.css';
import QRCode from "react-qr-code";
import React, {useRef, useState} from "react";
import {exportQR} from "../utils";
import {colorPicker} from "../utils";

export default function EmailQR({bgColor, fgColor, selected, setBgColor, setFgColor, setSelected}) {
    const [title, setTitle] = useState('');
    const [address, setAddress] = useState('');
    const [subject, setSubject] = useState('');
    const qrRefWithValue = useRef(null);
    const qrRefWithoutValue = useRef(null);

    // document.body.style.transition = 'transition: background 5s ease';
    document.body.style.background = 'linear-gradient(135deg, #FF6666, #BE5A5A)';

    const showFormatWarning = () => {
        if (address.length > 5 && !address.includes('@')) {
            return (
                <div className='format-warning'>
                    <p><span>Warning: </span>The email address entered may not be valid.</p>
                </div>
            )
        }
    }

    const setColors = (bgColor, fgColor, id) => {
        setBgColor(bgColor);
        setFgColor(fgColor);
        setSelected(id);
    }

    const generateEmailQR = () => {

        const code = subject ? `mailto:${address}?subject=${encodeURIComponent(subject)}` : `mailto:${address}`;
        return (
            <div className='email-qr-code-container'>
                <p>Your code:</p>

                <div className='email-qr-code' ref={qrRefWithValue}>
                    <div className='email-qr-code-wrapper' ref={qrRefWithoutValue}>
                        <QRCode value={code}
                                bgColor={bgColor}
                                fgColor={fgColor}/>
                    </div>
                    <h3 className='email-qr-code-text'>{title}</h3>
                </div>

                <div className='email-qr-download-buttons'>
                    <button onClick={() => {
                        exportQR(qrRefWithoutValue)
                    }}>Download Code
                    </button>
                    {title ? <button
                        onClick={() => {
                            exportQR(qrRefWithValue)
                        }}>Download Code With Title
                    </button> : null}

                </div>
            </div>
        )
    }


    return (
        <div className='email-mode'>
            <div className='main-left'>
                <p>Enter your email address:</p>
                <div className='text-bar'>
                    <input
                        type='text'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                {showFormatWarning()}
                <p>Enter a subject (optional):</p>
                <div className='text-bar'>
                    <input
                        type='text'
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                    />
                </div>
                <p>Enter a title for your QR code (optional):</p>
                <div className='text-bar'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {colorPicker(setColors, selected)}
            </div>
            <div className='main-right'>
                {generateEmailQR()}
            </div>
        </div>
    )
}