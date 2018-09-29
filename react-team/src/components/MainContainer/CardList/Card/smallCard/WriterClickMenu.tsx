import * as React from 'react';
import { INetworkStore, withNetworkContext } from '../../../../../contexts/NetworkContext';
import { MenuItem, Menu } from '@material-ui/core';
import { IMemberModel } from '../../../../../constance/models';
import { NavLink } from 'react-router-dom';

interface IProps {
    anchor: HTMLSpanElement | null
    open: boolean
    id: string;
    left: number,
    top: number,
    closeMenu(): void;
}

class WriterClickMenu extends React.Component<IProps & INetworkStore>{
    constructor(props: IProps & INetworkStore) {
        super(props);
        this.addFriend = this.addFriend.bind(this);
        this.delFriend = this.delFriend.bind(this);
        this.addFollow = this.addFollow.bind(this);
        this.unFollow = this.unFollow.bind(this);
        this.checkValue = this.checkValue.bind(this);
        this.addBlock = this.addBlock.bind(this);
    }
    public render() {
        return (
            <Menu
                style={{
                    top: this.props.top + "px",
                    left: this.props.left + "px"
                }}
                anchorEl={this.props.anchor}
                open={this.props.id === this.props.loginedId.id ? false : this.props.open}
                onClose={this.props.closeMenu}
            >
                {
                    this.checkValue(this.props.friendList) ?
                        <MenuItem onClick={this.delFriend}>친구끊기</MenuItem> :
                        <React.Fragment>
                            <MenuItem onClick={this.addFriend}>친구요청</MenuItem>
                            {
                                this.checkValue(this.props.followList) ?
                                    <MenuItem onClick={this.unFollow}>언팔로우</MenuItem> :
                                    <MenuItem onClick={this.addFollow}>팔로우</MenuItem>
                            }
                            <NavLink
                                style={{
                                    textDecoration: "none"
                                }}
                                to={"/personalPage/" + this.props.id}
                            >
                                <MenuItem>
                                    방문하기
                                </MenuItem>
                            </NavLink>
                        </React.Fragment>
                }

                <MenuItem onClick={this.addBlock}>차단</MenuItem>
            </Menu>
        );
    }
    private addFriend() {
        this.props.addFriend(this.props.id);
        this.props.closeMenu();
    }
    private delFriend() {
        this.props.delFriend(this.props.id);
        this.props.closeMenu();
    }
    private addFollow() {
        this.props.addFollow(this.props.id);
        this.props.closeMenu();
    }
    private unFollow() {
        this.props.delFollow(this.props.id);
        this.props.closeMenu();
    }
    private addBlock() {
        this.props.addBlock(this.props.id);
        this.props.closeMenu();
    }
    private checkValue(list: IMemberModel[]): boolean {
        let result: boolean = false;
        for (const member of list) {
            if (member.id === this.props.id) { result = true }
        }
        return result;
    }
}

export default withNetworkContext(WriterClickMenu);