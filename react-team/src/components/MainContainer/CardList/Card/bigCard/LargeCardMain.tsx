import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ReplyIcon from "@material-ui/icons/Reply";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import axios from 'axios';
import { EditorState, convertFromRaw, Editor, convertToRaw } from 'draft-js';
import { Paper, Table, TableRow, TableCell, TableBody } from '@material-ui/core';
import Axios from 'axios';
import { ICardModel, IReplyModel } from '../../../../../constance/models';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
import EmotionBox from '../smallCard/EmotionBox';
import ReplyList from './ReplyList';
import Scrollbars from 'react-custom-scrollbars';
import WriterClickMenu from '../smallCard/WriterClickMenu';
import ReplyEditor from './ReplyEditor';
import ImageViewer from '../smallCard/ImageViewer';



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
    width: "120vh",
    height: "60vh",
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
    height: "40%",
    width: "30%",
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
  bootstrapInput: {
    borderRadius: 4,
    backgroundColor: theme.palette.common.white,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 12px',
    width: 'calc(100% - 14px)',
    height: "80%",
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
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
    minWidth: 700,
  },
  tableTatil: {
    width: '30px%',
  },
  main: {
    display: "flex",
    flexDirection: "row",
  },
  left: {
    padding: "20px",
  },
  right: {
   position: "absolute",
   left: "50%",
   padding: "20px",
   top: "30vh",   
  },
  hight :{
    padding: "20px",
  },
  down :{
    top: "30vh",    
    position: "absolute"
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
    bootstrapInput: string;
    bootstrapFormLabel: string;
    input: string;
    replyBox: string;
    replyText: string;
    replyBtn: string;
    root: string;
    table: string;
    tableTatil: string;
    main: string;
    left: string;
    right: string;
    hight :string;
    down:string;
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
                <Avatar aria-label="Recipe" className={classes.avatar}>
                  ID
            </Avatar>
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


              <div className={classes.down}>
            <CardContent className={classes.containers}>

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
            </CardContent>
            </div>
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
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded
                })}
                onClick={this.handleExpandClick}
                aria-expanded={this.state.expanded}
                aria-label="Show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>

            <button onClick={this.submit}>save</button>
            <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
              <Scrollbars
                autoHeight={true}
                autoHide={true}
              >
                <CardContent>
                  <Paper>
                    <Table className={classes.table}>
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

                </CardContent>
              </Scrollbars>
            </Collapse>
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
  private doChangeReply(e : EditorState) {
    // alert();
    this.setState({
      replyContent : e
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