import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Modal } from '@material-ui/core';
import SnsEditorContainer from './Editor/SnsEditorContainer';

/**
 * @author: ParkHyeokJoon
 * @since : 2018.08.28
 * @version : 2018.08.28
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    writerContainer: {
        width: "1000px",
        height: "750px",
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

class Writer extends React.Component<IProps>{
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
                    <SnsEditorContainer />
                </div>
            </Modal>
        );
    }
}

export default withStyles(style)(Writer);