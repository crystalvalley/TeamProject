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
 
// flex로 한줄로맞추고 같은 height로 맞춤 
const styles: StyleRulesCallback = (theme: Theme) =>({ 
  card: { 
    flexBasis: '48%' 
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
  } 
}); 
 
interface IProps{ 
  classes:{ 
    card: string; 
    media: string; 
    actions:string; 
    expand: string; 
    expandOpen: string; 
    avatar: string; 
  } 
} 
 
interface IState{ 
  expanded : boolean; 
} 
 
class LargeCardMain extends React.Component<IProps, IState> { 
  constructor(props:IProps){ 
    super(props) 
    this.state={ 
      expanded:false 
    } 
    this.handleExpandClick = this.handleExpandClick.bind(this) 
  } 
   
   
 
  public handleExpandClick = () => { 
    this.setState(state => ({ expanded: !state.expanded })); 
  }; 
 
  public render() { 
    const { classes } = this.props; 
 
    return ( 
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
        {/* <CardMedia 
          className={classes.media} 
          image="https://image.walkerplus.com/wpimg/photosession/480/47327.jpg?x=480" 
          title="Contemplative Reptile" 
        /> */} 
         
        <CardContent> 
          <Typography component="p">간단한 내용 보이는 곳</Typography> 
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
 
 
 
export default withStyles(styles)(LargeCardMain); 