import * as React from 'react';
import { IReplyModel } from '../../../../../constance/models';
import {  Table,  TableCell, StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
/**
 * 댓글 받아오기 댓글폼
 * @author:MinJu Cha
 * @since:2018.9.5
 * @version:2018.9.7
 * 
 */



const styles: StyleRulesCallback = (theme: Theme) => ({
    root: {
        width: '100%',
        // marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
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


class ReplyList extends React.Component<IProps>{
    public render() {
        const { classes } = this.props;
        return (
           
                <Table className={classes.table}>
                    <TableCell >
                        {this.props.reply.writer.id}
                    </TableCell>
                    <TableCell > {this.props.reply.content}</TableCell>
                    <TableCell > {this.props.reply.writeDate}</TableCell>
                </Table>
        );
    }

}

export default withStyles(styles)(ReplyList); 