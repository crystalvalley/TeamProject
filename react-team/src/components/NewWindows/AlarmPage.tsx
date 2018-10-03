import * as React from "react";
import { Menu, StyleRulesCallback, Theme, withStyles, MenuList, MenuItem, IconButton } from "@material-ui/core";
import AlarmBadge from "../TopContainer/AlarmBadge";
import Axios from "axios";
import FriConfirm from "../TopContainer/FriConfirm";
import { ILoginStore, withLoginContext } from "../../contexts/LoginContext";
import BigCard from "../MainContainer/CardList/Card/bigCard/BigCard";
import { ROOTURL, ICardModel } from "../../constance/models";




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
  },

}

interface IState {
  anchorEl: any
  confirmOpen: boolean
  card?: ICardModel
  bigCardOpen: boolean
  alarmOpen: boolean;

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
      confirmOpen: false,
      bigCardOpen: false,
      alarmOpen: false

    }
    this.handleClose = this.handleClose.bind(this)
    this.confrimOpen = this.confrimOpen.bind(this)
    this.confirmClose = this.confirmClose.bind(this)
    this.getBoards = this.getBoards.bind(this)
    this.bigCardOpen = this.bigCardOpen.bind(this)
    this.bigCardClose = this.bigCardClose.bind(this)
    this.closeAlarm = this.closeAlarm.bind(this);
    this.openAlarm = this.openAlarm.bind(this);

  };

  public getBoards(aid: number, bid: number) {
    Axios.get(ROOTURL + "/boards/getByBoardNum", {
      params: {
        alaramId: aid,
        boardId: bid
      }
    }
    ).then((response) => {
      this.setState({
        card: response.data,
      })
    })

  }

  public handleClose() {
    this.setState({ anchorEl: "" })
  }
  public confrimOpen() {
    this.setState({ confirmOpen: true })
  }
  public confirmClose() {
    this.setState({ confirmOpen: false })
  }

  public bigCardClose() {
    this.setState({ bigCardOpen: false })
  }

  public bigCardOpen(num: number) {
    this.setState({ bigCardOpen: true })

  }

  public render() {
    return (
      <React.Fragment>
        <IconButton
          onClick={
            this.state.alarmOpen ? this.closeAlarm : this.openAlarm
          }
        >
          <span ref={(element) => { this.divAnchor = element }} />
          <AlarmBadge alarmCount={this.props.alarms.length} />
        </IconButton>
        <Menu
          className={this.props.classes.menu}
          id="menuList"
          anchorEl={this.divAnchor}
          open={this.state.alarmOpen}
          onClose={this.closeAlarm}
        >
          <MenuList>
            {
              this.props.alarms.map((alarm, index) => {
                const handler = () => { this.getBoards(alarm.alarmId, alarm.board.id) }
                return (
                  alarm.mentioned === true ?
                    <MenuItem onClick={handler} key={index}>{alarm.actor_id.id + "님으로 부터 멘션"} </MenuItem> :
                    <MenuItem key={index}>{alarm.actor_id.id + "님으로 부터 친구요청"}
                      <FriConfirm
                        alarmId={alarm.alarmId}
                        target={alarm.actor_id.id}
                      />
                    </MenuItem>
                );
              })
            }
            <br />
          </MenuList>
        </Menu>
        {
          this.state.card ?
            <BigCard
              card={this.state.card}
              open={this.state.bigCardOpen}
              onClose={this.bigCardClose}
            /> : ""
        }
      </React.Fragment>
    );
  }
  private openAlarm() {
    this.setState({
      alarmOpen: true
    })
  }
  private closeAlarm() {
    this.setState({
      alarmOpen: false
    })
  }
}

export default withLoginContext(withStyles(styles)(AlarmPage));
