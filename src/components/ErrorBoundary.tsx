import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-luxury-bg p-10 text-center">
          <div className="space-y-4">
            <h1 className="display text-4xl text-luxury-gold">Something went wrong</h1>
            <p className="text-luxury-muted">초대장을 불러오는 중 오류가 발생했습니다.</p>
            <pre className="text-[10px] bg-black/5 p-4 rounded text-left overflow-auto max-w-md">
              {this.state.error?.message}
            </pre>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-luxury-gold text-white rounded-full text-sm font-bold"
            >
              다시 시도하기
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
