import * as React from 'react';
import { GridList, GridListTile} from '@material-ui/core';
import { IMemberModel } from '../../../../constance/models';
import { INetworkStore, withNetworkContext } from '../../../../contexts/NetworkContext';
import AllFriendtstile from './AllFriendtstile';

// import axios from 'axios';

/**
 * @author:Kim MinJeong
 * @since:2018.08.28
 * @version:2018.09.06
 * 모든 사람들 목록
 */


interface IProps{
    classes:{
        container:string;
    }
}

interface IState {
    friends: IMemberModel[],
}

class AllFriends extends React.Component<IProps&INetworkStore, IState>{
    constructor(props: IProps&INetworkStore) {
        super(props);
        this.state = {
            friends: [

                {
                    id: "",
                    profileImg: ""
                }

            ]
        }
    }

    public render() {
       
        return (
            <GridList cols={4} cellHeight={300}  spacing={0}>
                {
                    this.props.friendList.map((friend, index) => {
                        return (
                            <GridListTile
                                key={index}                                
                            >
                                <AllFriendtstile
                                    friendInfo={friend}
                                />
                            </GridListTile>
                        );
                    })
                }
            </GridList>
        );
    }
}
export default withNetworkContext(AllFriends);