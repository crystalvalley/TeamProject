import * as React from 'react';
import { StyleRulesCallback, Theme, Snackbar, withStyles } from '@material-ui/core';
import { ILoginStore, withLoginContext } from '../../contexts/LoginContext';
import ChattingBox from './ChattingBox';

const style: StyleRulesCallback = (theme: Theme) => ({
    chatContainer: {
        width: "100%",
        bottom: "20px",
    },
    listWrapper: {
        display: "flex",
        alignItems: "flex-end"
    },
    back: {
        position: "absolute",
        width: "100vw",
        bottom: 0,
        height: "100px",
        backgroundColor: "lightgrey",
        left: 0,
        right: 0,

    }
})

interface IProps {
    classes: {
        chatContainer: string;
        listWrapper: string;
        back: string;
    }

}

class ChattingContainer extends React.Component<IProps & ILoginStore>{
    public render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <div className={classes.back} />
                <Snackbar
                    className={classes.chatContainer}
                    anchorOrigin={{
                        horizontal: "left",
                        vertical: "bottom"
                    }}
                    open={true}
                >
                    <div
                        className={classes.listWrapper}
                    >
                        {
                            this.props.roomIds.map((roomId, index) => {
                                return (
                                    <div
                                        key={index}
                                    >
                                        <ChattingBox
                                            key={index}
                                            loginedId={this.props.logined}
                                            sendMessage={this.props.sendMessage}
                                            {...this.props.rooms[roomId]}
                                        />
                                    </div>
                                );
                            })
                        }
                    </div>
                </Snackbar>
            </React.Fragment>
        );
    }
}

export default withLoginContext(withStyles(style)(ChattingContainer));