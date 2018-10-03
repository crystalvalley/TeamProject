import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles } from '@material-ui/core';
import { ISuggestState } from '../../EditorConstance/props';
import axios from 'axios';
import { ROOTURL } from '../../../../../../constance/models';

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
        axios.get(ROOTURL+"/boards/checkMention", {
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
        let filteredList = keyword.length > 3 && listOpen !== 0 ?
            this.state.metionList.filter((item) => {
                return item.toLowerCase().indexOf(keyword.toLowerCase()) === 0
            })
            : this.state.metionList
        if(filteredList.length>5){
            filteredList = filteredList.splice(0,5);
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
                            filteredList.map((mention, index) => {
                                const handler = () => {
                                    this.props.mentionChange(
                                        this.props.start, this.props.end, "@" + mention
                                    )
                                }
                                return (
                                    <React.Fragment key={index}>
                                        <span
                                            style={{ marginBottom: "3px" }}
                                            onClick={handler}
                                        >
                                            {mention}
                                        </span><br />
                                    </React.Fragment>
                                );
                            }) : <div />
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(style)(MentionSuggestBox);