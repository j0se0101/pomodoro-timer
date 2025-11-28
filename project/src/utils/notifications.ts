export const showNotification = (message: string) => {
  if ('Notification' in window) {
    if (Notification.permission === 'granted') {
      new Notification('Pomodoro Timer', {
        body: message,
        icon: '/pomodoro-icon.png',
      });
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Pomodoro Timer', {
            body: message,
            icon: '/pomodoro-icon.png',
          });
        }
      });
    }
  }
};

export const playNotificationSound = () => {
  // Create a simple beep sound using Web Audio API
  const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);
  
  oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
  oscillator.type = 'sine';
  
  gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
  
  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + 0.5);
};

export const requestNotificationPermission = () => {
  if ('Notification' in window && Notification.permission === 'default') {
    Notification.requestPermission();
  }
};