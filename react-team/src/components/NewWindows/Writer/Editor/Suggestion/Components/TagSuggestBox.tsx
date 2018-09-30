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
        if (this.props.text === prevProps.text || prevProps.text.length > 4 || !prevProps.open) { return }
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
        let filteredList = keyword.length > 3 && listOpen !== 0 ?
            this.state.tagList.filter((item) => {
                return item.toLowerCase().indexOf(keyword.toLowerCase()) === 0
            })
            : this.state.tagList
        if (filteredList.length > 5) {
            filteredList = filteredList.splice(0, 5);
        }
        return (
            <div
                style={{
                    position: "absolute",
                    display: "float",
                    top: this.props.positionY + 15,
                    left: this.props.positionX
                }}
                hidden={(!this.props.open) || filteredList.length === 0}
            >
                <div
                    style={{
                        border: "1px solid black",
                        padding: "5px"
                    }}
                >
                    {
                        filteredList !== undefined ?
                            filteredList.map((tag, index) => {
                                const handler = () => {
                                    this.props.tagChange(
                                        this.props.start, this.props.end, "#" + tag
                                    )
                                }
                                return (
                                    <React.Fragment key={index}>
                                        <span
                                            style={{ marginBottom: "3px" }}
                                            onClick={handler}
                                        >
                                            {tag}
                                        </span><br />
                                    </React.Fragment>
                                );
                            }) : ""
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(style)(TagSuggestBox);