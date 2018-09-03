import * as React from 'react';

interface IProps {
    classes: {
        viewContainer:string;
    }
}
interface IState {
    name:string
}

export default class ReplyContainer extends React.Component<IProps,IState>{
    constructor(props: IProps) {
        super(props);
    }

    public render() {
        const {classes} = this.props;
        return (
            <form>
                <div className={classes.viewContainer}> 
                    댓글컴포넌트!!
                </div>
            </form>
        ); 
    }
}