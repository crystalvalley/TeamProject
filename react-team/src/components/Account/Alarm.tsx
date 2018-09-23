import * as React from 'react';
import { IMemberModel } from '../../constance/models';


/**
 * @author:Giljoonsung
 * @since:2018.09.10
 * @version:2018.09.10
 */


interface IProps {
    test: string
}
interface IState {

    alarmId: string
    usdate: string
    mentioned: boolean
    reqFriendship: boolean
    checked: boolean
    actor_id: IMemberModel
    receiver: IMemberModel

}

class Alarm extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            alarmId: '',
            usdate: '',
            mentioned: false,
            reqFriendship: false,
            checked: false,
            actor_id: {
                id: '',
                profileImg: '',
            },
            receiver: {
                id: '',
                profileImg: '',
            }

        }
    }
}

export default Alarm;