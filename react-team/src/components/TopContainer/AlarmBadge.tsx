import * as React from 'react';
import { IconButton, Badge, StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';


/**
 * @author:GilJoonsung
 * @since:2018.09.17
 * @version:2018.09.17
 */

const styles:StyleRulesCallback = (theme:Theme) => ({
  badge: {
    color:'primary',
    top: 1,
    right: -3,
    // The border color match the background color.
    border: `1px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
    }`,
  },
});



interface IProps{
  classes:{
    badge:string
  }
  alarmCount:number
  
}





class AlarmBadge extends React.Component<IProps>{
  constructor(props: IProps) {
    super(props)
    
  }

  
  public render() {
    
    return (
      <IconButton aria-label="Cart">
        <Badge className={this.props.classes.badge} badgeContent={this.props.alarmCount} color="primary" >
          <EmailIcon />
        </Badge>
      </IconButton>
    );
  }
  
    }
  
export default withStyles(styles)(AlarmBadge);
