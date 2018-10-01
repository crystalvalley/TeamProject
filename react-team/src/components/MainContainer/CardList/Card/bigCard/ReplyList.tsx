import * as React from 'react';
import { IReplyModel, ROOTURL } from '../../../../../constance/models';
import { StyleRulesCallback, Theme, withStyles, Button, Avatar } from '@material-ui/core';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
import { ILoginStore, withLoginContext } from '../../../../../contexts/LoginContext';
import axios from 'axios';
/**
 * 댓글 받아오기 댓글폼
 * @author:MinJu Cha
 * @since:2018.9.5
 * @version:2018.9.7 
 */
/**
 * @author:Park HyeokJoon
 * @version: 2018.09.29
 */



const styles: StyleRulesCallback = (theme: Theme) => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
        height: "100%",
        overflowX: 'auto',
    },
    table: {
        width: "100%",
        height: "100%",
        display: "flex"
    },
})


interface IProps {
    classes: {
        root: string;
        table: string;
    }
    reply: IReplyModel;
    width: number;
    getReply(): void;
}

interface IState {
    editorState: EditorState,
}


class ReplyList extends React.Component<IProps & ILoginStore, IState>{
    constructor(props: IProps & ILoginStore) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.reply.content)), SNSDecorator)
        }
        this.editorChange = this.editorChange.bind(this);
        this.deleteReply = this.deleteReply.bind(this);
    }
    public render() {
        const { classes } = this.props;
        return (
            <div
                style={{
                    fontFamily: "Sunflower,sans-serif"
                }}
            >
                <div
                    className={classes.table}
                >
                    <Avatar src={ROOTURL+"/resources"+this.props.reply.writer.profileImg} />
                    <div
                        style={{
                            marginLeft: "10px",
                            flexBasis: this.props.width * 2 / 10,
                        }}
                    >
                        {this.props.reply.writer.id}
                    </div>
                    <div
                        style={{ flexBasis: this.props.width * 4 / 10 }}
                    >
                        {this.props.reply.writeDate.substring(2, 10) + " " + this.props.reply.writeDate.substring(11, 16)}
                    </div>
                    <div
                        style={{ flexBasis: this.props.width * 4 / 10 }}
                    >
                        <Button
                            onClick={this.deleteReply}
                            disabled={this.props.logined.id !== this.props.reply.writer.id}
                        >
                            삭제
                        </Button>
                    </div>
                </div>
                <div style={{ paddingLeft: "5px" }}>
                    <Editor
                        readOnly={true}
                        editorState={this.state.editorState}
                        onChange={this.editorChange}
                    />
                </div>
            </div>
        );
    }
    private editorChange(e: EditorState) {
        this.setState({
            editorState: e
        })
    }
    private deleteReply() {
        axios.get(ROOTURL + "/boards/delReply", {
            params: {
                replynumber: this.props.reply.id
            }
        }).then((response) => {
            this.props.getReply();
        })
    }
}

export default withLoginContext(withStyles(styles)(ReplyList));