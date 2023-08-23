import './styles/TextQR.css';
import QRCode from "react-qr-code";
import {useRef, useState} from "react";
import {exportQR} from "../utils";
import {colorPicker} from "../utils";

export default function TextQR() {
    const [title, setTitle] = useState('');
    const [link, setLink] = useState('');
    const qrRefWithValue = useRef(null);
    const qrRefWithoutValue = useRef(null);
    const [bgColor, setBgColor] = useState('white');
    const [fgColor, setFgColor] = useState('black');
    const [selected, setSelected] = useState(0);

    // document.body.style.transition = 'transition: background 5s ease';
    document.body.style.background = 'linear-gradient(135deg, #B2FF66, #5ABE76)';



    const setColors = (bgColor, fgColor, id) => {
        setBgColor(bgColor);
        setFgColor(fgColor);
        setSelected(id);
    }

    const generateTextCode = () => {
        let entry = link;
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
                <p>Enter your link/text:</p>
                <div className='text-bar'>
                    <input
                        type='text'
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                </div>
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
                {generateTextCode()}
            </div>
        </div>
    )
}