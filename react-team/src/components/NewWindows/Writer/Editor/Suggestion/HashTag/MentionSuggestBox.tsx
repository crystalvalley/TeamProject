import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles } from '@material-ui/core';
import { ISuggestState } from '../../EditorConstance/props';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.30
 */

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {
        test: string;
    },
    open:boolean;
    mentionChange(s: number, e: number, str: string): void
}

interface IState {
    metionList: string[];
}

class MentionSuggestBox extends React.Component<IProps & ISuggestState, IState>{
    constructor(props: IProps & ISuggestState) {
        super(props);
        this.state = {
            metionList: [
                "testman",
                "GilJoonSeong",
                "KimMinJeong",
                "GoBongSoo",
                "ChaMinJoo",
                "ParkHyeokJoon"
            ]
        }
    }
    public render() {
        // const filteredList = this.state.tagList.filter();
        return (
            <div
                style={{
                    position: "absolute",
                    display: "float",
                    top: this.props.positionY,
                    left: this.props.positionX
                }}
                hidden={!this.props.open}
            >
                <ul
                    style={{
                        border: "1px solid black",
                    }}>
                    {
                        this.state.metionList.map((mention, index) => {
                            const handler = () => {
                                this.props.mentionChange(
                                    this.props.start, this.props.end, "@" + mention
                                )
                            }
                            return (
                                <li
                                    key={index}
                                    onClick={handler}
                                >
                                    {mention}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default withStyles(style)(MentionSuggestBox);