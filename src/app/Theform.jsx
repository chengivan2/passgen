"use client";
import { useState, useEffect } from 'react';
import './theform.css';
import { CopyIcon, CheckIcon, ReloadIcon } from '@radix-ui/react-icons';

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
  const [copied, setCopied] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Calculate password strength
  const calculateStrength = (pass) => {
    if (!pass) return null;
    
    let strength = 0;
    const tests = [
      { regex: /.{8,}/, points: 1 }, // Length 8+
      { regex: /.{12,}/, points: 1 }, // Length 12+
      { regex: /.{16,}/, points: 1 }, // Length 16+
      { regex: /[a-z]/, points: 1 }, // Lowercase
      { regex: /[A-Z]/, points: 1 }, // Uppercase
      { regex: /[0-9]/, points: 1 }, // Numbers
      { regex: /[^a-zA-Z0-9]/, points: 2 }, // Special chars
    ];
    
    tests.forEach(test => {
      if (test.regex.test(pass)) {
        strength += test.points;
      }
    });
    
    if (strength <= 3) return 'weak';
    if (strength <= 6) return 'medium';
    return 'strong';
  };

  useEffect(() => {
    setPasswordStrength(calculateStrength(password));
  }, [password]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerate = async () => {
    if (options.lowercase || options.uppercase || options.digits || options.specials) {
      setPresentSettings(true);
      setIsGenerating(true);
      
      try {
        // Add a small delay to show the loading state even for fast generations
        await new Promise(resolve => setTimeout(resolve, 300));
        
        const response = await fetch('/api/generate-password', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ length, options }),
        });
        const data = await response.json();
        setPassword(data.password);
      } catch (error) {
        console.error('Error generating password:', error);
      } finally {
        setIsGenerating(false);
      }
    } else {
      setPresentSettings(false);
    }
  };

  return (
    <div className="the-generator">
      <div className="the-password">
        <input 
          type="text" 
          value={isGenerating ? '' : password} 
          placeholder={isGenerating ? "Generating..." : "Click on Generate"} 
          readOnly 
          className={isGenerating ? 'generating' : ''}
        />
        {isGenerating && <div className="loading-spinner"><ReloadIcon className="spin" /></div>}
        <button 
          className={`copy-button ${copied ? 'copied' : ''}`} 
          onClick={handleCopy}
          disabled={!password || isGenerating}
        >
          {copied ? (
            <>
              <CheckIcon />
              <span>Copied</span>
            </>
          ) : (
            <>
              <CopyIcon />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {password && (
        <div className="password-strength">
          <div className="strength-label">Password Strength:</div>
          <div className="strength-meter">
            <div className={`strength-bar ${passwordStrength}`}></div>
          </div>
          <div className={`strength-text ${passwordStrength}`}>
            {passwordStrength && passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)}
          </div>
        </div>
      )}

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

      <button 
        className="generate" 
        onClick={handleGenerate}
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <ReloadIcon className="spin inline-icon" />
            <span>Generating...</span>
          </>
        ) : (
          'Generate Password'
        )}
      </button>
    </div>
  );
}