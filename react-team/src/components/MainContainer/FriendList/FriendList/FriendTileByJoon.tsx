import * as React from 'react';

interface IProps{
    id: string;
    profileImg: string;
    name :string;
}

class FriendTileByJoon extends React.Component<IProps> {
    public render() {
        return(
            <ul>
            <li>id : {this.props.id}</li>
            <li>name : {this.props.name}</li>
            <li>pro : {this.props.profileImg}</li>
            </ul>
        );
    }
}   


export default FriendTileByJoon;

