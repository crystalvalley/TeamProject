import * as React from 'react';
import { withSearchContext, ISearchState } from '../../../../../../contexts/SearchContext';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.28
 */

interface IProps {
    offsetKey: string;
    decoratedText:string;
}


class DecoMention extends React.Component<IProps&ISearchState> {
    public render() {
        const handler = ()=>this.props.setKeyword(this.props.decoratedText)
        return (
            <span
                style={{
                    color : 'rgba(98, 177, 254, 1.0)',
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


export default withSearchContext(DecoMention);