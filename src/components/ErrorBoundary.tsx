import { PureComponent } from 'react';

export default class ErrorBoundary extends PureComponent {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if ((this as any).state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background px-6">
          <div className="text-center max-w-lg">
            <h1 className="text-6xl font-sora font-black text-white mb-6">Oops</h1>
            <p className="text-lg text-text-secondary mb-8 font-light">
              Something went wrong. Please try refreshing the page.
            </p>
            <button
              onClick={() => { (this as any).setState({ hasError: false }); window.location.reload(); }}
              className="bg-white text-black px-8 py-4 rounded-full text-base font-bold hover:bg-white/90 transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
