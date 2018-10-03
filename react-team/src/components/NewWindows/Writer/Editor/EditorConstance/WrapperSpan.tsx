import * as React from 'react';
import './CustomBlockQuoteWrapperStyle.css'

export class TextWrapper extends React.Component {
    public render() {
        return (
            <span style={{ fontFamily: "Sunflower" }}>
                {this.props.children}
            </span>
        );
    }
}