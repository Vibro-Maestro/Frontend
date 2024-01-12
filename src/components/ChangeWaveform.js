import React from "react";
import "./ChangeWaveform.css"; // Import your CSS file

const ChangeWaveform = ({ inputChange, waveform }) => {
  return (
    <div className="waveform" style={{ padding: "20px" }}>
      Waveform:
      <div className="waveform-control" onChange={inputChange}>
        <input
          type="radio"
          name="waveform"
          id="sine"
          value="sine"
          defaultChecked={waveform === "sine"}
        />
        <label htmlFor="sine" className="radio-label">Sine</label><br />
        <input
          type="radio"
          name="waveform"
          id="square"
          value="square"
          defaultChecked={waveform === "square"}
        />
        <label htmlFor="square" className="radio-label">Square</label><br />
        <input
          type="radio"
          name="waveform"
          id="triangle"
          value="triangle"
          defaultChecked={waveform === "triangle"}
        />
        <label htmlFor="triangle" className="radio-label">Triangle</label><br />
        <input
          type="radio"
          name="waveform"
          id="sawtooth"
          value="sawtooth"
          defaultChecked={waveform === "sawtooth"}
        />
        <label htmlFor="sawtooth" className="radio-label">Sawtooth</label>
      </div>
    </div>
  );
};

export default ChangeWaveform;