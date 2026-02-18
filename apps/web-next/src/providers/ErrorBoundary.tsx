'use client'

import React, { Component } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

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
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          gap={2}
          px={3}
          textAlign="center"
        >
          <Typography variant="h5" component="h1">
            Something went wrong
          </Typography>
          <Typography variant="body1" color="text.secondary">
            An unexpected error occurred. Please try again.
          </Typography>
          <Button variant="contained" onClick={this.handleRetry}>
            Reload page
          </Button>
        </Box>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
