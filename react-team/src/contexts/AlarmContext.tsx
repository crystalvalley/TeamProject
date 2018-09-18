import * as React from 'react';
import { IMemberModel } from '../constance/models';

interface IStore {
    alarmId: string
    usdate: string
    mentioned: boolean
    reqFriendship: boolean
    checked: boolean
    actor_id: IMemberModel
    receiver: IMemberModel
}

const AlarmContext = React.createContext<IStore>({

    alarmId: "",
    usdate: "",
    mentioned: false,
    reqFriendship: false,
    checked: false,
    actor_id: {
        id: "",
        profileImg: "",
        username: ""
    },
    receiver: {
        id: "",
        profileImg: "",
        username: ""
    },


})

export default class AlarmProvider extends React.Component<{}, IStore>{
    constructor(props: {}) {
        super(props)
        this.state = {
            alarmId: "",
            usdate: "",
            mentioned: false,
            reqFriendship: false,
            checked: false,
            actor_id: {
                id: "",
                profileImg: "",
                username: ""
            },
            receiver: {
                id: "",
                profileImg: "",
                username: ""
            },

        }
    }

    public render() {
        return (
        <AlarmContext.Provider value={this.state}>
                {this.props.children}
            </AlarmContext.Provider>
        )
    }
}