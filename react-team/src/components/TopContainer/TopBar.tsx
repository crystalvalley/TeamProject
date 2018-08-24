import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar, AppBar, Divider } from '@material-ui/core';

import classNames from 'classnames';
import SearchField from './SearchField';
import { withVoice, IVoiceStore } from '../../contexts/VoiceRecogContext';

/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.24
 * 
 */
const styles: StyleRulesCallback = (theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
})

interface IProps {
  classes: {
    appBar: string;
    appBarShift: string;
    menuButton: string;
    hide: string;
    secondaryToolbar: string;
  }
}

interface IState {
  searchKeyword: string;
}

class TopBar extends React.Component<IProps & IVoiceStore, IState> {
  constructor(props: IProps & IVoiceStore) {
    super(props);
    this.state = {
      searchKeyword: ""
    }
    this.onChange = this.onChange.bind(this);
  }

  public render() {
    const { classes } = this.props
    return (
      <AppBar
        position="absolute"
        className={classNames(classes.appBar)}
      >
        <Toolbar>
          <span>
            {this.props.inputValue}
          </span>
          <SearchField
            onChange={this.onChange}
          />
        </Toolbar>
        <Divider />
        <Toolbar
          variant="dense"
        >
          test
        </Toolbar>
      </AppBar>
    );
  }
  private onChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({
      searchKeyword: event.currentTarget.value
    })
  }
}

export default withVoice(withStyles(styles)(TopBar));