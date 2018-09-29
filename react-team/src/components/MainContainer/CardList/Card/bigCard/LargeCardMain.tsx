import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";

import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ReplyIcon from "@material-ui/icons/Reply";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from 'axios';
import { EditorState, convertFromRaw, Editor, convertToRaw } from 'draft-js';
import { Button, Paper, Table, TableBody, TableRow, TableCell } from '@material-ui/core';
import Axios from 'axios';
import { ICardModel, IReplyModel } from '../../../../../constance/models';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
import EmotionBox from '../smallCard/EmotionBox';
import Scrollbars from 'react-custom-scrollbars';
import WriterClickMenu from '../smallCard/WriterClickMenu';
import ReplyEditor from './ReplyEditor';
import ImageViewer from '../smallCard/ImageViewer';
import ReplyList from './ReplyList';



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
    // flexShrink: 0,
    borderRadius: "20px",
    // boxShadow: "2px 2px 3px 3px lightgrey",
    // marginTop: "25px"
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9 
  },
  actions: {
    flexBasis: '50%'
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8
    }
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  },
  entireDiv: {
    display: "flex"
  },
  containers: {
    flexDirection: "row",
    alignItems: "center",
    display: "flex",
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    padding: "30px",

  },
  content: {
    height: "100%",
    width: "30%",
    padding: "30px",
  },
  img: {
    height: "100%",
    width: "90%"
  },
  bootstrapFormLabel: {
    fontSize: 18,
  },
  input: {
    display: 'none',
  },
  replyBox: {
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
  table: {
    width :"65vh",
   // height :"100vh"
  },
  main: {
    display: "flex",
    flexDirection: "row",
  },
  left: {
    padding: "20px",
  },
  right: {
    height: "100vh",
    position: "absolute",
    left: "50%",
    padding: "20px",
    top: "20vh",
  },
  hight: {
    padding: "20px",
  },
  down: {
    top: "30vh",
    position: "absolute"
  },
  button: {
    border: '1px solid #ced4da',
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
    borderColor: '#80bdff',
  },
  tablebox: {
    height: "100%",
  }
});

interface IProps {
  classes: {
    card: string;
    media: string;
    actions: string;
    expand: string;
    expandOpen: string;
    avatar: string;
    entireDiv: string;
    imageContainer: string;
    content: string;
    containers: string;
    img: string;
    bootstrapRoot: string;
    bootstrapFormLabel: string;
    input: string;
    replyBox: string;
    replyText: string;
    replyBtn: string;
    root: string;
    table: string;
    main: string;
    left: string;
    right: string;
    hight: string;
    down: string;
    button: string;
    tablebox: string;
  }
  // listName: string;
  // id: string;
  // scrollEnd(listName:string):void;
  card: ICardModel;
}

interface IState {
  editorState: EditorState;
  expanded: boolean;
  replyContent: EditorState;
  replys: IReplyModel[]
  open: boolean;
}

class RecipeReviewCard extends React.Component<IProps, IState> {
  // private div: HTMLDivElement | null;
  // private scroll: Scrollbars | null;
  private imgWidth: HTMLDivElement | null;
  private anchor: HTMLSpanElement | null;
  constructor(props: IProps) {
    super(props)
    this.state = {
      expanded: false,
      replyContent: EditorState.createEmpty(SNSDecorator),
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.card.content)), SNSDecorator),
      replys: [],
      open: false

    }
    axios.get("http://localhost:8081/account/getByCardReply", {
      params: {
        cardnum: this.props.card.id + ""
      }
    })
      .then((response) => {
        this.setState({
          replys: response.data
        })
        // alert(response.data + "리플돌아옴");
      })
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.editorChange = this.editorChange.bind;
    this.doChangeReply = this.doChangeReply.bind(this);
    this.submit = this.submit.bind(this);
    this.writerMenuOpen = this.writerMenuOpen.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
  }

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  public render() {
    const { classes, card } = this.props;
    const handler = (element: any) => { this.anchor = element }
    return (
      /* 모달 눌렀을 때 전체의 오른쪽 모습 */
      <Card className={classes.card}>
        <span ref={handler} />
        <div className={classes.main}>
          <div className={classes.left}>
            <div className={classes.hight}>
              <CardHeader
                avatar={
                  <Avatar
                  className={classes.avatar}
                  src={"http://localhost:8081/resources" + card.writer.profileImg}
              />
                }
                action={
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={card.writer.id}
                subheader={card.writeDay}
                onClick={this.writerMenuOpen}
              />
              <WriterClickMenu
                left={60}
                top={80}
                anchor={this.anchor}
                open={this.state.open}
                closeMenu={this.closeMenu}
                id={card.writer.id}
              />
            </div>

            {/*디브 위 아래 */}
            <CardContent className={classes.containers}>
              <div className={classes.down}>
                {/*이미지 위 
              이미지 사이즈 지정 어떻게 하는지 모르겠다
            */}
                <div className={classes.imageContainer}>
                  <ImageViewer
                    width={this.imgWidth !== undefined ? this.imgWidth!.offsetWidth - 24 : 0}
                    photos={this.props.card.photos}
                  />
                </div>

                {/*글  아래 */}
                <div className={classes.content}>

                  <Scrollbars
                    autoHeight={true}
                    autoHide={true}
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
              </div>
            </CardContent>

          </div>


          <div className={classes.right}>
            <CardActions className={classes.actions} disableActionSpacing={true}>
              <IconButton aria-label="Add to favorites">
                <FavoriteIcon />
              </IconButton>
              <IconButton aria-label="Share">
                <ShareIcon />
              </IconButton>
              <IconButton aria-label="reply">
                <ReplyIcon />
              </IconButton>
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
            <div>
            
            {/*스크롤때문에 댓글창이 제대로 안나온다*/}

           
                <CardContent className={classes.table}>
                <Scrollbars
              // style={innerHeight=100}
              autoHeight={true}
              autoHide={true}
            >
                  <Paper>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>작성자</TableCell>
                          <TableCell>내용</TableCell>
                          <TableCell>작성시간</TableCell>
                        </TableRow>
                        {
                          this.state.replys.map((reply, index) => {
                            return (
                              <TableRow key={index}>
                                <ReplyList reply={reply} />
                              </TableRow>
                            );
                          })}

                      </TableBody>
                    </Table>
                  </Paper>
                  </Scrollbars>
                </CardContent>
               
            </div>
          </div>
        </div>
      </Card>
    );
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
    alert(this.props.card.id);
    {/*비밀번호는 폼으로 가져오면된다.  */ }
    const data = new FormData();
    data.append("replyContent",
      JSON.stringify(
        convertToRaw(this.state.replyContent.getCurrentContent())
      )
    );
    data.append("cardnum", this.props.card.id + "");
    Axios.post("http://localhost:8081/account/saveReply", data)
      .then((response) => {
        // alert(response.data + "리플돌아옴");
        location.href = "/LageCardMain"
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

}

export default withStyles(styles)(RecipeReviewCard); 