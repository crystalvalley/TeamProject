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
  }
}

interface IState {
  expanded: boolean;
}

class RecipeReviewCard extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      expanded: false,
       }
    this.handleExpandClick = this.handleExpandClick.bind(this)
  }

  public handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };

  public render() {
    const { classes } = this.props;

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

          title="일본 불꽃 놀이"
          subheader="September 14, 2016"
        />

        <CardContent className={classes.containers}>
          <div className={classes.imageContainer}>
            <img className={classes.img} src="http://wac.2f9ad.chicdn.net/802F9AD/u/joyent.wme/public/wme/assets/ec050984-7b81-11e6-96e0-8905cd656caf.jpg?v=28" />
          </div>
          <div className={classes.content}>

            <Typography component="p">
            This impressive paella is a perfect party dish and a fun meal to cook together with your
            guests. Add 1 cup of frozen peas along with the mussels, if you like.
          </Typography>
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
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit={true}>
          <CardContent>
            <Typography paragraph={true} variant="body2">
              문단들:
            </Typography>
            <Typography paragraph={true}>1문단</Typography>
            <Typography paragraph={true}>2문단</Typography>
            <Typography paragraph={true}>3문단</Typography>
            <Typography>5문단</Typography>
          </CardContent>
        </Collapse>
      </Card>


    );
  }
}



export default withStyles(styles)(RecipeReviewCard); 