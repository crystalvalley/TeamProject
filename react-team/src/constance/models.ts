
/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.17
 * 
 */
export interface IMsgModel {
    type: string;
    destination: IMemberModel[];
    sender: string;
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
    // image
    image: string;
    writeDay: string;
    updateDaty: string;
    hitcount: number;
}

export interface IMemberModel {
    id: string;
    profileImg: string;
    username: string;
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
    chat:IMsgModel[];
}

export interface IRoomMemberModel{
    member : IMemberModel;
}