export interface IBoxData{
    boxes : {
        // 박스 이름, 그 박스에 들어가는 리스트들
        [name : string] : string[]
    },
    order : string[]
}