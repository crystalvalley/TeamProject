import * as React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import EmailIcon from '@material-ui/icons/Email';


/**
 * @author:GilJoonsung
 * @since:2018.09.17
 * @version:2018.09.17
 */


interface IProps{
  alarmCount:number
  
}





class AlarmBadge extends React.Component<IProps>{
  constructor(props: IProps) {
    super(props)
    
  }

  
  public render() {
    
    return (
      <IconButton aria-label="Cart">
        <Badge badgeContent={this.props.alarmCount} color="primary" >
          <EmailIcon />
        </Badge>
      </IconButton>
    );
  }
  
    }
  
export default AlarmBadge;
