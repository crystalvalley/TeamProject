
/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.16
 * 
 */
export interface IMsgModel{
    msg : string;
}

export interface ICardModel{
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