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
    open:boolean,
    tagChange(s: number, e: number, str: string): void
}

interface IState {
    tagList: string[];
}

class TagSuggestBox extends React.Component<IProps & ISuggestState, IState>{
    constructor(props: IProps & ISuggestState) {
        super(props);
        this.state = {
            tagList: [
                "test1",
                "SCI",
                "MASTER",
                "GoGoGo",
                "Dota2"
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
                        this.state.tagList.map((tag, index) => {
                            const handler = () => {
                                this.props.tagChange(
                                    this.props.start, this.props.end, "#" + tag
                                )
                            }
                            return (
                                <li
                                    key={index}
                                    onClick={handler}
                                >
                                    {tag}
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
}

export default withStyles(style)(TagSuggestBox);