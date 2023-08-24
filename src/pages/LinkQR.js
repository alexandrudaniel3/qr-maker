import './styles/LinkQR.css';
import QRCode from "react-qr-code";
import React, {useRef, useState} from "react";
import {exportQR} from "../utils";
import {colorPicker} from "../utils";

export default function LinkQR({bgColor, fgColor, selected, setBgColor, setFgColor, setSelected}) {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const [protocol, setProtocol] = useState('https://');
    const qrRefWithValue = useRef(null);
    const qrRefWithoutValue = useRef(null);

    document.body.style.background = 'linear-gradient(135deg, #FFFF66, #FFBE5A)';

    const setColors = (bgColor, fgColor, id) => {
        setBgColor(bgColor);
        setFgColor(fgColor);
        setSelected(id);
    }

    const showFormatWarning = () => {
        if (link.includes('http://') || link.includes('https://')) {
            return (
                <div className='format-warning'>
                    <p><span>Warning: </span>Your link should not include the protocol.</p>
                </div>
            )
        }
    }

    const protocolSelector = () => {
        return (
            <div className='enc-selector'>
                <button
                    onClick={() => setProtocol('https://')}
                    className={protocol === 'https://' ? 'selected' : null}
                >HTTPS
                </button>
                <button
                    onClick={() => setProtocol('http://')}
                    className={protocol === 'http://' ? 'selected' : null}
                >HTTP
                </button>
            </div>
        )
    }

    const generateLinkQR = () => {
        let entry = link;
        if (!entry) {
            entry = 'Hello!';
        }
        return (
            <div className='link-qr-code-container'>
                <p>Your code:</p>

                <div className='link-qr-code' ref={qrRefWithValue}>
                    <div className='link-qr-code-wrapper' ref={qrRefWithoutValue}>
                        <QRCode value={protocol + entry}
                                bgColor={bgColor}
                                fgColor={fgColor}/>
                    </div>
                    <h3 className='link-qr-code-text'>{title}</h3>
                </div>

                <div className='link-qr-download-buttons'>
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
        <div className='link-mode'>
            <div className='main-left'>
                <p>Enter your website:</p>
                <div className='text-bar'>
                    <input
                        type='text'
                        placeholder='www.example.com'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
                {showFormatWarning()}
                <p>Enter a title (optional):</p>
                <div className='text-bar'>
                    <input
                        type='text'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                {protocolSelector()}
                {colorPicker(setColors, selected)}
            </div>
            <div className='main-right'>
                {generateLinkQR()}
            </div>
        </div>
    )
}