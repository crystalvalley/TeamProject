import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import MusicNote from '@material-ui/icons/MusicNote';
import { NavLink } from 'react-router-dom';

const style: StyleRulesCallback = (theme: Theme) => ({
    // 클래스 : 속성들
    linkClass: {
        textDecoration: "none"
    }
})

interface IProps {
    classes: {
        linkClass: string;
    }
}

class Test extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        const {classes} = this.props;
        return (
            <NavLink
                className={classes.linkClass}
                to="/test"
            >
                <ListItem button={true}>
                    <ListItemIcon>
                        <MusicNote />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </ListItem>
            </NavLink>
        );
    }
}
export default withStyles(style)(Test);
