import * as React from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import { IMemberModel } from '../../../../constance/models';
import { ILoginStore, withLoginContext } from '../../../../contexts/LoginContext';
import axios from 'axios';
import { INetworkStore, withNetworkContext } from '../../../../contexts/NetworkContext';
import Allmemberstile from './Allmemberstile';

/**
 * @author:KimMinJeong
 * @since:2018.09.16
 * @version:2018.09.16
 * 전체 모든 사람들 목록
 */

/**
 * @author:Kim MinJeong
 * @version:2018.09.19
 */

interface IState {
    friends: IMemberModel[],
}

class AllFriends extends React.Component<INetworkStore & ILoginStore, IState>{
    constructor(props: INetworkStore & ILoginStore) {
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

    public componentDidMount() {
        const axiosInstance = axios.create({
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        axiosInstance.get("http://localhost:8081/members/members").then((result) => {
            this.setState({
                friends: result.data
            })
        })
    }

    public render() {
        return (
            <GridList cols={3} cellHeight={300}>
                {
                    this.state.friends.map((friend, index) => {
                        return (
                            <GridListTile
                                key={index}
                            >
                                <Allmemberstile
                                    friendInfo={friend}
                                    addFriend={this.props.addFriend}
                                />
                            </GridListTile>
                        );
                    })
                }
            </GridList>
        );
    }
}
export default withNetworkContext(withLoginContext((AllFriends)));