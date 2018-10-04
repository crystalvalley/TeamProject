import * as React from 'react';
import { ISearchState, withSearchContext } from '../../../../../../contexts/SearchContext';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.28
 */

interface IProps {
    offsetKey: string;
    decoratedText :string;
}


class DecoTag extends React.Component<IProps&ISearchState> {
    public render() {
        const handler = ()=> this.props.setKeyword(this.props.decoratedText)+" ";
        return (
            <span
                style={{
                    color : 'rgba(95, 184, 138, 1.0)',
                    fontFamily: "Sunflower,sans-serif",
                    fontStyle:"italic"
                }}
                onClick={handler}
                data-offset-key={this.props.offsetKey}
            >
                {this.props.children}
            </span>
        );
    }
}

export default withSearchContext(DecoTag);