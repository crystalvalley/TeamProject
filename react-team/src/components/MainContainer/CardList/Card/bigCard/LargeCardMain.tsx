import * as React from 'react';
import { withStyles, StyleRulesCallback, Theme } from "@material-ui/core/styles";
import classnames from "classnames";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
// import CardMedia from "@material-ui/core/CardMedia"; 
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ReplyIcon from "@material-ui/icons/Reply";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { EditorState, convertFromRaw, Editor } from 'draft-js';


import { Button, TextField } from '@material-ui/core';
import Axios from 'axios';
import { ICardModel } from '../../../../../constance/models';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
import EmotionBox from '../smallCard/EmotionBox';


/**
 * @author:Joonsung Gil
 * @since:2018.08.29
 * @version:2018.08.29
 * 
 */
/**
 * 디자인 수정및 연결
 * @author:MinJu Cha
 * @since:2018.9.5
 * @version:2018.9.5
 * 
 */

// flex로 한줄로맞추고 같은 height로 맞춤 
const styles: StyleRulesCallback = (theme: Theme) => ({
  card: {
    flexBasis: '100%'

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
    height: "80%",
    width: "50%"
  },
  content: {
    height: "100%",
    width: "30%"
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
    height: "400px",
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
  }
  card: ICardModel;
}

interface IState {
  editorState: EditorState;
  expanded: boolean;
  replyContent: string;
}

class RecipeReviewCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      expanded: false,
      replyContent :"",
      editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.card.content)), SNSDecorator)
    }
    this.handleExpandClick = this.handleExpandClick.bind(this)
    this.editorChange = this.editorChange.bind;
    this.doChangeReply = this.doChangeReply.bind(this);
    this.submit = this.submit.bind(this);
  }

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  public render() {
    const { classes, card } = this.props;

    return (
      /* 모달 눌렀을 때 전체의 오른쪽 모습 */
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              R
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }

          title={card.writer.id}
          subheader={card.writeDay}
        />

        <CardContent className={classes.containers}>
          <div className={classes.imageContainer}>
            <img className={classes.img} src={"http://localhost:8081/resources" + card.writer.profileImg} />
          </div>
          <div className={classes.content}>

            <CardContent>
              <Editor
                readOnly={true}
                editorState={this.state.editorState}
                onChange={this.editorChange}
              />
            </CardContent>
          </div>
        </CardContent>

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
            <TextField  className={classes.replyText}
            onChange={this.doChangeReply}
            >{this.state.replyContent}</TextField>
            <Button className={classes.replyBtn} 
            onClick={this.submit}
            >Submit</Button>
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
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
          <CardContent>
            
            <Typography paragraph={true}>1문단</Typography>
            <Typography paragraph={true}>2문단</Typography>
            <Typography paragraph={true}>3문단</Typography>
            <Typography>5문단</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
  private editorChange(es: EditorState) {
    this.setState({
        editorState: es
    })
}
private doChangeReply(event: React.ChangeEvent<HTMLInputElement>) {
  // alert();
  this.setState({
      replyContent: event.currentTarget.value
  })
}
private submit() {
  alert(this.props.card.id);
  {/*비밀번호는 폼으로 가져오면된다.  */ }
  const data = new FormData();
  data.append("replyContent",this.state.replyContent);
  data.append("cardnum",this.props.card.id+"");
  Axios.post("http://localhost:8081/account/saveReply",data )
      .then((response) => {
         alert(response.data+"리플돌아옴");
      })
}

}

export default withStyles(styles)(RecipeReviewCard); 