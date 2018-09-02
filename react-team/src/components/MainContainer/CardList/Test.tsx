import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, withStyles, StyleRulesCallback, Theme, Avatar, Grid } from '@material-ui/core';
import Icon from '@material-ui/icons/AddCircle';
import DeleteIcon from '@material-ui/icons/Delete';

const style: StyleRulesCallback = (theme: Theme) => ({
    card: {
        maxWidth: 500,
        flexShrink:0,
        borderRadius: "20px",
        boxShadow: "2px 2px 3px 3px lightgrey",
        marginTop:"25px"
    },
    media: {
        height: 325,
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


class TestCard extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);

    }
    public render() {
        const { classes } = this.props;
        return (
            <Card className={classes.card}>
                <Grid item={true}>
                    <Avatar
                        className={classes.avatar}
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=350"
                    />
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
        );
    }

}
export default withStyles(style)(TestCard);