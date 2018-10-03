import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import { IMsgModel, IMemberModel, IRoomMemberModel, ROOTURL, IChatModel } from '../../../constance/models';
import ToText from './ToText';
import FromText from './FromText';


const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    }
    chats: IMsgModel[];
    loginedId: IMemberModel;
    profileURL: string;
    roomMembers: IRoomMemberModel[];
    roomId: number,
    chattingLog: IChatModel[],
}
interface IState {
    profiles: {
        [id: string]: string
    }
}
class ChatWrapper extends React.Component<IProps, IState>{
    private scroll: Scrollbars | null;
    constructor(props: IProps) {
        super(props);
        this.state = {
            profiles: {}
        }
    }
    public componentDidMount() {
        let profiles: { [id: string]: string } = {}
        for (const roomMember of this.props.roomMembers) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", ROOTURL + "/resources" + roomMember.member.profileImg);
            xhr.responseType = "blob";
            xhr.addEventListener("load", () => {
                profiles = { ...profiles, [roomMember.member.id]: URL.createObjectURL(xhr.response) }
                this.setState({
                    profiles,
                })
            })
            xhr.send();
        }
    }
    public componentDidUpdate(prevProps: IProps) {
        if (this.props.chats === prevProps.chats) { return }
        this.scroll!.scrollToBottom();
    }
    public render() {
        return (
            <Scrollbars
                ref={(e) => { this.scroll = e }}
                style={{
                    height: "300px",
                    padding: "5px"
                }}
                autoHide={true}
            >
                {
                    this.props.chattingLog.map((log, index) => {
                        if (log.writer === null) {
                            return (
                                <FromText
                                    key={index}
                                    chat={{
                                        sender: {
                                            id: "system msg",
                                            profileImg: ""
                                        },
                                        destination: [],
                                        type: "chat",
                                        data: log.msg,
                                        roomId: this.props.roomId
                                    }}
                                />
                            );
                        }
                        if (log.writer.id === this.props.loginedId.id) {
                            return (
                                <ToText
                                    key={index}
                                    chat={{
                                        sender: log.writer,
                                        destination: [],
                                        type: "chat",
                                        data: log.msg,
                                        roomId: this.props.roomId
                                    }}
                                    profileURL={this.props.profileURL}
                                />
                            );
                        } else {
                            return (
                                <FromText
                                    key={index}
                                    chat={{
                                        sender: log.writer,
                                        destination: [],
                                        type: "chat",
                                        data: log.msg,
                                        roomId: this.props.roomId
                                    }}
                                />
                            );
                        }
                    })
                }
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