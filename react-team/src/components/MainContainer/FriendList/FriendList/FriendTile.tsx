import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, withStyles, StyleRulesCallback, Theme, GridList, GridListTile, Avatar, Grid } from '@material-ui/core';
import Icon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

/**
 * @author:KimMinJeong
 * @since:2018.08.28
 * @version:2018.08.30
 */



const style: StyleRulesCallback = (theme: Theme) => ({
    card: {
        maxWidth: 500,
    },
    media: {
        height: 140,
    },
    button: {
        margin: theme.spacing.unit
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    row: {
        display: 'flex',
        justifyContent: 'center',
    },
    avatar: {
        margin: 10,
    },
    bigAvatar: {
        width: 60,
        height: 60,
    },
});

interface IProps {
    classes: {
        card: string;
        media: string;
        button: string;
        rightIcon: string;
        row: string;
        avatar: string;
        bigAvatar: string;
    }
}


class Friend extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);

    }
    public render() {
        const { classes } = this.props;
        return (
            <div>
                <div>
                    <GridList cols={3} cellHeight={500}>
                        <GridListTile>
                            <Card className={classes.card}>
                                <Grid item={true}>
                                    <Avatar className={classes.avatar} />
                                    <Avatar
                                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=350"
                                    />
                                </Grid>

                                <Grid item={true}>
                                    <Typography gutterBottom={true} variant="subheading">
                                        James
                                 </Typography>
                                </Grid>

                                <CardMedia
                                    className={classes.media}
                                    image="https://www.apple.com/ph/apple-events/september-2017/video/poster_medium.jpg"
                                    title="Contemplative Reptile"
                                />

                                <CardContent>
                                    <Typography gutterBottom={true} variant="headline" component="h2">
                                        anything
                                        </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size="small" color="primary">
                                        Add
                                        <Icon className={classes.rightIcon} />
                                    </Button>

                                    <Button size="small" color="primary">
                                        Unfriended
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