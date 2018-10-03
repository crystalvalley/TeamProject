/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.09.23
 * 
 */
export interface IMsgModel {
    type: string;
    roomId: number;
    destination: IMemberModel[];
    sender: IMemberModel;
    data: any;
}

// Board도 겸함,
// title이 없으면 Card, 있으면 Board
export interface ICardModel {
    id: number;
    writer: IMemberModel;
    title: string;
    content: string;
    // url
    sound: string;
    photos: IPhotoModel[];
    writeDay: string;
    updateDaty: string;
    hitcount: number;
}

export interface IMemberModel {
    id: string;
    profileImg: string;
}

export interface IPhotoModel {
    id: number;
    url: string;
}
export interface IReplyModel {
    id: number;
    // 댓글 쓴사람
    writer: IMemberModel;
    board: ICardModel;
    // url
    sound: string;
    content: string;
    writeDate: string;
    updateDate: string;
}
export interface IConditionModel {
    strategy: string;
    target: string;
}

export interface IRoomModel {
    roomId: number;
    roomMembers: IRoomMemberModel[]
    contentUrl: string;
    chat: IMsgModel[];
}

export interface IRoomMemberModel {
    member: IMemberModel;
    roomName:string;
}


export interface IConditionModel {
    strategy: string;
    target: string;
}
export interface IAlarmModel {
    alarmId: number
    usdate: string
    mentioned: boolean
    reqFriendship: boolean
    checked: boolean
    actor_id: IMemberModel
    receiver: IMemberModel
    board: ICardModel
}

export const ROOTURL = "http://52.231.69.249:8081" 
export const ROOTSOCKETURL = "52.231.69.249:8081" 
// export const ROOTURL = "http://localhost:8081" 
// export const ROOTSOCKETURL = "localhost:8081" 