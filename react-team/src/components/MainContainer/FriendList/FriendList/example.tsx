import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {forming} from './forming';

/**
 * @author:KimMinJeong
 * @since:2018.08.28
 * @version:2018.08.30
 */

const styles = (theme: any) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

interface IProps {
    classes: {
        list: string;
        fullList: string;
        root:string;
    }
}

class FolderList extends React.Component<IProps> {
    public render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <List>
                    {forming}                   
                </List>
            </div>
        );
    }
}

export default withStyles(styles)(FolderList);