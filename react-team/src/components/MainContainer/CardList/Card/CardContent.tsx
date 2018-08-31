import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, GridListTileBar, IconButton } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { NavLink } from 'react-router-dom';
import { ICardModel } from '../../../../constance/models';
/**
 * 
 * @author : ParkHyeokJoon
 * @since : 2018.8.16
 * @version : 2018.8.20
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    titleBar: {
        background:
            'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' +
            'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
})

interface IProps {
    classes: {
        icon: string;
        titleBar: string;
    }
    card: ICardModel;
}

class CardContent extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        const { classes, card } = this.props;
        return (
            <React.Fragment>
                <NavLink to={"/view?type=Board&num="+this.props.card.id}>
                    <img src="https://material-ui.com/static/images/grid-list/breakfast.jpg" />
                    <GridListTileBar
                        title={card.title}
                        titlePosition="top"
                        actionIcon={
                            <IconButton className={classes.icon}>
                                <StarBorderIcon />
                            </IconButton>
                        }
                        actionPosition="left"
                        className={classes.titleBar}
                    />
                </NavLink>
            </React.Fragment>
        );
    }
}

export default withStyles(style)(CardContent);