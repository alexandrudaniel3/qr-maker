import './styles/WifiQR.css';
import React, {useRef, useState} from "react";
import QRCode from "react-qr-code";
import {colorPicker, exportQR} from "../utils";

export default function WifiQR({bgColor, fgColor, selected, setBgColor, setFgColor, setSelected}) {
    const [ssid, setSsid] = useState('');
    const [pwd, setPwd] = useState('');
    const [enc, setEnc] = useState('WPA');
    const [hid, setHid] = useState(0);
    const qrRefWithValue = useRef(null);
    const qrRefWithoutValue = useRef(null);

    // document.body.style.transition = 'transition: background 5s ease';
    document.body.style.background = 'linear-gradient(135deg, #66B2FF, #5A76BE)';

    const setColors = (bgColor, fgColor, id) => {
        setBgColor(bgColor);
        setFgColor(fgColor);
        setSelected(id);
    }

    const encSelector = () => {
        return (
            <div className='enc-selector'>
                <button
                    onClick={() => setEnc('WPA')}
                    className={enc === 'WPA' ? 'selected' : null}
                >WPA
                </button>
                {/*<button*/}
                {/*    onClick={() => setEnc('WPA2-EAP')}*/}
                {/*    className={enc === 'WPA2-EAP' ? 'selected' : null}*/}
                {/*>WPA2-EAP*/}
                {/*</button>*/}
                <button
                    onClick={() => setEnc('WEP')}
                    className={enc === 'WEP' ? 'selected' : null}
                >WEP
                </button>
                <button
                    onClick={() => setEnc('nopass')}
                    className={enc === 'nopass' ? 'selected' : null}
                >No password
                </button>
            </div>
        )
    }

    const generateWifiQR = () => {
        let entry = ssid;
        if (!entry) {
            entry = 'Hello!';
        } else {
            entry = `WIFI:S:${ssid};T:${enc};P:${pwd};H:${hid ? '1' : '0'};;`;
        }

        return (
            <div className='wifi-qr-code-container'>
                <p>Your code:</p>

                <div className='text-qr-code' ref={qrRefWithValue}>
                    <div className='text-qr-code-wrapper' ref={qrRefWithoutValue}>
                        <QRCode value={entry}
                                bgColor={bgColor}
                                fgColor={fgColor}/>
                    </div>
                    <h3 className='text-qr-code-text'>{ssid}</h3>
                </div>

                <div className='text-qr-download-buttons'>
                    <button onClick={() => {
                        exportQR(qrRefWithValue)
                    }}>Download Code With SSID
                    </button>
                    <button onClick={() => {
                        exportQR(qrRefWithoutValue)
                    }}>Download Code Only
                    </button>
                </div>
            </div>
        )
    }

    const hidCheckBox = () => {
        return (
            <div className='hid-checkbox'>
                <p>Hidden</p>
                <input type={"checkbox"}
                       onClick={() => setHid(!hid)}/>
            </div>
        )
    }

    return (
        <div className='wifi-mode'>
            <div className='main-left'>
                <p>Enter your credentials:</p>
                <div className='text-bar'>
                    <p>SSID:</p>
                    <input
                        type='text'
                        value={ssid}
                        onChange={(e) => setSsid(e.target.value)}
                    />
                </div>
                <div className='text-bar'>
                    <p>Password:</p>
                    <input
                        type='password'
                        value={pwd}
                        onChange={(e) => setPwd(e.target.value)}
                    />
                </div>
                {encSelector()}
                {hidCheckBox()}
                {colorPicker(setColors, selected)}
            </div>
            <div className='main-right'>
                {generateWifiQR()}
            </div>
        </div>
    )
}
