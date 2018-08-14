import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, AppBar, Toolbar, TextField, InputAdornment, List, Divider, Drawer, Typography, ListItem, IconButton, } from '@material-ui/core';
import Search from '@material-ui/icons/Search';

import Done from '@material-ui/icons/Done';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.11
 * @version : 18.08.11
 */

const drawerWidth = 240;
const styles: StyleRulesCallback = (theme: Theme) => ({
  appMain: {
    marginLeft: drawerWidth,
    display: "flex",
    height: "100%",
  },
  Division1: {
    flexBasis: "85%",
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  Division2: {
    flexBasis: "90%",
    display: "flex"
  },
  topSpacing: theme.mixins.toolbar,
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth + "px"
  },
  drawer: {
    width: drawerWidth + "px"
  },
  subBar: {
    width: "100vw",
    border: "1px solid black",
    margin: "5vh"
  }
})

interface IProps {
  classes: {
    appMain: string;
    Division1: string;
    Division2: string;
    topSpacing: string;
    appBar: string;
    drawer: string;
    subBar: string;
  }
}

class AppMain extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { classes } = this.props;
    return (
      <div>
        <AppBar
          position="absolute"
          className={classes.appBar}
        >
          <Toolbar>
            <Typography variant="title" noWrap={true}>
              Permanent drawer
            </Typography>
            <div style={{ width: "60vw" }} />
            <TextField
              label="search keyword"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
          </Toolbar>
        </AppBar>
        <Drawer

          classes={{
            paper: classes.drawer
          }}
          variant="permanent"
          anchor="left"
        >
          <div className={classes.topSpacing} />
          <Divider />
          <List>
            <ListItem button={true}>
              <Typography variant="button">Item1</Typography>
            </ListItem>
            <ListItem button={true}>
              <Typography variant="button">Item2</Typography>
            </ListItem>
            <ListItem button={true}>
              <Typography variant="button">Item3</Typography>
            </ListItem>
          </List>
          <Divider />
          <List>Test Menu Item 2</List>
        </Drawer>
        <div className={classes.topSpacing} />
        <div className={classes.appMain}>
          <Toolbar
            className={classes.subBar}
          >
            <IconButton>
              <Done />
            </IconButton>
            <IconButton>
              <Done />
            </IconButton>
            <IconButton>
              <Done />
            </IconButton>
            <IconButton>
              <Done />
            </IconButton>
          </Toolbar>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(AppMain);
