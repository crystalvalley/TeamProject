import * as React from 'react';
import { IReplyModel } from '../../../../../constance/models';
import { TableCell, StyleRulesCallback, Theme, withStyles, TableRow } from '@material-ui/core';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
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
        height:"100%",
        overflowX: 'auto',
    },
    table: {
        height:"100%",
        minWidth: 700,
    }
})


interface IProps {
    classes: {
        root: string;
        table: string;
    }
    reply: IReplyModel;
}

interface IState{
    editorState : EditorState,
}


class ReplyList extends React.Component<IProps,IState>{
    constructor(props : IProps){
        super(props);
        this.state={
            editorState : EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.reply.content)), SNSDecorator)
        }
    }
    public render() {
        const { classes } = this.props;
        return (
            <TableRow className={classes.table}>
                <TableCell >
                    {this.props.reply.writer.id}
                </TableCell>
                <TableCell >
                    <Editor
                        editorState={this.state.editorState}
                        onChange={this.editorChange}
                    />
                </TableCell>
                <TableCell > {this.props.reply.writeDate}</TableCell>
            </TableRow>
        );
    }
    private editorChange(e : EditorState){
        this.setState({
            editorState : e
        })
    }
}

export default withStyles(styles)(ReplyList); 