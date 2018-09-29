import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Modal } from '@material-ui/core';
// import LargeCardMain from '../LargeCardMain';
import { ICardModel } from '../../../../../constance/models';
import LargeCardMain from './LargeCardMain';



/**
 * @author:MinJu Cha
 * @since:2018.9.5
 * @version:2018.9.5
 * 
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    writerContainer: {
        display: "flex",
        borderRadius: "20px",
    },
    modal: {
        borderRadius: "20px",
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
    card:ICardModel
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
                <LargeCardMain 
                card={this.props.card}/>
                </div>
            </Modal>
        );
    }
}

export default withStyles(style)(BigCard);

