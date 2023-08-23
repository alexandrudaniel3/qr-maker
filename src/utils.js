import {toPng} from "html-to-image";

export const exportQR = (ref) => {
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

export const colorBox = (bgColor, fgColor, id, setColors, selected) => {
    const colorBoxClassName = id === selected ? 'selected color-box-container' : 'color-box-container';
    return (
        <div className={colorBoxClassName} onClick={() => {
            setColors(bgColor, fgColor, id);
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

export const colorPicker = (setColors, selected) => {
    // const switchClass = comboSwitch ? "switch-on" : "switch-off";
    return (
        <div className='color-picker-container'>
            <p>Pick a color palette:</p>
            <div className='color-picker'>
                {colorBox('#FFFFFF', '#000000', 0, setColors, selected)}
                {colorBox('#F1F0E8', '#333333', 1, setColors, selected)}
                {colorBox('#FFF3DA', '#9D83F7', 2, setColors, selected)}
                {colorBox('#F1F0E8', '#96B6C5', 3, setColors, selected)}
                {colorBox('#FFE8D3', '#a6d382', 4, setColors, selected)}
                {colorBox('#FFFFE0', '#4B0082', 5, setColors, selected)}
                {colorBox('#f6f0bd', '#556B2F', 6, setColors, selected)}
                {colorBox('#fad9d5', '#8A2BE2', 7, setColors, selected)}
                {colorBox('#F5FFFA', '#8B0000', 8, setColors, selected)}
                {colorBox('#FFF5EE', '#006400', 9, setColors, selected)}
                {colorBox('#F0F8FF', '#000080', 10, setColors, selected)}
                {colorBox('#FFF0F5', '#4B0082', 11, setColors, selected)}
                {colorBox('#F0F8FF', '#1E90FF', 12, setColors, selected)}
                {colorBox('#FFFAF0', '#FF4500', 13, setColors, selected)}
                {colorBox('#FFE4E1', '#800080', 14, setColors, selected)}
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
