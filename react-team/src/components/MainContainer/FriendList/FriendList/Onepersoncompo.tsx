import * as React from 'react';
import { ListItem, ListItemText, Avatar } from "@material-ui/core";
import { IMemberModel } from '../../../../constance/models';

/**
 * @author:Kim MinJeong
 * @since:2018.08.28
 * @version:2018.09.08
 * 사용자가 팔로우하는 친구목록(왼쪽)
 */
/**
 * @author:ParkHyeokJoon
 * @version:2018.09.08
 */



class Onepersoncompo extends React.Component<IMemberModel>{
    
    constructor(props: IMemberModel) {
        super(props);
    }

    public render() {
        const { } = this.props;

        return (
            <div>
                <ListItem>
                    <Avatar src={this.props.profileImg} />
                    <ListItemText
                    >
                    {this.props.id}
                    </ListItemText>                    
                </ListItem>
            </div>
        )
    }
}
export default (Onepersoncompo);