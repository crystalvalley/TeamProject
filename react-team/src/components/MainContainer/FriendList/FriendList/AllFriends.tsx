import * as React from 'react';
import { GridList, GridListTile } from '@material-ui/core';
import { IMemberModel } from '../../../../constance/models';
import { ILoginStore, withLoginContext } from '../../../../contexts/LoginContext';
import Onetile from './Onetile';


/**
 * @author:KimMinJeong
 * @since:2018.08.28
 * @version:2018.08.30
 * 모든 사람들 목록
 */

interface IState {
    friends: IMemberModel[],
}

class Friend extends React.Component<ILoginStore, IState>{
    constructor(props: ILoginStore) {
        super(props);
        this.state = {
            friends: [
                {
                    id: "1",
                    name: "1",
                    profileImg: "1"
                },
                {
                    id: "2",
                    name: "2",
                    profileImg: "2"
                },
                {
                    id: "3",
                    name: "3",
                    profileImg: "3"
                },
                {
                    id: "4",
                    name: "2",
                    profileImg: "2"
                },
                {
                    id: "5",
                    name: "3",
                    profileImg: "3"
                }
            ]
        }
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
export default withLoginContext((Friend));