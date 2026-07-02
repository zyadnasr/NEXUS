type AnimationCallback = (time: number, delta: number) => void;

class AnimationManager {
  private callbacks: Set<AnimationCallback> = new Set();
  private rafId: number | null = null;
  private lastTime: number = 0;

  subscribe(callback: AnimationCallback): () => void {
    this.callbacks.add(callback);
    if (this.callbacks.size === 1) {
      this.start();
    }
    return () => {
      this.callbacks.delete(callback);
      if (this.callbacks.size === 0) {
        this.stop();
      }
    };
  }

  private tick = (time: number) => {
    const delta = time - this.lastTime;
    this.lastTime = time;

    this.callbacks.forEach((cb) => {
      try {
        cb(time, delta);
      } catch (e) {
        console.error("Error in animation callback:", e);
      }
    });

    this.rafId = requestAnimationFrame(this.tick);
  };

  private start() {
    this.lastTime = performance.now();

    document.addEventListener('visibilitychange', this.handleVisibility);

    this.rafId = requestAnimationFrame(this.tick);
  }

  private handleVisibility = () => {
    if (document.hidden && this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    } else if (!document.hidden && this.rafId === null && this.callbacks.size > 0) {
      this.lastTime = performance.now();
      this.rafId = requestAnimationFrame(this.tick);
    }
  };

  private stop() {
    document.removeEventListener('visibilitychange', this.handleVisibility);
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

export const animationManager = new AnimationManager();
