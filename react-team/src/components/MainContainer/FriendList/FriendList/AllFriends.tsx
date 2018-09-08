import * as React from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import { IMemberModel } from '../../../../constance/models';
import { ILoginStore, withLoginContext } from '../../../../contexts/LoginContext';
import Onetile from './Onetile';
import axios from 'axios';



/**
 * @author:KimMinJeong
 * @since:2018.08.28
 * @version:2018.08.30
 * 모든 사람들 목록
 */

interface IState {
    friends: IMemberModel[],
}

class AllFriends extends React.Component<ILoginStore, IState>{
    constructor(props: ILoginStore) {
        super(props);
        this.state = {
            friends: [

                {
                    id: "",
                    name: "",
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
        axiosInstance.get("http://localhost:8081/members/members").then((result)=>{
            this.setState({
                friends : result.data
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
                                <Onetile
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
export default withLoginContext((AllFriends));