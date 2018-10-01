import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, Typography, Grow, Paper, IconButton, TextField } from '@material-ui/core';
import { IRoomModel, IMsgModel, IMemberModel, ROOTURL } from '../../constance/models';
import ArrowUp from '@material-ui/icons/KeyboardArrowUp';
import ArrowDown from '@material-ui/icons/KeyboardArrowDown';
import ChatWrapper from './ChattingText/ChatWrapper';
import Exit from '@material-ui/icons/HighlightOff';
import axios from 'axios';

const style: StyleRulesCallback = (theme: Theme) => ({
    chatBox: {
        width: "300px",
        marginLeft: "7.5px",
        marginRight: "7.5px",
        textAlign: "center",
    },
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing.unit,
        boxShadow: "1px 1px 2px 2px grey",
        width: "300px",
        padding: "10px"
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
    },
    hide: {
        display: "none"
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
        hide: string;
    },
    key: number;
    loginedId: IMemberModel;
    profileURL: string,
    sendMessage(msg: IMsgModel): void;
}

interface IState {
    open: boolean;
    msg: string;
}

class ChattingName extends React.Component<IProps & IRoomModel, IState>{
    constructor(props: IProps & IRoomModel) {
        super(props);
        this.state = {
            open: false,
            msg: ""
        }
        this.onCheck = this.onCheck.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.endChat = this.endChat.bind(this);
    }
    public render() {
        const { open } = this.state;
        const { classes } = this.props;
        const addSubName = this.state.open ? "" : " " + classes.hide
        let title: string = "";
        for (const m of this.props.roomMembers) {
            if (m.member.id === this.props.loginedId.id) { continue; }
            title += "," + m.member.id
        }
        title += "과의 채팅"
        title = title.substring(1);
        return (
            <div
                className={classes.chatBox}
            >
                <div className={classes.container}>
                    <Grow in={open} >
                        <Paper elevation={4} className={classes.paper + addSubName}>
                            <div>
                                <span>{title}</span>
                                <IconButton
                                    onClick={this.endChat}
                                >
                                    <Exit />
                                </IconButton>
                            </div>
                            <ChatWrapper
                                roomMembers={this.props.roomMembers}
                                profileURL={this.props.profileURL}
                                chats={this.props.chat === undefined ? [] : this.props.chat}
                                loginedId={this.props.loginedId}
                            />
                        </Paper>
                    </Grow>
                </div>
                {
                    !this.state.open ?
                        <Typography
                            className={classes.chatname}
                        >
                            <p className={classes.nameNfieldBox}>
                                {title}
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
                                    value={this.state.msg}
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
        const next = !this.state.open
        this.setState({
            open: next
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
                roomId: this.props.roomId,
                sender: this.props.loginedId,
                data: this.state.msg
            }
            this.props.sendMessage(result);
            this.setState({
                msg: ""
            })
        }
    }
    private endChat() {
        axios.get(ROOTURL + "/chattings/end", {
            params: {
                roomnumber: this.props.roomId
            }
        }).then((response) => {
            return;
        })
    }
}

export default withStyles(style)(ChattingName);