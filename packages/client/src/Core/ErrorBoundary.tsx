import { Popup } from "@/components/Popup";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
    children: ReactNode;
}

interface State {
    errorInfo: ErrorInfo | null;
    error: Error | null;
    hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
      super(props);

      this.state = {
        error: null,
        errorInfo: null,
        hasError: false,
    };
    }
    static getDerivedStateFromError(error: Error) {
        return ({hasError: true })
    };

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        this.setState({
            error: error,
            errorInfo: errorInfo
        });
    };

    handleClose = () => {
        this.setState({
            hasError: false,
            error: null,
            errorInfo: null,
        })
    };

    render() {
        const { hasError, error, errorInfo } = this.state;

        if (hasError) {
            return (
                <Popup
                    isOpen={hasError}
                    title='Что-то пошло не так'
                    onClose={this.handleClose}
                >
                    <details>
                        {error && error.toString()}
                        <br />
                        {errorInfo?.componentStack}
                    </details>
                </Popup>
            );
        }
        return this.props.children;
    };  
};
