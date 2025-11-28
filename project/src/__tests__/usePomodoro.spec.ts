import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { usePomodoro } from '../hooks/usePomodoro';

// Helper to quickly update settings
const withSettings = (hook: ReturnType<typeof renderHook<typeof usePomodoro>>, partial: Partial<ReturnType<typeof usePomodoro>['settings']>) => {
  const current = hook.result.current;
  current.updateSettings({ ...current.settings, ...partial });
};

describe('usePomodoro logic', () => {
  it('applies updateSettings using new values for current type', () => {
    const { result } = renderHook(() => usePomodoro());

    // Start with work type
    expect(result.current.state.currentType).toBe('work');

    act(() => {
      result.current.updateSettings({
        ...result.current.settings,
        workDuration: 60, // 1 minute
      });
    });

    expect(result.current.state.currentTime).toBe(60);
    expect(result.current.state.isRunning).toBe(false);
  });

  it('transitions to long break exactly at longBreakInterval multiples', () => {
    const { result } = renderHook(() => usePomodoro());

    // Force long break every 2 work sessions
    act(() => {
      result.current.updateSettings({
        ...result.current.settings,
        longBreakInterval: 2,
      });
    });

    // Sequence: work -> (skip) -> shortBreak -> (skip) -> work -> (skip) -> longBreak
    expect(result.current.state.currentType).toBe('work');

    act(() => { result.current.skip(); });
    expect(['shortBreak', 'longBreak']).toContain(result.current.state.currentType);

    act(() => { result.current.skip(); }); // finish break -> back to work
    expect(result.current.state.currentType).toBe('work');

    act(() => { result.current.skip(); }); // finish 2nd work -> should be longBreak
    expect(result.current.state.currentType).toBe('longBreak');
  });

  it('increments sessionsCompleted only after finishing a work session via skip()', () => {
    const { result } = renderHook(() => usePomodoro());

    const initial = result.current.state.sessionsCompleted;
    // On fresh start, type is work
    act(() => { result.current.skip(); }); // finish first work

    expect(result.current.state.sessionsCompleted).toBe(initial + 1);

    // We're now in a break; skipping should not increment completed work sessions
    const afterWork = result.current.state.sessionsCompleted;
    act(() => { result.current.skip(); }); // finish break -> back to work
    expect(result.current.state.sessionsCompleted).toBe(afterWork);
  });
});
