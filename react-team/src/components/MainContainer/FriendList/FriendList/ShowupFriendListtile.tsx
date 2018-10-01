import * as React from 'react';
import { ListItem, ListItemText, Menu, MenuItem, Avatar, ListItemIcon } from "@material-ui/core";
import { IMemberModel, IMsgModel, ROOTURL } from '../../../../constance/models';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ChatBubble from '@material-ui/icons/ChatBubble';
import Home from '@material-ui/icons/Home';
import Delete from '@material-ui/icons/PersonAddDisabled'
/**
 * @author:Kim MinJeong
 * @since:2018.08.28
 * @version:2018.09.08
 * 사용자가 팔로우하는 친구목록(왼쪽)
 */
/**
 * @author:ParkHyeokJoon
 * @version:2018.09.19
 */
/**
 * @author:Kim MinJeong
 * @version:2018.09.30
 * MENUS에 어울리는 아이콘 넣어봄
 */

interface IProps {
    list: string,
    friendInfo: IMemberModel,
    id: IMemberModel
    delFriend(id: string): void,
    sendMsg(sendMessage: IMsgModel): void
    close(): void;
}
interface IState {
    open: boolean;
}

class ShowupFriendListtile extends React.Component<IProps & RouteComponentProps<{}>, IState>{
    private anchor: HTMLSpanElement | null;
    constructor(props: IProps & RouteComponentProps<{}>) {
        super(props);
        this.state = {
            open: false
        };
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.delFriend = this.delFriend.bind(this);
        this.openChatting = this.openChatting.bind(this);
        this.visit = this.visit.bind(this);
    }

    public render() {
        const { } = this.props;

        return (
            <div>
                <ListItem>
                    <Avatar src={ROOTURL + "/resources" + this.props.friendInfo.profileImg} />
                    <ListItemText
                        onClick={this.openMenu}
                        style={{
                            fontFamily: "Roboto,sans-serif",
                        }}
                    >
                        <span ref={(element) => { this.anchor = element }} />
                        {this.props.friendInfo.id}
                    </ListItemText>
                    <Menu
                        style={{
                            top: "60px"

                        }}
                        anchorEl={this.anchor}
                        open={this.state.open}
                        onClose={this.closeMenu}
                    >
                        <MenuItem onClick={this.visit}>
                            <ListItemIcon>
                                <Home />
                            </ListItemIcon>
                            방문하기
                        </MenuItem>
                        <MenuItem onClick={this.openChatting}>
                            <ListItemIcon>
                                <ChatBubble />
                            </ListItemIcon>
                            채팅하기
                        </MenuItem>
                        <MenuItem onClick={this.delFriend}>
                            <ListItemIcon>
                                <Delete />
                            </ListItemIcon>
                            친구삭제
                        </MenuItem>
                    </Menu>
                </ListItem>
            </div>
        )
    }
    private openMenu() {
        this.setState({
            open: true
        })
    }
    private closeMenu() {
        this.setState({
            open: false
        })
    }
    private delFriend() {
        this.props.delFriend(this.props.friendInfo.id);
        this.closeMenu();
    }
    private openChatting() {
        axios.get(ROOTURL + "/chattings/make", {
            params: {
                target: this.props.friendInfo.id
            }
        })
        this.closeMenu();
    }
    private visit() {
        this.props.history.push("/personalPage/" + this.props.friendInfo.id);
        this.closeMenu();
        this.props.close();
    }
}
export default withRouter(ShowupFriendListtile);