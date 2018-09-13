import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, Typography, Grow, Paper, IconButton } from '@material-ui/core';
import { IRoomModel } from '../../constance/models';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';

const style: StyleRulesCallback = (theme: Theme) => ({
    chatBox: {
        width: "300px",
        marginLeft: "7.5px",
        marginRight: "7.5px",
        textAlign: "center"
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing.unit,
        boxShadow: "1px 1px 2px 2px grey",
        width: "300px"
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
    chatname: {
        bottom: 0,
        boxShadow: "1px 1px 2px 2px grey",
        borderRadius: "7.5px"
    }
})

interface IProps {
    classes: {
        chatBox: string;
        container: string;
        paper: string;
        svg: string;
        polygon: string;
        chatname: string;
    },
    key: number;
}

interface IState {
    checked: boolean;
}

class ChattingName extends React.Component<IProps & IRoomModel, IState>{
    constructor(props: IProps & IRoomModel) {
        super(props);
        this.state = {
            checked: false
        }
        this.onCheck = this.onCheck.bind(this);
    }
    public render() {
        const { checked } = this.state;
        const { classes } = this.props;
        return (
            <div
                className={classes.chatBox}
            >
                <div className={classes.container}>
                    <Grow in={checked}>
                        <Paper elevation={4} className={classes.paper}>
                            {this.props.key}<br />
                            채팅창<br />
                            채팅창<br />
                            채팅창<br />
                            채팅창<br />
                            채팅창<br />
                            채팅창<br />
                            채팅창<br />
                        </Paper>
                    </Grow>
                </div>
                {
                    this.state.checked ?
                        <Typography
                            className={classes.chatname}
                        >
                            {this.props.roomId}
                            <IconButton>
                                <ArrowUp />
                            </IconButton>
                        </Typography>
                        :
                        <Typography
                            className={classes.chatname}
                        >
                            {this.props.roomId}
                            <IconButton>
                                <ArrowDown />
                            </IconButton>
                        </Typography>
                }
            </div>
        );
    }
    private onCheck() {
        const next = !this.state.checked
        this.setState({
            checked: next
        })
    }
}

export default withStyles(style)(ChattingName);