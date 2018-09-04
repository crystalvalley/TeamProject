import * as  React from 'react';
import axios from 'axios';
import { IMemberModel } from '../constance/models';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.20
 * @version : 18.09.02
 */

export interface ILoginStore {
    logined: IMemberModel;
    loginCheck():void;
}

const loginContext = React.createContext<ILoginStore>({
    logined: {
        profileImg: "",
        id: "",
        name : ""
    },
    loginCheck:()=>{return}
});
class LoginProvider extends React.Component<{}, ILoginStore> {
    constructor(props: {}) {
        super(props);
        this.loginCheck = this.loginCheck.bind(this);
        this.state = {
            logined: {
                profileImg: "",
                id: "",
                name : ""
            },
            loginCheck:this.loginCheck
        }
    }

    // 새로고침 했을 때 적용하도록
    public componentDidMount() {
        this.loginCheck();
    }
    public componentDidUpdate(nextProps: {}, nextState: ILoginStore) {
        if (this.state.logined ===undefined) {
            this.loginCheck();
        } else {
            return;
        }
    }
    public render() {
        return (
            <loginContext.Provider value={this.state}>
                {this.props.children}
            </loginContext.Provider>
        );
    }
    private loginCheck() {
        axios.post("http://localhost:8081/account/loginCheck")
            .then((response) => {
                this.setState({
                    logined: response.data
                })
                /*
                else{
                    // 로그인 되지 않았고 loginPage라면
                    if(window.location.href.indexOf("signin")!==-1){
                        location.href = "/signin";
                    }
                }
                */
            })

    }
}
export { LoginProvider };


export function withLoginContext<P extends ILoginStore>(Component: React.ComponentType<P>) {
    return function userLoginContext(props: Pick<P, Exclude<keyof P, keyof ILoginStore>>) {
        return (
            <loginContext.Consumer>
                {
                    value =>
                        <Component {...value} {...props} />
                }
            </loginContext.Consumer>
        );
    }
}