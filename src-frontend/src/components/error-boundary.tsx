import React, { Component } from 'react';

export default class ErrorBoundary extends Component<
    {},
    { hasError: boolean }
> {
    constructor(props:{}) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(_error: any, errorInfo: any) {
        console.error(errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }

        return this.props.children;
    }
}
