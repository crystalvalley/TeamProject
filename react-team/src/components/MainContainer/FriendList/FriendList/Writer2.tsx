import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Modal } from '@material-ui/core';
import FriendalarmContainer from '../../../NewWindows/Writer/Editor/FriendalarmContainer';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.28
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    writerContainer: {
        width: "500px",
        height: "500px",

        display: "flex",
    },
    modal: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
})

interface IProps {
    classes: {
        writerContainer: string;
        modal: string;
    },
    open: boolean;
    onClose(): void;
}

class Writer2 extends React.Component<IProps>{
    public render() {
        const { classes } = this.props;
        return (
            <Modal
                className={classes.modal}
                open={this.props.open}
                onClose={this.props.onClose}
            >
                <div
                    className={classes.writerContainer}
                >
                <FriendalarmContainer/>
                                    
                </div>
            </Modal>
        );
    }
}

export default withStyles(style)(Writer2);