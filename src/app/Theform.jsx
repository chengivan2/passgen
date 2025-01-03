"use client";
import { useState } from 'react';
import './theform.css';
import { CopyIcon } from '@radix-ui/react-icons';

export default function TheForm() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(8);
  const [options, setOptions] = useState({
    lowercase: true,
    uppercase: false,
    digits: false,
    specials: false,
  });
  const [presentSettings, setPresentSettings] = useState(true);

  const handleGenerate = async () => {
    if (options.lowercase || options.uppercase || options.digits || options.specials) {
      setPresentSettings(true);
      const response = await fetch('/api/generate-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ length, options }),
      });
      const data = await response.json();
      setPassword(data.password);
    } else {
      setPresentSettings(false);
    }
  };

  return (
    <div className="the-generator">
      <div className="the-password">
        <input type="text" value={password} placeholder="Click on Generate" readOnly />
        <button className="copy-button" onClick={() => navigator.clipboard.writeText(password)}><CopyIcon /></button>
      </div>

      <div className="the-length">
      <div className="length">
          <h6>LENGTH: <span>{length}</span></h6>
        </div>
        <input type="range" min="4" max="24" value={length} onChange={(e) => setLength(e.target.value)} />
      </div>

      <div className="settings-title">
        <h6>SETTINGS</h6>
      </div>
      
      <div className="options">
        
        <div className="option">
          <label>
            <span>Lowercase (a-z)</span>
            <input type="checkbox" checked={options.lowercase} onChange={(e) => setOptions({ ...options, lowercase: e.target.checked })} />
            <span className="toggle"></span>
          </label>
        </div>
        <div className="option">
          <label>
            <span>Uppercase (A-Z)</span>
            <input type="checkbox" checked={options.uppercase} onChange={(e) => setOptions({ ...options, uppercase: e.target.checked })} />
            <span className="toggle"></span>
          </label>
        </div>
        <div className="option">
          <label>
            <span>Digits (0-9)</span>
            <input type="checkbox" checked={options.digits} onChange={(e) => setOptions({ ...options, digits: e.target.checked })} />
            <span className="toggle"></span>
          </label>
        </div>
        <div className="option">
          <label>
            <span>Symbols (!@$#%^)</span>
            <input type="checkbox" checked={options.specials} onChange={(e) => setOptions({ ...options, specials: e.target.checked })} />
            <span className="toggle"></span>
          </label>
        </div>
      </div>

      {!presentSettings && <p className='null-settings-error-message'>Please select at least one option.</p>}

      <button className="generate" onClick={handleGenerate}>Generate Password</button>
    </div>
  );
}