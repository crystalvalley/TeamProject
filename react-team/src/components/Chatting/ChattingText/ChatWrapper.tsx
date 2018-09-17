import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';
import { IMsgModel, IMemberModel } from '../../../constance/models';
import ToText from './ToText';
import FromText from './FromText';


const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    }
    chats: IMsgModel[];
    loginedId: IMemberModel;
}

class ChatWrapper extends React.Component<IProps>{
    public render() {
        return (
            <Scrollbars
                style={{
                    height: "300px"
                }}
                autoHide={true}
            >
                {
                    this.props.chats.map((chat, index) => {
                        if (chat.sender.id === this.props.loginedId.id) {
                            return (
                                <ToText key={index} chat={chat} />
                            );
                        } else {
                            return (
                                <FromText key={index} chat={chat} />
                            );
                        }
                    })
                }
            </Scrollbars>
        );
    }
}

export default withStyles(style)(ChatWrapper);