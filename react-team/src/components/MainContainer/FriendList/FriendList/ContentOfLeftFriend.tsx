import * as React from "react";

/**
 * @author:KimMinJeong
 * @since:2018.08.28
 * @version:2018.08.30
 */

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