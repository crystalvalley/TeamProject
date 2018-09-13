import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, Typography, Grow, Paper, IconButton, TextField } from '@material-ui/core';
import { IRoomModel, IMsgModel } from '../../constance/models';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ChatWrapper from './ChattingText/ChatWrapper';

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
        borderRadius: "7.5px",
        textAlign: "right",
        height: "60px"
    },
    nameNfieldBox: {
        display: "inline-block",
        textAlign: "center",
        width: "calc(100% - 48px)",
        paddingLeft: "16px",
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
        nameNfieldBox: string;
    },
    key: number;
    loginedId: string;
    sendMessage(msg: IMsgModel): void;
}

interface IState {
    checked: boolean;
    msg: string;
}

class ChattingName extends React.Component<IProps & IRoomModel, IState>{
    constructor(props: IProps & IRoomModel) {
        super(props);
        this.state = {
            checked: false,
            msg: ""
        }
        this.onCheck = this.onCheck.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
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
                            <ChatWrapper />
                        </Paper>
                    </Grow>
                </div>
                {
                    !this.state.checked ?
                        <Typography
                            className={classes.chatname}
                        >
                            <p className={classes.nameNfieldBox}>
                                {this.props.roomId}
                            </p>
                            <IconButton
                                onClick={this.onCheck}
                                style={{
                                    alignSelf: "right"
                                }}
                            >
                                <ArrowUp />
                            </IconButton>
                        </Typography>
                        :
                        <Typography
                            className={classes.chatname}
                        >
                            <p className={classes.nameNfieldBox}>
                                <TextField
                                    fullWidth={true}
                                    onKeyDown={this.onKeyDown}
                                    onChange={this.onChange}
                                />
                            </p>
                            <IconButton
                                onClick={this.onCheck}
                            >
                                <ArrowDown />
                            </IconButton>
                        </Typography>
                }
            </div>
        );
    }
    private onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            msg: e.currentTarget.value
        })
    }
    private onCheck() {
        const next = !this.state.checked
        this.setState({
            checked: next
        })
    }
    private onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
        // enter키 입력시
        if (e.keyCode === 13) {
            const d = [];
            for (const rmember of this.props.roomMembers) {
                d.push(rmember.member)
            }
            const result: IMsgModel = {
                type: "chat-msg",
                destination: d,
                sender: this.props.loginedId,
                data: this.state.msg
            }
            this.props.sendMessage(result);
            this.setState({
                msg: ""
            })
        }
    }
}

export default withStyles(style)(ChattingName);