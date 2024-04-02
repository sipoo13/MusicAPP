import React from "react";
import '../styles/ProgressBarStyle.css';

const ProgressBar = () => {
    return (
        <div>
            <input
                type="range"
                min="1"
                max="100"
                value={50}
                step="0.25"
                className="slider"
            />
        </div>
    );
}

export default ProgressBar;