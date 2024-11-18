import React from 'react';
import { createRoot } from 'react-dom/client';
import ChromeNotepad from './ChromeNotepad';
import './styles.css';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<ChromeNotepad />);