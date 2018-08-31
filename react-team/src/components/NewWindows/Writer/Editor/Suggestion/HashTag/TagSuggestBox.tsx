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
    open: boolean,
    tagChange(s: number, e: number, str: string): void
}

interface IState {
    tagList: string[]
}

class TagSuggestBox extends React.Component<IProps & ISuggestState, IState>{
    constructor(props: IProps & ISuggestState) {
        super(props);
        this.state = {
            tagList: []
        }
    }
    public componentWillReceiveProps(prevProps: IProps & ISuggestState) {
        if (this.props.text === prevProps.text || prevProps.text.length > 4|| !prevProps.open) { return }
        // 3글자 이하까지는 db에서 서치
        axios.get("http://localhost:8081/boards/checkTag", {
            params: {
                hashTag: prevProps.text.slice(1)
            }
        }).then((result) => {
            const tagArray: string[] = [];
            result.data.map((item: { hashTag: string }) => {
                tagArray.push(item.hashTag);
            })
            this.setState({
                tagList: tagArray
            })
        })
    }
    public render() {
        const { tagList } = this.state;
        const keyword = this.props.text.slice(1);
        const listOpen = tagList !== undefined ? tagList.length : 0;
        const filteredList = keyword.length > 3 && listOpen !== 0 ?
            this.state.tagList.filter((item) => {
                return item.indexOf(keyword) === 0
            })
            : this.state.tagList
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
                            filteredList.map((tag, index) => {
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
                            }) : <div>시발</div>
                    }
                </ul>
            </div>
        );
    }
}

export default withStyles(style)(TagSuggestBox);