import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles } from '@material-ui/core';

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {
        test: string;
    }
}

export interface ISuggestState {
    suggest: boolean;
    start: number;
    end: number;
    positionX: number;
    positionY: number;
}

class SuggestBox extends React.Component<IProps & ISuggestState>{
    public render() {
        return (
            <div
                style={{
                    position: "absolute",
                    display: "float",
                    top: this.props.positionY,
                    left: this.props.positionX
                }}
                hidden={!this.props.suggest}
            >
                <ul
                    style={{
                        border: "1px solid black",
                    }}>
                    <li>test1</li>
                    <li>test2</li>
                    <li>test3</li>
                    <li>test4</li>
                </ul>
            </div>
        );
    }
}

export default withStyles(style)(SuggestBox);