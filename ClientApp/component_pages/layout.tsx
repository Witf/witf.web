import * as React from 'react';

export interface LayoutProps {
    body: React.ReactElement<any>;
}

/**
 * This component will later hold menus and other layout props.
 */
export class Layout extends React.Component<LayoutProps, void> {
    public render() {
        return <div>
             { this.props.body }
        </div>;
    }
}
