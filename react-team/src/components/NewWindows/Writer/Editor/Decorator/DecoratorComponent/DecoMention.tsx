import * as React from 'react';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.28
 */

interface IProps {
    offsetKey: string;
}


export default class DecoMention extends React.Component<IProps> {
    public render() {
        return (
            <span
                style={{
                    color : 'rgba(98, 177, 254, 1.0)'
                }}
                data-offset-key={this.props.offsetKey}
            >
                {this.props.children}
            </span>
        );
    }
}