import * as React from 'react';
import { IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Axios from 'axios';

/**
 * @author:GilJoonsung
 * @since:2018.09.17
 * @version:2018.09.17
 */


interface IProps {
  count: string
}

interface IState {
  alarmCount: string
}



class AlarmBadge extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props)
    this.state = {
      alarmCount: ''
    }
    this.getAlarmCount = this.getAlarmCount.bind(this)
  }
  public render() {
    
    return (
      <IconButton aria-label="Cart">
        <Badge badgeContent={this.state.alarmCount} color="primary" >
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    );
  }
  private getAlarmCount(){
    Axios.get("http://localhost:8081/alarms/requestAlarms")
      .then((response) => {
        alert("아직 실험")
          
        })
      }
    }
  








export default AlarmBadge;