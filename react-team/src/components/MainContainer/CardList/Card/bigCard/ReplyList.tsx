import * as React from 'react';
import { IReplyModel } from '../../../../../constance/models';

interface IProps {
    reply :IReplyModel;
}

class ReplyList extends React.Component<IProps>{
    public render() {
        return (
            <div>
                <form>
                   {this.props.reply.content}
                </form>
            </div>
        );
    }

}

export default (ReplyList); 