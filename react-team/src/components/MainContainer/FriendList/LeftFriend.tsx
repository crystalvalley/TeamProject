import * as React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, withStyles, StyleRulesCallback, Theme, GridList, GridListTile } from '@material-ui/core';


const style: StyleRulesCallback = (theme: Theme) => ({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    }

});


interface IProps {
    classes: {
        card: string;
        media: string;
    },
    content: string;

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
                    <GridList cols={3} cellHeight={300}>
                        <GridListTile>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.media}
                                        image="https://www.apple.com/ph/apple-events/september-2017/video/poster_medium.jpg"
                                        title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom={true} variant="headline" component="h2">
                                            Lizard
                                        </Typography>
                                    </CardContent>

                                    <CardActions>
                                        <Button size="small" color="primary">
                                            add
                                        </Button>
                                        <Button size="small" color="primary">
                                            delete
                                        </Button>
                                    </CardActions>
                                </Card>
                        </GridListTile>

                        <GridListTile>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image="https://www.apple.com/ph/apple-events/september-2017/video/poster_medium.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom={true} variant="headline" component="h2">
                                        Lizard
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size="small" color="primary">
                                        add
                                    </Button>
                                    <Button size="small" color="primary">
                                        delete
                                    </Button>
                                </CardActions>

                            </Card>
                        </GridListTile>


                        <GridListTile>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.media}
                                    image="https://www.apple.com/ph/apple-events/september-2017/video/poster_medium.jpg"
                                    title="Contemplative Reptile"
                                />
                                <CardContent>
                                    <Typography gutterBottom={true} variant="headline" component="h2">
                                        Lizard
                                    </Typography>
                                </CardContent>

                                <CardActions>
                                    <Button size="small" color="primary">
                                    add
                                    </Button>
                                    <Button size="small" color="primary">
                                    delete
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