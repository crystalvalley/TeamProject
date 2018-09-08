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
export interface IFriendStore {
    // 자기 친구 목록
    friendList : IMemberModel[],
    // 자신한테 온 친구요청
    friendRequest : IMemberModel[]
    addFriend(id: string): void;
    delFriend(id: string): void;
    addFollow(id:string):void;
    delFollow(id:string):void;
    refresh():void;
}

const friendContext = React.createContext<IFriendStore>({
    friendList : [],
    friendRequest:[],
    addFriend: (id: string) => { return },
    delFriend: (id: string) => { return },
    addFollow: (id: string) => { return },
    delFollow: (id: string) => { return },
    refresh:()=>{return}
});

// 친구목록 컨테스트를 사용할 경우에는 로그인 컨텍스트도 같이 사용됨
class FriendProvider extends React.Component<ILoginStore, IFriendStore>{
    constructor(props: ILoginStore) {
        super(props);
        this.addFriend = this.addFriend.bind(this);
        this.delFriend = this.delFriend.bind(this);
        this.addFollow = this.addFollow.bind(this);
        this.delFollow = this.delFollow.bind(this);
        this.refresh = this.refresh.bind(this);
        this.state = {
            friendList :[],
            friendRequest:[],
            addFriend: this.addFriend,
            delFriend: this.delFriend,
            addFollow : this.addFollow,
            delFollow : this.delFollow,
            refresh:this.refresh
        }
    }
    public componentDidMount(){
        this.refresh();
    }
    public render() {
        return (
            <friendContext.Provider value={this.state}>
                {this.props.children}
            </friendContext.Provider>
        );
    }
    private addFriend(memberid: string) {
        axios.get("http://localhost:8081/networks/requestFriend",{
            params:{
                target : memberid
            }
        })
    }
    private delFriend(memberid: string) {
        alert(memberid + "를 친구 삭제");
    }
    private addFollow(memberid:string){
        alert(memberid + "를 팔로우 추가");
        
    }
    private delFollow(memberid:string){
        alert(memberid + "를 팔로우 삭제");
        
    }
    private refresh(){
        axios.get("http://localhost:8081/networks/getNetworks")
            .then((result)=>{
                this.setState({
                    friendList : result.data.friendList,
                    friendRequest : result.data.friendRequest
                })
            })
    }
}

export default withLoginContext(FriendProvider)

export function withFriendContext<P extends IFriendStore>(Component: React.ComponentType<P>) {
    return function userFriendContext(props: Pick<P, Exclude<keyof P, keyof IFriendStore>>) {
        return (
            <friendContext.Consumer>
                {
                    value =>
                        <Component {...value} {...props} />
                }
            </friendContext.Consumer>
        );
    }
}