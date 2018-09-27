import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import { IMsgModel, IMemberModel, IRoomMemberModel } from '../../../constance/models';
import ToText from './ToText';
import FromText from './FromText';


const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    }
    chats: IMsgModel[];
    loginedId: IMemberModel;
    profileURL:string;
    roomMembers : IRoomMemberModel[];
}
interface IState{
    profiles:{
        [id:string]:string
    }
}
class ChatWrapper extends React.Component<IProps,IState>{
    private scroll : Scrollbars|null;
    constructor(props:IProps){
        super(props);
        this.state = {
            profiles:{}
        }
    }
    public componentDidMount(){
        let profiles: {[id:string]:string} = {}
        for (const roomMember of this.props.roomMembers) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", "http://localhost:8081/resources" +  roomMember.member.profileImg);
            xhr.responseType = "blob";
            xhr.addEventListener("load", () => {
                profiles = {...profiles,[roomMember.member.id]:URL.createObjectURL(xhr.response)}                
                this.setState({
                    profiles,
                })
            })
            xhr.send();
        }
    }
    public componentDidUpdate(prevProps:IProps){
        if(this.props.chats===prevProps.chats){return}
        this.scroll!.scrollToBottom();
    }
    public render() {
        return (
            <Scrollbars
                ref={(e)=>{this.scroll = e}}
                style={{
                    height: "300px"
                }}
                autoHide={true}
            >
                {
                    this.props.chats.map((chat, index) => {
                        if (chat.sender.id === this.props.loginedId.id) {
                            return (
                                <ToText key={index} chat={chat} profileURL={this.props.profileURL} />
                            );
                        } else {
                            return (
                                <FromText key={index} chat={chat} />
                            );
                        }
                    })
                }
            </Scrollbars>
        );
    }
}

export default withStyles(style)(ChatWrapper);