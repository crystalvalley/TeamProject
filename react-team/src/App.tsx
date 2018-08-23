import * as React from 'react';
import { BrowserRouter, Route, Switch, } from 'react-router-dom';
import SignIn from './components/Account/SignIn';
import SignUp from './components/Account/SignUp';
import AppContainer from './components/AppContainer';

/**
 * @author ParkHyeokJoon
 * @since 2018.08.12
 * @version 2018.08.12
 */
export default class App extends React.Component {
    public render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/* 로그인 화면 */}
                    <Route path="/signin" component={SignIn} />
                    {/* 회원 가입 화면 */}
                    <Route path="/signup" component={SignUp} />
                    {/* 그 외 */}
                    <Route path="/" component={AppContainer} />
                    
                </Switch>
            </BrowserRouter>
        );
    }
}