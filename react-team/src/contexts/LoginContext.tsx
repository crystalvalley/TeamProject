import * as  React from 'react';
import axios from 'axios';

/**
 * @author : ParkHyeokjoon
 * @since : 18.08.20
 * @version : 18.08.20
 */

export interface ILoginStore {
    loginedId: string;
    loginFunc(id:string):void;
}

const loginContext = React.createContext<ILoginStore>({
    loginedId: "",
    loginFunc:(id:string)=>{return}
});
class LoginProvider extends React.Component<{}, ILoginStore> {
    constructor(props: {}) {
        super(props);
        this.login = this.login.bind(this);
        this.state = {
            loginedId: "",
            loginFunc : this.login
        }
    }

    // 새로고침 했을 때 적용하도록
    public componentDidMount() {
        axios.post("http://localhost:8081/loginCheck")
            .then((response) => {
                if (response.data.msg !== "fail") {
                    this.setState({
                        loginedId: response.data.msg
                    })
                }
            })
    }

    public render() {
        return (
            <loginContext.Provider value={this.state}>
                {this.props.children}
            </loginContext.Provider>
        );
    }
    private login(id : string){
        this.setState({
            loginedId : id
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
                        <Component {...value}/>
                }
            </loginContext.Consumer>
        );
    }
}