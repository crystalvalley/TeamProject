import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Menu, MenuItem, IconButton, Typography } from '@material-ui/core';
import Call from '@material-ui/icons/Call';
import Contacts from "@material-ui/icons/Contacts";
import Delete from "@material-ui/icons/PersonAddDisabled";
import Mail from "@material-ui/icons/Mail";
/**
 * @author : ParkHyeokJoon
 * @since:2018.08.17
 * @version:2018.08.17
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    menu: {
        marginLeft: "2vw"

    }
})

interface IProps {
    classes: {
        menu: string;
    }
    anchorEL?: HTMLElement;
    open: boolean;
    handleClose(): void;
}

class FriendMenu extends React.Component<IProps>{
    public render() {
        const { handleClose } = this.props;
        return (
            <Menu
                className={this.props.classes.menu}
                anchorEl={this.props.anchorEL}
                open={this.props.open}
                onClose={handleClose}
            >
                <MenuItem
                    onClick={handleClose}
                >
                    <IconButton>
                        <Call />
                    </IconButton>
                    <Typography>
                        Chat
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                >
                    <IconButton>
                        <Contacts />
                    </IconButton>
                    <Typography>
                        Contacts
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                >
                    <IconButton>
                        <Delete />
                    </IconButton>
                    <Typography>
                        Delete
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleClose}
                >
                    <IconButton>
                        <Mail />
                    </IconButton>
                    <Typography>
                        Send Card
                    </Typography>
                </MenuItem>
            </Menu>
        );
    }
}

export default withStyles(style)(FriendMenu);