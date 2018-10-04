
import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FilledFavoriteIcon from "@material-ui/icons/Favorite";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from 'axios';
import { EditorState, convertFromRaw, Editor, convertToRaw, ContentState } from 'draft-js';
import { Button, Dialog, DialogTitle, DialogActions, } from '@material-ui/core';
import Axios from 'axios';
import { ICardModel, IReplyModel, ROOTURL } from '../../../../../constance/models';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
import EmotionBox from '../smallCard/EmotionBox';
import Scrollbars from 'react-custom-scrollbars';
import WriterClickMenu from '../smallCard/WriterClickMenu';
import ReplyEditor from './ReplyEditor';
import ImageViewer from './ImageViewerForBig';
import ReplyList from './ReplyList';
import Delete from "@material-ui/icons/Delete";



/**
 * @author:Joonsung Gil
 * @since:2018.08.29
 * @version:2018.08.29
 * 
 */
/**
 * 디자인 수정및 연결
 * 댓글 받아오기
 * @author:MinJu Cha
 * @version:2018.9.7
 * 
 */
/**
 * CardHeader수정 및 Menu붙임
 * @author : ParkHyeokJoon
 * @version : 2018.09.09
 */

// flex로 한줄로맞추고 같은 height로 맞춤 
const styles: StyleRulesCallback = (theme: Theme) => ({
  card: {
    flexBasis: '250%',
    width: "150vh",
    height: "80vh",
    borderRadius: "50px",
    display: "flex",
    flexDirection: "column"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9 
  },
  actions: {
    flexBasis: '50%'
  },
  avatar: {
    backgroundColor: red[500]
  },
  entireDiv: {
    display: "flex"
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    padding: "30px",

  },
  content: {
    width: "100%",
    padding: "30px",
  },
  img: {
    height: "100%",
    width: "90%"
  },
  input: {
    display: 'none',
  },
  replyBox: {
    width: "100%",
    padding: "20px",
    alignItems: "center",
  },
  replyText: {
    width: "60%",
    padding: "30px",
  },
  replyBtn: {
    padding: "10px",
  },
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  main: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1
  },
  left: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flexBasis: "45%"
  },
  right: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "55%",
    padding: "10px"
  },
  button: {
    border: '1px solid #ced4da',
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    borderColor: '#80bdff',
  },
  tablebox: {
    height: "100%",
  },
  hi: {
    maxHeight: "600px",
    height: "430px",
    overflowY: "hidden",
    overflowX: "auto",
  },
  font: {
    fontFamily: "Roboto,sans-serif",
  }
});

interface IProps {
  classes: {
    card: string;
    media: string;
    actions: string;
    avatar: string;
    entireDiv: string;
    imageContainer: string;
    content: string;
    img: string;
    input: string;
    replyBox: string;
    replyText: string;
    replyBtn: string;
    root: string;
    table: string;
    main: string;
    left: string;
    right: string;
    button: string;
    tablebox: string;
    hi: string;
    font: string;
  }
  favorited: boolean;
  // listName: string;
  // id: string;
  // scrollEnd(listName:string):void;
  card: ICardModel;
  boardRefresh():void;
  addFavorite(): void;
}

interface IState {
  editorState: EditorState;
  replyContent: EditorState;
  replys: IReplyModel[]
  open: boolean;
  firstLoad: boolean;
  dialogOpen: boolean;
}

class RecipeReviewCard extends React.Component<IProps, IState> {
  // private div: HTMLDivElement | null;
  private scroll: Scrollbars | null;
  private imgWidth: HTMLDivElement | null;
  private anchor: HTMLSpanElement | null;
  private tableWidth: HTMLDivElement | null;
  constructor(props: IProps) {
    super(props)
    this.state = {
      replyContent: EditorState.createEmpty(SNSDecorator),
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.card.content)), SNSDecorator),
      replys: [],
      open: false,
      firstLoad: true,
      dialogOpen: false
    }
    this.editorChange = this.editorChange.bind;
    this.doChangeReply = this.doChangeReply.bind(this);
    this.submit = this.submit.bind(this);
    this.writerMenuOpen = this.writerMenuOpen.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.getReply = this.getReply.bind(this);
    this.openDialog = this.openDialog.bind(this);
    this.agree = this.agree.bind(this);
    this.disAgree = this.disAgree.bind(this);
    this.getReply();
  }

  public render() {
    const { classes, card } = this.props;
    return (
      /* 모달 눌렀을 때 전체의 오른쪽 모습 */
      <Card className={classes.card}>
        <CardHeader
          classes={{
            title: classes.font
          }}
          avatar={
            <Avatar
              className={classes.avatar}
              src={ROOTURL + "/resources" + card.writer.profileImg}
            />
          }
          action={
            <React.Fragment>
              <IconButton onClick={this.openDialog}>
                <Delete />
              </IconButton>
              <Dialog open={this.state.dialogOpen}>
                <DialogTitle>삭제하시겠습니까?</DialogTitle>
                <DialogActions>
                  <Button onClick={this.disAgree}>Disagree</Button>
                  <Button onClick={this.agree}>Agree</Button>
                </DialogActions>
              </Dialog>
              <IconButton
                onClick={this.props.addFavorite}
              >
                {
                  !this.props.favorited ?
                    <FilledFavoriteIcon /> :
                    <FavoriteIcon />
                }
              </IconButton>
              <IconButton onClick={this.writerMenuOpen} >
                <span ref={(element: any) => { this.anchor = element }} />
                <MoreVertIcon />
              </IconButton>
            </React.Fragment>
          }
          title={card.writer.id}
          subheader={card.writeDay}
        />
        <WriterClickMenu
          left={60}
          top={80}
          anchor={this.anchor}
          open={this.state.open}
          closeMenu={this.closeMenu}
          id={card.writer.id}
        />
        <div className={classes.main} ref={(e) => { this.imgWidth = e }}>
          <div className={classes.left}>
            {
              this.props.card.photos.length !== 0 ?
                <ImageViewer
                  width={this.imgWidth ? this.imgWidth.clientWidth * 45 / 100 : 0}
                  height={this.imgWidth ? this.imgWidth.clientHeight * 45 / 100 : 0}
                  photos={this.props.card.photos}
                /> :
                ""
            }
            {/*글  아래 */}
            <Scrollbars
              style={{
                width: this.imgWidth ? this.imgWidth.clientWidth * 45 / 100 : "",
                fontFamily: "Sunflower,sans-serif"
              }}
            >
              <CardContent>
                <Editor
                  readOnly={true}
                  editorState={this.state.editorState}
                  onChange={this.editorChange}
                />
              </CardContent>
            </Scrollbars>
          </div>
          <div className={classes.right}>
            <CardActions className={classes.actions} disableActionSpacing={true}>
              {/* 이부분 유저가 누른걸 가져오게 수정해야한다*/}
              {/* 마음&즐겨찾기 추후 추가*/}
              <EmotionBox
                id={this.props.card.id}
              />
            </CardActions>
            <div className={classes.replyBox}>
              <ReplyEditor
                editorState={this.state.replyContent}
                editorChange={this.doChangeReply}
              />
              <Button onClick={this.submit} className={classes.button}>save</Button>
            </div>
            {/*스크롤때문에 댓글창이 제대로 안나온다*/}
            <Scrollbars
              className={classes.hi}
              autoHide={true}
              ref={(e) => { this.scroll = e }}
            >
              <div ref={(e) => { this.tableWidth = e }}>
                {
                  this.state.replys.map((reply, index) => {
                    return (
                      <ReplyList
                        getReply={this.getReply}
                        key={index}
                        width={this.tableWidth ? this.tableWidth.offsetWidth : 0}
                        reply={reply}
                      />
                    );
                  })}
              </div>
            </Scrollbars>
          </div>
        </div>
      </Card >
    );
  }
  private getReply() {
    axios.get(ROOTURL + "/account/getByCardReply", {
      params: {
        cardnum: this.props.card.id + ""
      }
    })
      .then((response) => {
        this.setState({
          replys: response.data
        }, () => {
          if (this.state.firstLoad) {
            this.setState({
              firstLoad: false
            })
            return;
          }
          this.scroll!.scrollToBottom()
        })
      })
  }

  private editorChange(es: EditorState) {
    this.setState({
      editorState: es
    })
  }
  private doChangeReply(e: EditorState) {
    // alert();
    this.setState({
      replyContent: e
    })
  }
  private submit() {
    {/*비밀번호는 폼으로 가져오면된다.  */ }
    const data = new FormData();
    data.append("replyContent",
      JSON.stringify(
        convertToRaw(this.state.replyContent.getCurrentContent())
      )
    );
    data.append("cardnum", this.props.card.id + "");
    Axios.post(ROOTURL + "/account/saveReply", data)
      .then((response) => {
        // alert(response.data + "리플돌아옴");
        this.getReply();
        const eState = EditorState.push(this.state.editorState, ContentState.createFromText(""), "delete-character");
        this.setState({
          replyContent: eState
        })
      })
  }
  private closeMenu() {
    this.setState({
      open: false
    })
  }
  private writerMenuOpen() {
    this.setState({
      open: true
    })
  }

  private openDialog() {
    this.setState({
      dialogOpen: true
    })
  }
  private disAgree() {
    this.setState({
      dialogOpen: false
    })
  }
  private agree() {
    axios.get(ROOTURL + "/boards/delBoard", {
      params: {
        boardnum: this.props.card.id
      }
    }).then((response)=>{
      this.props.boardRefresh();
    })
    this.setState({
      dialogOpen: false
    })
  }

}

export default withStyles(styles)(RecipeReviewCard);