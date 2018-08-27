import * as  React from 'react';
import axios from 'axios';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.20
 * @version : 18.08.23
 */

export interface ILoginStore {
    loginedId: string;
}

const loginContext = React.createContext<ILoginStore>({
    loginedId: "",
});
class LoginProvider extends React.Component<{}, ILoginStore> {
    constructor(props: {}) {
        super(props);
        this.state = {
            loginedId: "",
        }
        this.loginCheck = this.loginCheck.bind(this);
    }

    // 새로고침 했을 때 적용하도록
    public componentDidMount() {
        this.loginCheck();
    }
    public componentDidUpdate(nextProps:{},nextState:ILoginStore){
        if(this.state.loginedId !== nextState.loginedId){
            this.loginCheck();
        }else{
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
    private loginCheck(){
        axios.post("http://localhost:8081/loginCheck")
            .then((response) => {
                if (response.data.msg !== "Not Logined") {
                    this.setState({
                        loginedId: response.data.msg
                    })
                }
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


export function withLoginContext<P extends ILoginStore>(Component : React.ComponentType<P>){
    return function userLoginContext(props: Pick<P,Exclude<keyof P, keyof ILoginStore>>){
        return(
            <loginContext.Consumer>
                {
                    value=>
                        <Component {...value} {...props}/>
                }
            </loginContext.Consumer>
        );
    }
}