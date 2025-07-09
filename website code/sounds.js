// Sound Effects Generator for Brain Blast!
// Uses Web Audio API to generate sounds without external files

class SoundEffects {
    constructor() {
        this.audioContext = null;
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            // Create audio context
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('Web Audio API not supported');
        }
    }

    // Generate a pleasant "ding" sound for correct answers
    playCorrectSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Create a pleasant ascending tone
        oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
        oscillator.frequency.exponentialRampToValueAtTime(659.25, this.audioContext.currentTime + 0.1); // E5
        oscillator.frequency.exponentialRampToValueAtTime(783.99, this.audioContext.currentTime + 0.2); // G5
        
        oscillator.type = 'sine';
        
        // Fade in and out
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.3, this.audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.3);
    }

    // Generate a "buzz" sound for incorrect answers
    playIncorrectSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        // Create a descending "wrong" tone
        oscillator.frequency.setValueAtTime(220, this.audioContext.currentTime); // A3
        oscillator.frequency.exponentialRampToValueAtTime(196, this.audioContext.currentTime + 0.1); // G3
        oscillator.frequency.exponentialRampToValueAtTime(174.61, this.audioContext.currentTime + 0.2); // F3
        
        oscillator.type = 'sawtooth'; // More harsh sound for wrong answers
        
        // Fade in and out
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.2, this.audioContext.currentTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.4);
    }

    // Generate a "pop" sound for button clicks (optional)
    playClickSound() {
        if (!this.audioContext) return;
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, this.audioContext.currentTime + 0.1);
        
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    }

    // Resume audio context if it was suspended (needed for some browsers)
    resumeAudioContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    }
}

// Create global instance
const soundEffects = new SoundEffects();

// Function to play correct sound (for use in game.html)
function playCorrectSound() {
    soundEffects.resumeAudioContext();
    soundEffects.playCorrectSound();
}

// Function to play incorrect sound (for use in game.html)
function playIncorrectSound() {
    soundEffects.resumeAudioContext();
    soundEffects.playIncorrectSound();
}

// Function to play click sound (for use in game.html)
function playClickSound() {
    soundEffects.resumeAudioContext();
    soundEffects.playClickSound();
} 