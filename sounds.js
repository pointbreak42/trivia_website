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

    // Generate a short, high-pitched chime for correct answers
    playCorrectSound() {
        if (!this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime); // High pitch
        gainNode.gain.setValueAtTime(0.001, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.18, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.18);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.18);
    }

    // Generate a short, low-pitched buzzer for incorrect answers
    playIncorrectSound() {
        if (!this.audioContext) return;
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        oscillator.type = 'square';
        oscillator.frequency.setValueAtTime(110, this.audioContext.currentTime); // Low pitch
        gainNode.gain.setValueAtTime(0.001, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.22, this.audioContext.currentTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.22);
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.22);
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
