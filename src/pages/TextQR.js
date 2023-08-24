import './styles/TextQR.css';
import QRCode from "react-qr-code";
import React, {useRef, useState} from "react";
import {exportQR} from "../utils";
import {colorPicker} from "../utils";
import {useNavigate} from "react-router-dom";

export default function TextQR({bgColor, fgColor, selected, setBgColor, setFgColor, setSelected}) {
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const qrRefWithValue = useRef(null);
    const qrRefWithoutValue = useRef(null);

    // document.body.style.transition = 'transition: background 5s ease';
    document.body.style.background = 'linear-gradient(135deg, #B2FF66, #5ABE76)';

    const navigation = useNavigate();

    const showFormatWarning = () => {
        if (text.includes('http://') || text.includes('https://') || text.includes('www.')){
            return (
                <div className='format-warning'>
                    <p><span>Important: </span>For links use the dedicated <u onClick={() => navigation('/link')}>Link QR Generator</u>.</p>
                </div>
            )
        } else if (text.includes('.')) {
            return (
                <div className='format-warning'>
                    <p><span>Hint: </span>For links use the dedicated <u onClick={() => navigation('/link')}>Link QR Generator</u>.</p>
                </div>
            )
        }
    }

    const setColors = (bgColor, fgColor, id) => {
        setBgColor(bgColor);
        setFgColor(fgColor);
        setSelected(id);
    }

    const generateTextQR= () => {
        let entry = text;
        if (!entry) {
            entry = 'Hello!';
        }
        return (
            <div className='text-qr-code-container'>
                <p>Your code:</p>

                <div className='text-qr-code' ref={qrRefWithValue}>
                    <div className='text-qr-code-wrapper' ref={qrRefWithoutValue}>
                        <QRCode value={entry}
                                bgColor={bgColor}
                                fgColor={fgColor}/>
                    </div>
                    <h3 className='text-qr-code-text'>{title}</h3>
                </div>

                <div className='text-qr-download-buttons'>
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
        <div className='text-mode'>
            <div className='main-left'>
                <p>Enter your text:</p>
                <div className='text-bar'>
                    <input
                        type='text'
                        value={text}
                        onChange={(e) => setText(e.target.value)}
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
                {colorPicker(setColors, selected)}
            </div>
            <div className='main-right'>
                {generateTextQR()}
            </div>
        </div>
    )
}