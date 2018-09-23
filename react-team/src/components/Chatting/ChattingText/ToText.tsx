import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Avatar } from '@material-ui/core';
import { IMsgModel } from '../../../constance/models';


const style: StyleRulesCallback = (theme: Theme) => ({
    block: {
        alignItems: "center",
        verticalAlign: "middle",
        display: "flex",
        flexDirection: "row-reverse",
    },
    avatar:{
        width: "30px", 
        height: "30px",
        border:"1px solid black"
    },
    avatarBlock:{
        display : "inline-block",
        textAlign:"center"
    },
    msgBox:{
        marginRight: "1em",
         height: "100%", 
         verticalAlign: "middle", 
         display: "inline-block" ,
         padding:"5px",
         borderRadius:"5px",
         boxShadow:"1px 1px 2px 2px grey"
    }
})

interface IProps {
    classes: {
        block: string;
        avatar:string;
        avatarBlock:string;
        msgBox:string;
    }
    chat: IMsgModel;
    profileURL:string;
}

class ToText extends React.Component<IProps>{
    public render() {
        const { chat } = this.props;
        const {classes }=this.props;
        return (
            <div className={classes.block}>
                <div className={classes.avatarBlock} >
                    <Avatar src={this.props.profileURL} className={classes.avatar} />
                    {chat.sender.id}
                </div>
                <div className={classes.msgBox}>
                    {chat.data}
                </div>
            </div>
        );
    }
}

export default withStyles(style)(ToText);