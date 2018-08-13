import * as React from 'react';
/**
 * @author ParkHyeokJoon
 * @since 18.08.13
 * @version 18.08.13
 */
export default class SignUp extends React.Component {
    public render() {
        return (
            <div>
                <form
                    action="http://localhost:8081/signup"
                    method="get"
                >
                    ID<input
                        type="text"
                        name="id"
                    />
                    <br />
                    PW<input
                        type="text"
                        name="pw"
                    />
                    <br />
                    <input
                        type="submit"
                    />
                </form>
            </div>
        );
    }
}