"use client";
import { ThemeSwitcher } from './ThemeProvider';
import { HeartFilledIcon } from '@radix-ui/react-icons';
import './footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <ThemeSwitcher />
        <div className="footer-credits">
          <span>Made with </span>
          <HeartFilledIcon className="heart-icon" />
          <span> by </span>
          <a 
            href="https://ivanthedev.pro" 
            target="_blank" 
            rel="noopener noreferrer"
            className="footer-link"
          >
            Ivan the Dev
          </a>
        </div>
      </div>
    </footer>
  );
}
