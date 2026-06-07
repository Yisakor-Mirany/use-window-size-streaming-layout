import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import useWindowSize from '../hooks/useWindowSize';

// Helper: fire a resize event after setting window dimensions
function resizeWindow(width, height) {
  Object.defineProperty(window, 'innerWidth',  { writable: true, configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
  window.dispatchEvent(new Event('resize'));
}

// ─────────────────────────────────────────────────
// NORMAL TEST CASES
// ─────────────────────────────────────────────────

describe('Normal test cases', () => {
  // Normal 1 — Desktop layout appears at wide screen sizes
  it('returns width ≥ 768 for a typical desktop viewport', () => {
    resizeWindow(1280, 800);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBeGreaterThanOrEqual(768);
  });

  // Normal 2 — Mobile layout appears at narrow screen sizes
  it('returns width < 768 for a typical mobile viewport', () => {
    resizeWindow(375, 667);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBeLessThan(768);
  });

  // Normal 3 — Width and height update when the window resizes
  it('updates width and height on resize', () => {
    resizeWindow(1024, 768);
    const { result } = renderHook(() => useWindowSize());

    act(() => resizeWindow(500, 900));

    expect(result.current.width).toBe(500);
    expect(result.current.height).toBe(900);
  });
});

// ─────────────────────────────────────────────────
// EDGE TEST CASES
// ─────────────────────────────────────────────────

describe('Edge test cases', () => {
  // Edge 1 — Initial render reads current window dimensions correctly
  it('captures the correct dimensions on initial render', () => {
    resizeWindow(1440, 900);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(1440);
    expect(result.current.height).toBe(900);
  });

  // Edge 2 — Event listener is removed when the component unmounts
  it('removes the resize event listener on unmount', () => {
    const addSpy    = vi.spyOn(window, 'addEventListener');
    const removeSpy = vi.spyOn(window, 'removeEventListener');

    const { unmount } = renderHook(() => useWindowSize());

    // One listener should have been added
    expect(addSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    unmount();

    // The same handler should be removed on cleanup
    expect(removeSpy).toHaveBeenCalledWith('resize', expect.any(Function));

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });

  // Edge 3 — Layout boundary: width exactly 768 is treated as desktop
  it('reports width as 768 at the exact breakpoint boundary', () => {
    resizeWindow(768, 1024);
    const { result } = renderHook(() => useWindowSize());
    expect(result.current.width).toBe(768);
    // 768 is NOT less than 768, so isMobile should be false
    expect(result.current.width < 768).toBe(false);
  });
});
