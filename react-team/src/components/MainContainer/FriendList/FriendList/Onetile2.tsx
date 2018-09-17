import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import HomeIcon from '@material-ui/icons/Home';
import TouchApp from '@material-ui/icons/TouchApp';
import { IMemberModel } from '../../../../constance/models';
// import { INetworkStore } from '../../../../contexts/NetworkContext';
// import SearchedList from '../../CardList/Card/SearchedList';


/**
 * @author:Kim MinJeong
 * @since:2018.09.03
 * @version:2018.09.06
 * member 목록리스트에 해당되는 하나의 타일(전체화면)
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    button: {
        margin: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    }
});

interface IProps {
    classes: {
        card: string;
        media: string;
        rightIcon: string;
    },
    friendInfo: IMemberModel,
    addFriend(id:string):void;
  
  
}

class Onetile2 extends React.Component<IProps> {
    constructor(props:IProps){
        super(props);  
      this.addFriend=this.addFriend.bind(this);
    }
    public render() {
        const { classes,friendInfo} = this.props;
     
        this.state = {
            item: {
                writer: "",
                image: [],
            },
        }

        return (            
            <Card className={classes.card}>
                <CardMedia
                    className={classes.media}
                  
                    src={"http://localhost:8081/resources" + friendInfo.profileImg}                    
                />
                <CardContent>
                    <Typography gutterBottom={true} variant="headline" component="h2">
                        {this.props.friendInfo.id}
                    </Typography>
                </CardContent>

                <CardActions>
                    <Button size="small" color="primary" onClick={this.addFriend}>
                        친구추가
                            <TouchApp className={classes.rightIcon} />
                    </Button>
                    <Button size="small" color="primary">
                        들어가보기
                            <HomeIcon className={classes.rightIcon} />
                    </Button>
                </CardActions>
            </Card>        
        )
    }

    private addFriend() {
        this.props.addFriend(this.props.friendInfo.id);
    }
}
export default withStyles(style)(Onetile2);