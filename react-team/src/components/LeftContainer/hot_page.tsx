import * as React from 'react';
import { GridList, GridListTile, ListSubheader, GridListTileBar, StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import tileData from './tileData';


const styles: StyleRulesCallback = (theme: Theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 700,
        height: 450,
    },
    icon: {
        color: 'rgba(255, 255, 255, 0.54)',
    },
});

interface IProps {
    classes: {
        root: string;
        gridList : string;
        display: string;
        flexWrap: string;
        justifyContent: string;
        overflow: string;
        backgroundColor: string;

    }
    location: Location;
}

class HotPage extends React.Component<IProps> {
constructor(props: IProps){
    super(props);

}


    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}> 
                <GridList cellHeight={180} className={classes.gridList}>
                    <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
                        <ListSubheader component="div"><h2>Currently Hot Articles</h2></ListSubheader>
                    </GridListTile>
                    {tileData.map(tile => (
                        <GridListTile key={tile.img}>
                            <img src={tile.img} alt={tile.title} />
                            <GridListTileBar
                                title={tile.title}  
                                subtitle={<span>by: {tile.author}</span>}

                            />
                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }


}
export default withStyles(styles)(HotPage);