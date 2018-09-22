import * as React from "react";
import { Menu, MenuItem, MenuList, StyleRulesCallback, Theme, withStyles } from "@material-ui/core";
import AlarmBadge from "../TopContainer/AlarmBadge";
import { IAlarmModel } from "../../constance/models";
import Axios from "axios";


// 일단 알람 페이지랑 알람 뱃지랑 합쳐서 해야 할 것 같다는 생각이 들었고
// 내일 와서 이거는 해야겠다. 알람 페이지를 props 값을 바꿔 주는 것이 생각보다 쉽지 않다.

/**
 * @author:GilJoonsung
 * @since:2018.09.20
 * @version:2018.09.22
 */

const styles: StyleRulesCallback = (theme: Theme) => ({
  root: {
    display: 'flex',
  },
  paper: {
    marginRight: theme.spacing.unit * 2,
  },
});


interface IProps {
  classes: {
    root: string,
    paper: string
  }
  open: boolean


}

interface IState {
  anchorEl: any
  alarms: IAlarmModel[]
  menuStatue: boolean
}
class AlarmPage extends React.Component<IProps, IState>{
  
  private divAnchor: HTMLSpanElement | null;
  constructor(props: IProps) {

    super(props)
    this.state = {
      anchorEl: "",
      alarms: [],
      menuStatue: false
    }



    this.handleClose = this.handleClose.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.openMenu = this.openMenu.bind(this)
  };


  public handleClose() {
    this.setState({ anchorEl: "" })
  }

  public componentDidMount() {
    Axios.get("http://localhost:8081/alarms/requestAlarms")
      .then((response) => {
        this.setState({
          alarms: response.data
        })
      })
  }
  public openMenu(){
    this.setState({
      menuStatue: true
    })
    
    
  }

  public render() {
    // const { anchorEl } = this.state;
    // const divAnchor = document.getElementById("anchor")

    return (
      <div>
        {/* <Button
              // aria-owns={anchorEl ? 'simple-menu' : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              Open Menu
            </Button> */}
        <div id="anchor" > {/* ref={ref => { this.state.mydiv=ref}}  */}
          <span ref={(element) => { this.divAnchor = element }}><AlarmBadge  alarmCount={this.state.alarms.length} /></span>
        </div>
        <Menu
          id="menuList"
          anchorEl={this.divAnchor}
          // open={this.state.menuStatue} 이거 계속 여러 방법으로 해도 안되네.. 이거랑 리스트 anchor에 붙히는거 계속 안되서 ㅠ 시간 그만 보내야 할 듯....
          open={false}
          onClose={this.handleClose}
        >
          <MenuList>
            {
              this.state.alarms.map((alarm, index) => {
                return (
                  !alarm.checked && alarm.mentioned === true ?
                    <MenuItem key={index}>{alarm.actor_id.id + "님으로 부터 멘션"}</MenuItem> :
                    <MenuItem key={index}>{alarm.actor_id.id + "님으로 부터 친구요청"}</MenuItem>
                );
              })}<br />
          </MenuList>
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(AlarmPage);
