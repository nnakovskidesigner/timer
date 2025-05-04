class Timer {
    constructor(duration, onTick, onComplete) {
        this.duration = duration; // Duration in seconds
        this.remainingTime = duration;
        this.onTick = onTick; // Callback for each tick
        this.onComplete = onComplete; // Callback when timer completes
        this.intervalId = null;
    }

    start() {
        if (this.intervalId) return; // Prevent multiple intervals

        const startTime = Date.now();
        this.intervalId = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            this.remainingTime = this.duration - elapsed;

            if (this.remainingTime <= 0) {
                this.stop();
                this.remainingTime = 0;
                if (this.onComplete) this.onComplete();
            } else {
                if (this.onTick) this.onTick(this.remainingTime);
            }
        }, 1000);
    }

    pause() {
        if (this.intervalId) {
            clearInterval(this.intervalId);
            this.intervalId = null;
        }
    }

    reset(newDuration) {
        this.pause();
        this.duration = newDuration || this.duration;
        this.remainingTime = this.duration;
    }

    stop() {
        this.pause();
        this.remainingTime = 0;
    }
}

// Example usage:
const timer = new Timer(
    10, // 10 seconds
    (remainingTime) => console.log(`Time left: ${remainingTime}s`),
    () => console.log('Timer completed!')
);

timer.start();

// You can call `timer.pause()`, `timer.reset(newDuration)`, or `timer.stop()` as needed.