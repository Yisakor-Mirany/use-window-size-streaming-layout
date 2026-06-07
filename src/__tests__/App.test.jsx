import { render, screen, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

// Helper: set window size and fire resize
function resizeWindow(width, height) {
  Object.defineProperty(window, 'innerWidth',  { writable: true, configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
  act(() => window.dispatchEvent(new Event('resize')));
}

describe('App layout switching', () => {
  // Normal 1 — Desktop layout at wide screen
  it('shows desktop layout label when width is 1280', () => {
    resizeWindow(1280, 800);
    render(<App />);
    expect(screen.getByTestId('layout-strip')).toHaveTextContent('Desktop Layout');
  });

  // Normal 2 — Mobile layout at narrow screen
  it('shows mobile layout label when width is 375', () => {
    resizeWindow(375, 667);
    render(<App />);
    expect(screen.getByTestId('layout-strip')).toHaveTextContent('Mobile Layout');
  });

  // Normal 3 — Size badge updates after resize
  it('displays updated dimensions in the size badge after resize', () => {
    resizeWindow(1024, 768);
    render(<App />);
    act(() => resizeWindow(400, 850));
    expect(screen.getByTestId('size-badge')).toHaveTextContent('400');
  });

  // Edge 3 — Exactly 768px shows desktop layout
  it('shows desktop layout at exactly 768px width', () => {
    resizeWindow(768, 1024);
    render(<App />);
    expect(screen.getByTestId('layout-strip')).toHaveTextContent('Desktop Layout');
  });
});
