import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, ListItem, ListItemAvatar, Avatar, ListItemText, Typography,} from '@material-ui/core';
import { IMemberModel } from '../../constance/models';
/**
 * @author:ParkHyeokJoon
 * @since:2018.08.17
 * @version:2018.08.17
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    textFont: {
        fontFamily: "Jua"
    }
})

interface IProps {
    classes: {
        textFont: string;
    }
    member: IMemberModel;
    key: number;
    setEL(event : React.MouseEvent<HTMLInputElement>):void;
}
class Friend extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            open: false            
        }
    }
    public render() {
        const { classes, member } = this.props;
        return (
            <ListItem
                id={"ListItem1" + this.props.key}
                button={true}
                onClick={this.props.setEL}
            >
                <ListItemAvatar>
                    <Avatar
                        src={member.avatar}
                    />
                </ListItemAvatar>
                <ListItemText>
                    <Typography
                        className={classes.textFont}
                    >
                        {member.id}
                    </Typography>
                </ListItemText>
            </ListItem>
        );
    }
}

export default withStyles(style)(Friend);