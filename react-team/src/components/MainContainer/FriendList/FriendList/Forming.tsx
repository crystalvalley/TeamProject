import * as React from 'react';
import { ListItem, ListItemText, Avatar } from "@material-ui/core";
import { IMemberModel } from '../../../../constance/models';
import WriterClickMenu from '../../CardList/Card/smallCard/WriterClickMenu';

/**
 * @author:Kim MinJeong
 * @since:2018.08.28
 * @version:2018.08.30
 * 사용자가 팔로우하는 친구목록(왼쪽)
 */

interface IProps {
    list: string,
    friendInfo: IMemberModel,
   
}
interface IState {
    open: boolean;
}


class Forming extends React.Component<IProps, IState>{
    private anchor: HTMLSpanElement | null;


    public render() {
        const { } = this.props;

        this.state = {
            open: false
        };
        
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu=this.closeMenu.bind(this);

        return (
            <div>
                <ListItem>
                    <Avatar src={this.props.friendInfo.profileImg} />
                    <ListItemText
                        onClick={this.openMenu}
                       
                    >   
                        <span ref={(element) => { this.anchor = element }} />
                        {this.props.friendInfo.id}
                    </ListItemText>
                  
                    <WriterClickMenu 
                    anchor={this.anchor}
                    open={this.state.open}
                    closeMenu={this.closeMenu}
                    id={this.props.friendInfo.id}
                />
                </ListItem>         
            </div>
        )
    }
    private openMenu() {
        this.setState({          
            open: true
        })
        alert(this.state.open)
    }
    private closeMenu() {
        this.setState({
            open: false
        })
    }
}
export default (Forming);