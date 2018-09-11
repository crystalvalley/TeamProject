import * as React from 'react';
import { IMemberModel } from '../constance/models';
import { ILoginStore, withLoginContext } from './LoginContext';
import axios from 'axios';

/**
 * @author:ParkHyeokJoon
 * @since : 2018.09.08
 * @version : 2018.09.08
 */
// 채팅 파트 추가 필요
export interface INetworkStore {
    // 자기 친구 목록
    friendList: IMemberModel[];
    // 자신한테 온 친구요청
    friendRequest: IMemberModel[];
    followList: IMemberModel[];
    follwerList: IMemberModel[];
    loginedId : IMemberModel;
    addFriend(id: string): void;
    delFriend(id: string): void;
    addFollow(id: string): void;
    delFollow(id: string): void;
    addBlock(id: string): void;
    refresh(): void;
}

const NetworkContext = React.createContext<INetworkStore>({
    friendList: [],
    friendRequest: [],
    followList: [],
    follwerList: [],
    loginedId:{
        id:"",
        username:"",
        profileImg:""
    },
    addFriend: (id: string) => { return },
    delFriend: (id: string) => { return },
    addFollow: (id: string) => { return },
    delFollow: (id: string) => { return },
    addBlock: (id: string) => { return },
    refresh: () => { return }
});

// 친구목록 컨테스트를 사용할 경우에는 로그인 컨텍스트도 같이 사용됨
class NetworkProvider extends React.Component<ILoginStore, INetworkStore>{
    constructor(props: ILoginStore) {
        super(props);
        this.addFriend = this.addFriend.bind(this);
        this.delFriend = this.delFriend.bind(this);
        this.addFollow = this.addFollow.bind(this);
        this.delFollow = this.delFollow.bind(this);
        this.addBlock = this.addBlock.bind(this);
        this.refresh = this.refresh.bind(this);
        this.state = {
            friendList: [],
            friendRequest: [],
            followList: [],
            follwerList: [],
            loginedId:this.props.logined,
            addFriend: this.addFriend,
            delFriend: this.delFriend,
            addFollow: this.addFollow,
            delFollow: this.delFollow,
            addBlock: this.addBlock,
            refresh: this.refresh
        }
    }
    public componentDidMount() {
        this.refresh();
    }
    public render() {
        const value={...this.state,...this.props.logined}
        return (
            <NetworkContext.Provider value={value}>
                {this.props.children}
            </NetworkContext.Provider>
        );
    }
    private addFriend(memberid: string) {
        axios.get("http://localhost:8081/networks/requestNetwork", {
            params: {
                target: memberid
            }
        })
    }
    private delFriend(memberid: string) {
        alert(memberid + "를 친구 삭제");
    }
    private addFollow(memberid: string) {
        axios.get("http://localhost:8081/networks/addFollow", {
            params: {
                target: memberid
            }
        }).then((result) => {
            this.refresh();
        })

    }
    private delFollow(memberid: string) {
        axios.get("http://localhost:8081/networks/delFollow", {
            params: {
                target: memberid
            }
        }).then((result) => {
            this.refresh();
        })

    }
    private refresh() {
        axios.get("http://localhost:8081/networks/getNetworks")
            .then((result) => {
                this.setState({
                    friendList: result.data.friendList,
                    friendRequest: result.data.friendRequest
                })
            })
    }
    private addBlock(memberid: string) {
        axios.get("http://localhost:8081/networks/addBlock", {
            params: {
                target: memberid
            }
        }).then((result) => {
            this.refresh();
        })
    }
}

export default withLoginContext(NetworkProvider)

export function withNetworkContext<P extends INetworkStore>(Component: React.ComponentType<P>) {
    return function userNetworkContext(props: Pick<P, Exclude<keyof P, keyof INetworkStore>>) {
        return (
            <NetworkContext.Consumer>
                {
                    value =>
                        <Component {...value} {...props} />
                }
            </NetworkContext.Consumer>
        );
    }
}