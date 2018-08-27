
/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.17
 * 
 */
export interface IMsgModel{
    msg : string;
}
// 메인화면에 보여질 카드 container 모델
export interface ICardContainerModel{
    order : string[];
    lists : {
        [propName : string] : ICardModel[];
    }
}

// Board도 겸함,
// title이 없으면 Card, 있으면 Board
export interface ICardModel{
    id:number;
    title:string;
    content:string;
    // url
    sound:string;
    // image
    image:string;
    writeDay:string;
    updateDaty:string;
    hitcount:number;
}

export interface IMemberModel{
    id : string;
    avatar : string;
}

export interface IPhotoModel{
    id:number;
    url:string;
}