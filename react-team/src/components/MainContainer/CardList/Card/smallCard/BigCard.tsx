import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Modal } from '@material-ui/core';
import LargeCardMain from '../LargeCardMain';


/**
 * @author: ChaMinJu
 * @since : 2018.9.5
 * @version : 2018.9.5
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

class BigCard extends React.Component<IProps>{
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
                    <LargeCardMain />
                </div>
            </Modal>
        );
    }
}

export default withStyles(style)(BigCard);