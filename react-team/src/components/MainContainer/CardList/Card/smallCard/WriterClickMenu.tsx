import * as React from 'react';
import { IFriendStore, withFriendContext } from '../../../../../contexts/FriendContext';
import { MenuItem, Menu } from '@material-ui/core';

interface IProps{
    anchor : HTMLSpanElement|null
    open:boolean
    id:string;
    closeMenu():void;
}

class WriterClickMenu extends React.Component<IProps&IFriendStore>{
    constructor(props:IProps&IFriendStore){
        super(props);
        this.add = this.add.bind(this);
        
    }
    public render(){
        return(
            <Menu
                style={{
                    top:"60px"
                }}
                anchorEl={this.props.anchor}
                open={this.props.open}
                onClose={this.props.closeMenu}
            >
                <MenuItem onClick={this.add}>친구요청</MenuItem>
                <MenuItem onClick={this.props.closeMenu}>팔로우</MenuItem>
                <MenuItem onClick={this.props.closeMenu}>차단</MenuItem>
            </Menu>
        );
    }
    private add(){
        this.props.addFriend(this.props.id);
        this.props.closeMenu();
    }
}

export default withFriendContext(WriterClickMenu);