import './App.css';
import {useRef, useState} from "react";
import QRCode from "react-qr-code";
import {toPng} from 'html-to-image';

function App() {
    const [bgColor, setBgColor] = useState('white');
    const [fgColor, setFgColor] = useState('black');
    // const [comboSwitch, setComboSwitch] = useState(false);
    const [link, setLink] = useState('Hello!');
    const [selected, setSelected] = useState(0);
    const qrRefWithValue = useRef(null);
    const qrRefWithoutValue = useRef(null);

    const switchColors = () => {
        const temp = bgColor;
        setBgColor(fgColor);
        setFgColor(temp);
    }

    const setColors = (bgColor, fgColor) => {
        // if (!comboSwitch) {
            setBgColor(bgColor);
            setFgColor(fgColor);
        // } else {
        //     setBgColor(fgColor);
        //     setFgColor(bgColor);
        // }
    }

    const htmlToImageConvert = (ref) => {
        toPng(ref.current, {cacheBust: false})
            .then((dataUrl) => {
                const link = document.createElement("a");
                link.download = "qr.png";
                link.href = dataUrl;
                link.click();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const colorBox = (bgColor, fgColor, id) => {
        const colorBoxClassName = id === selected ? 'selected color-box-container' : 'color-box-container';
        return (
            <div className={colorBoxClassName} onClick={() => {
                setColors(bgColor, fgColor);
                setSelected(id);
            }}>
                <div className='color-box' style={{
                    backgroundColor: bgColor,
                    width: 25,
                    height: 25,
                }}>
                </div>
                <div className='color-box' style={{
                    backgroundColor: fgColor,
                    width: 25,
                    height: 25,
                }}>
                </div>
            </div>
        )
    }
    const colorPicker = () => {
        // const switchClass = comboSwitch ? "switch-on" : "switch-off";
        return (
            <div className='color-picker-container'>
                <p>Pick a color palette:</p>
                <div className='color-picker'>
                    {colorBox('#FFFFFF', '#000000', 0)}
                    {colorBox('#F1F0E8', '#333333', 1)}
                    {colorBox('#FFF3DA', '#9D83F7', 2)}
                    {colorBox('#F1F0E8', '#96B6C5', 3)}
                    {colorBox('#FFE8D3', '#a6d382', 4)}
                    {colorBox('#FFFFE0', '#4B0082', 5)}
                    {colorBox('#f6f0bd', '#556B2F', 6)}
                    {colorBox('#fad9d5', '#8A2BE2', 7)}
                    {colorBox('#F5FFFA', '#8B0000', 8)}
                    {colorBox('#FFF5EE', '#006400', 9)}
                    {colorBox('#F0F8FF', '#000080', 10)}
                    {colorBox('#FFF0F5', '#4B0082', 11)}
                    {colorBox('#F0F8FF', '#1E90FF', 12)}
                    {colorBox('#FFFAF0', '#FF4500', 13)}
                    {colorBox('#FFE4E1', '#800080', 14)}
                </div>
                {/*<button onClick={() => {*/}
                {/*    // setComboSwitch(!comboSwitch);*/}
                    {/*switchColors();*/}
                {/*}} className={switchClass}*/}
                {/*>Switch*/}
                {/*</button>*/}
            </div>

        )
    }

    const generateCode = () => {
        if (!link) {
            return <p>Your QR code will be displayed here.</p>
        }
        return (
            <div className='qr-code-container'>
                <p>Your code:</p>

                <div className='qr-code' ref={qrRefWithValue}>
                    <div className='qr-code-wrapper' ref={qrRefWithoutValue}>
                        <QRCode value={link}
                                bgColor={bgColor}
                                fgColor={fgColor}/>
                    </div>
                    <p className='qr-code-text'>{link}</p>
                </div>

                <div className='download-buttons'>
                    <button onClick={() => {
                        htmlToImageConvert(qrRefWithValue)
                    }}>Download Code With Text
                    </button>
                    <button onClick={() => {
                        htmlToImageConvert(qrRefWithoutValue)
                    }}>Download Code Only
                    </button>
                </div>
            </div>
        )
    }
    return (
        <div className='app'>
            <h1>QR Code Generator</h1>
            <div className='main'>
                <div className='main-left'>
                    <p>Enter your link/text:</p>
                    <div className='text-bar'>
                    <input
                        type='text'
                        defaultValue={'Hello!'}
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                    />
                    </div>
                    {colorPicker()}
                </div>
                <div className='main-right'>
                    {generateCode()}
                </div>
            </div>
        </div>
    );
}

export default App;
