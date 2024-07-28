import { StatusCodes } from 'http-status-codes'
import React, { Component, ErrorInfo, PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  statusCode?: (typeof StatusCodes)[keyof typeof StatusCodes]
}

interface State {
  hasError: boolean
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h1 className="text-7xl font-extrabold text-accent1-500">ERROR</h1>
          <h4 className="font-semibold">We are working on fixing the problem. Be back soon.</h4>
        </>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
