import * as React from "react";
import { Menu, StyleRulesCallback, Theme, withStyles, MenuList, MenuItem } from "@material-ui/core";
import AlarmBadge from "../TopContainer/AlarmBadge";
import { IAlarmModel } from "../../constance/models";
import Axios from "axios";
import FriConfirm from "../TopContainer/FriConfirm";


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
    marginRight: theme.spacing.unit * 3,
    
  },
  
});


interface IProps {
  classes: {
    root: string,
    paper: string,
    menu:string
  }
  


}

interface IState {
  anchorEl: any
  alarms: IAlarmModel[]
  open: boolean
  confirmOpen:boolean
}
class AlarmPage extends React.Component<IProps, IState>{
  
  private divAnchor: HTMLSpanElement | null;

  private dummy=[
    {"actor_id":"AAA", checked:false, mentioned:true},{"actor_id":"BBB", checked:false, mentioned:false}
  ]
  constructor(props: IProps) {

    super(props)
    this.state = {
      anchorEl: "",
      alarms: [],
      open: false,
      confirmOpen:false
    }



    this.handleClose = this.handleClose.bind(this)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.confrimOpen = this.confrimOpen.bind(this)
    this.confirmClose = this.confirmClose.bind(this)
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
      open: true
      
    })
    
  }
  public closeMenu(){
      this.setState({open:false})
  }

  public confrimOpen(){
    this.setState({confirmOpen:true})
  }
  public confirmClose(){
    this.setState({confirmOpen:false})
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
          <span onClick={this.openMenu} ref={(element) => { this.divAnchor = element }}><AlarmBadge  alarmCount={this.state.alarms.length} /></span>
        </div>
        <Menu
          className={this.props.classes.menu}
          id="menuList"
          anchorEl={this.divAnchor}
          // open={this.state.menuStatue} 이거 계속 여러 방법으로 해도 안되네.. 이거랑 리스트 anchor에 붙히는거 계속 안되서 ㅠ 시간 그만 보내야 할 듯....
          open={this.state.open}
          onClose={this.closeMenu}
        >
         
         <MenuList>
            {
              this.dummy.map((alarm, index) => {
                return (
                  !alarm.checked && alarm.mentioned === true ?
                    <MenuItem key={index}>{alarm.actor_id + "님으로 부터 멘션"}</MenuItem> :
                    <MenuItem key={index}>{alarm.actor_id + "님으로 부터 친구요청"}<FriConfirm/></MenuItem>
                );
              })}<br />
            </MenuList>
        </Menu>
        
      </div>
    );
  }
}

export default withStyles(styles)(AlarmPage);
