import * as React from "react";

interface IProps {
    text: string;
}

export default class ContentOfLeftFriend extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
    }
    public render() {
        return (
            <div>
                {this.props.text}
            </div>

        );
    }

}