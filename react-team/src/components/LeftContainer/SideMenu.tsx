import * as React from 'react';
import { Theme, withStyles, Divider, IconButton, List, ListItem, ListItemIcon, ListItemText, Drawer } from '@material-ui/core';
import Create from '@material-ui/icons/Create';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import WhatsHot from "@material-ui/icons/Whatshot";
import News from "@material-ui/icons/Public";
import classNames from 'classnames';
import Personal from './Personal';
import Scrollbars from 'react-custom-scrollbars';
import Group from '@material-ui/icons/Group';
import Face from "@material-ui/icons/Face";
import { sideMenuStyle } from './Styles/SideMenuStyle';



/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.17
 * 
 */

interface IProps {
    classes: {
        drawerPaper: string,
        drawerPaperClose: string,
        toolbar: string;
        avatar: string;
    }
    theme: Theme;
    open: boolean;
    handleClose: () => void;
}


class SideMenu extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const { classes, theme } = this.props
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
                }}
                open={this.props.open}
            >
                <Scrollbars
                    autoHide={true}
                >
                    <div className={classes.toolbar}>
                        <IconButton onClick={this.props.handleClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </div>
                    <Divider />
                    {/* 개인메뉴 */}
                    <Personal open={this.props.open} />
                    <List>
                        {/* 글쓰기 친구 그룹 */}
                        <ListItem button={true}>
                            <ListItemIcon>
                                <Create />
                            </ListItemIcon>
                            <ListItemText primary="Create" />
                        </ListItem>
                        <ListItem button={true}>
                        
                            <ListItemIcon>
                                <Face />
                            </ListItemIcon>
                            <ListItemText primary="Friends" />

                        

                        </ListItem>
                        <ListItem button={true}>
                            <ListItemIcon>
                                <Group />
                            </ListItemIcon>
                            <ListItemText primary="Group" />
                        </ListItem>
                    </List>
                    <Divider />
                    <List>
                        {/* 기타 등 */}
                        <ListItem button={true}>
                            <ListItemIcon>
                                <WhatsHot />
                            </ListItemIcon>
                            <ListItemText primary="Hot" />
                        </ListItem>
                        <ListItem button={true}>
                            <ListItemIcon>
                                <News />
                            </ListItemIcon>
                            <ListItemText primary="News" />
                        </ListItem>
                    </List>
                </Scrollbars>
            </Drawer>
        );
    }
}

export default withStyles(sideMenuStyle)(SideMenu);