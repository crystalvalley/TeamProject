import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Avatar } from '@material-ui/core';
import { IMsgModel, ROOTURL } from '../../../constance/models';


const style: StyleRulesCallback = (theme: Theme) => ({
    block: {
        alignItems: "center",
        verticalAlign: "middle",
        display: "flex",
        flexDirection: "row",
    },
    avatar: {
        width: "30px",
        height: "30px",
        border: "1px solid black"
    },
    avatarBlock: {
        display: "inline-block"
    },
    msgBox: {
        marginRight: "1em",
        height: "100%",
        verticalAlign: "middle",
        display: "inline-block",
        padding: "5px",
        borderRadius: "5px",
        boxShadow: "1px 1px 2px 2px grey"
    }
})

interface IProps {
    classes: {
        block: string;
        avatar: string;
        avatarBlock: string;
        msgBox: string;
    }
    chat: IMsgModel;
}

class FromText extends React.Component<IProps>{
    public render() {
        const { chat } = this.props;
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div style={{ textAlign: "left", margin: "3px" }}>
                    {chat.sender.id}
                </div>
                <div className={classes.block}>
                    <div className={classes.avatarBlock} >
                        {
                            this.props.chat.sender.id === "system msg" ?
                                "" :
                                <Avatar src={chat.sender.profileImg === undefined ? "" : ROOTURL+"/resources" + chat.sender.profileImg} className={classes.avatar} />
                        }
                    </div>
                    <div className={classes.msgBox}>
                        {
                            this.props.chat.sender.id === "system msg" ?
                                chat.data + "님이 채팅방을 나갔습니다." :
                                chat.data
                        }
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withStyles(style)(FromText);