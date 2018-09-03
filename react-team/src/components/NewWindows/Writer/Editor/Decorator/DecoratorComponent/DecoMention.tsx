import * as React from 'react';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.28
 */

interface IProps {
    offsetKey: string;
    decoratedText:string;
}


export default class DecoMention extends React.Component<IProps> {
    public render() {
        return (
            <a
                style={{
                    color : 'rgba(98, 177, 254, 1.0)'
                }}
                href={"http://localhost:8081/boards/findByMention?mention="+this.props.decoratedText.slice(1)}
                data-offset-key={this.props.offsetKey}
            >
                {this.props.children}
            </a>
        );
    }
}