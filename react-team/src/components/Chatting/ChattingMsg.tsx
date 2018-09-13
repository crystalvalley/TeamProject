import *  as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Avatar, Typography } from '@material-ui/core';
import { IMemberModel } from '../../constance/models';

const style: StyleRulesCallback = (theme: Theme) => ({

})
interface IProps {
    classes: {

    }
    speaker: IMemberModel
    text : string;
}

class ChattingMsg extends React.Component<IProps>{
    public render() {
        return (
            <div>
                <Typography>
                    <Avatar src={this.props.speaker.profileImg} />
                    {this.props.speaker.username}
                </Typography>
                <div>
                    {this.props.text}
                </div>
            </div>
        );
    }
}

export default withStyles(style)(ChattingMsg);
