'use client'

import React, { Component } from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

/**
 * Root-level error boundary that catches unhandled render errors
 * and shows a friendly recovery screen instead of a blank page.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, info.componentStack)
  }

  handleRetry = (): void => {
    this.setState({ hasError: false })
    window.location.reload()
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col justify-center items-center min-h-screen gap-4 px-6 text-center">
          <h1 className="text-2xl font-medium text-textTheme-primary">
            Something went wrong
          </h1>
          <p className="text-textTheme-secondary">
            An unexpected error occurred. Please try again.
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="px-4 py-2 bg-accent-primary text-base-primary rounded-lg font-medium hover:bg-accent-primaryActiveButton transition-colors"
          >
            Reload page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
