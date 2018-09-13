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
    },
    back: {
        position: "absolute",
        width: "100vw",
        bottom: "20px",
        height: "48px",
        backgroundColor: "white",
        left:0,
        right:0,

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
                    ContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                >
                    <div
                        className={classes.listWrapper}
                    >
                        {
                            this.props.rooms.map((room, index) => {
                                return (
                                    <ChattingBox
                                        key={index}
                                        loginedId={this.props.logined.id}
                                        sendMessage={this.props.sendMessage}
                                        {...room}
                                    />
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