import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, withStyles, StyleRulesCallback, Theme, GridList, GridListTile } from '@material-ui/core';
import Icon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import { IMemberModel, IPhotoModel } from '../../../../constance/models';
import { ILoginStore } from '../../../../contexts/LoginContext';

/**
 * @author:KimMinJeong
 * @since:2018.08.28
 * @version:2018.08.30
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
        button: string;
        rightIcon: string;

    }
}
interface IState {
    item: {
        writer: string,
        image: IPhotoModel[],
    },
    userInfo: IMemberModel,
}


class Friend extends React.Component<IProps & ILoginStore, IState>{
    constructor(props: IProps & ILoginStore) {
        super(props);
        this.state = {
            item: {
                image: [],
                writer: ""
            },
            userInfo: {
                id: "",
                profileImg: ""
            }
        }

    }
    public render() {
        const { classes } = this.props;
        return (

            <div>
                <div>
                    <GridList cols={3} cellHeight={300}>
                        <GridListTile>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image="https://www.apple.com/ph/apple-events/september-2017/video/poster_medium.jpg"
                                    
                                />
                                <CardContent>
                                    <Typography gutterBottom={true} variant="headline" component="h2"/>
                                    
                                    
                                </CardContent>

                                <CardActions>
                                    <Button size="small" color="primary">
                                        Add
                                        <Icon className={classes.rightIcon} />
                                    </Button>

                                    <Button size="small" color="primary">
                                        See
                                        <DeleteIcon className={classes.rightIcon} />
                                    </Button>
                                </CardActions>
                            </Card>
                        </GridListTile>

                        <GridListTile>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image="https://www.apple.com/ph/apple-events/september-2017/video/poster_medium.jpg"
                                  
                                />
                                <CardContent>
                                    <Typography gutterBottom={true} variant="headline" component="h2">
                                        KOREA
                                        </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size="small" color="primary">
                                        Add
                                        <Icon className={classes.rightIcon} />
                                    </Button>

                                    <Button size="small" color="primary">
                                        See
                                        <DeleteIcon className={classes.rightIcon} />
                                    </Button>
                                </CardActions>
                            </Card>
                        </GridListTile>

                        <GridListTile>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image="https://www.apple.com/ph/apple-events/september-2017/video/poster_medium.jpg"
                                  
                                />
                                <CardContent>
                                    <Typography gutterBottom={true} variant="headline" component="h2">
                                        Japan
                                        </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size="small" color="primary">
                                        Add
                                        <Icon className={classes.rightIcon} />
                                    </Button>

                                    <Button size="small" color="primary">
                                        See
                                        <DeleteIcon className={classes.rightIcon} />
                                    </Button>
                                </CardActions>
                            </Card>
                        </GridListTile>
                   </GridList>
                </div>
            </div>


        );
    }

}
export default withStyles(style)(Friend);