import * as React from 'react';
import { ListItem, ListItemText, Menu, MenuItem, Avatar } from "@material-ui/core";
import { IMemberModel, IMsgModel } from '../../../../constance/models';
import axios from 'axios';
import { RouteComponentProps, withRouter } from 'react-router-dom';


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

interface IProps {
    list: string,
    friendInfo: IMemberModel,
    id: IMemberModel
    delFriend(id: string): void,
    sendMsg(sendMessage: IMsgModel): void
    close():void;
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
                    <Avatar src={"http://localhost:8081/resources" + this.props.friendInfo.profileImg} />
                    <ListItemText
                        onClick={this.openMenu}
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
                        <MenuItem onClick={this.visit}>방문하기</MenuItem>
                        <MenuItem onClick={this.openChatting}>채팅하기</MenuItem>
                        <MenuItem onClick={this.delFriend}>친구삭제</MenuItem>
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
        axios.get("http://localhost:8081/chattings/make", {
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