import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles } from '@material-ui/core';
import { ISuggestState } from '../../EditorConstance/props';
import axios from 'axios';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.31
 */

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {
        test: string;
    },
    open: boolean;
    mentionChange(s: number, e: number, str: string): void
}

interface IState {
    metionList: string[];
}

class MentionSuggestBox extends React.Component<IProps & ISuggestState, IState>{
    constructor(props: IProps & ISuggestState) {
        super(props);
        this.state = {
            metionList: []
        }
    }
    public componentWillReceiveProps(prevProps: IProps & ISuggestState) {
        if (this.props.text === prevProps.text || prevProps.text.length > 4 || !prevProps.open) { return }
        // 3글자 이하까지는 db에서 서치
        axios.get("http://localhost:8081/boards/checkMention", {
            params: {
                mention: prevProps.text.slice(1)
            }
        }).then((result) => {
            this.setState({
                metionList: result.data
            })
        })
    }
    public render() {
        const { metionList } = this.state;
        const keyword = this.props.text.slice(1);
        const listOpen = metionList !== undefined ? metionList.length : 0;
        const filteredList = keyword.length > 3 && listOpen !== 0 ?
            this.state.metionList.filter((item) => {
                return item.indexOf(keyword) === 0
            })
            : this.state.metionList
        return (
            <div
                style={{
                    position: "absolute",
                    display: "float",
                    top: this.props.positionY,
                    left: this.props.positionX
                }}
                hidden={(!this.props.open)}
            >
                <ul
                    style={{
                        border: "1px solid black",
                    }}>
                    {
                        filteredList !== undefined ?
                            filteredList.map((mention, index) => {
                                const handler = () => {
                                    this.props.mentionChange(
                                        this.props.start, this.props.end, "#" + mention
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
                            }) : <div>시발</div>
                    }
                </ul>
            </div>
        );
    }
}

export default withStyles(style)(MentionSuggestBox);