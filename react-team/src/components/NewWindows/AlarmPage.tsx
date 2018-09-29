import * as React from "react";
import { Menu, StyleRulesCallback, Theme, withStyles, MenuList, MenuItem } from "@material-ui/core";
import AlarmBadge from "../TopContainer/AlarmBadge";
import { ICardModel } from "../../constance/models";
import Axios from "axios";
import FriConfirm from "../TopContainer/FriConfirm";
import { ILoginStore, withLoginContext } from "../../contexts/LoginContext";



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
    menu: string
  }
}

interface IState {
  anchorEl: any
  open: boolean
  confirmOpen: boolean
  board?: ICardModel
}
class AlarmPage extends React.Component<IProps & ILoginStore, IState>{
  private divAnchor: HTMLSpanElement | null;
  // private dummy=[
  //   {"actor_id":"testid1", checked:false, mentioned:true, "alarmId":"1"},{"actor_id":"testid1", checked:false, mentioned:false, "alarmId":"1"}
  // ]
  constructor(props: IProps & ILoginStore) {
    super(props)
    this.state = {
      anchorEl: "",
      open: false,
      confirmOpen: false,
      board: undefined
    }
    this.handleClose = this.handleClose.bind(this)
    this.openMenu = this.openMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
    this.confrimOpen = this.confrimOpen.bind(this)
    this.confirmClose = this.confirmClose.bind(this)
    this.getBoards = this.getBoards.bind(this)
  };
  public getBoards() {
    Axios.get("http://localhost:8081/boards/getByBoardNum")
      .then((response) => {
        this.setState({
          board: response.data
        })
      })
  }

  public handleClose() {
    this.setState({ anchorEl: "" })
  }
  public openMenu() {
    this.setState({
      open: true
    })

  }
  public closeMenu() {
    this.setState({ open: false })
  }

  public confrimOpen() {
    this.setState({ confirmOpen: true })
  }
  public confirmClose() {
    this.setState({ confirmOpen: false })
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
          <span onClick={this.openMenu} ref={(element) => { this.divAnchor = element }}><AlarmBadge alarmCount={this.props.alarms.length} /></span>
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
              this.props.alarms.map((alarm, index) => {
                return (
                  alarm.mentioned === true ?
                    <MenuItem onClick={this.getBoards} key={index}>{alarm.actor_id.id + "님으로 부터 멘션"}</MenuItem> :
                    <MenuItem key={index}>{alarm.actor_id.id + "님으로 부터 친구요청"}<FriConfirm alarmId={alarm.alarmId} target={alarm.actor_id.id} /></MenuItem>
                );
              })
            }
            <br />
          </MenuList>
        </Menu>
      </div>
    );
  }
}

export default withLoginContext(withStyles(styles)(AlarmPage));
