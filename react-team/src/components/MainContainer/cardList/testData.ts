import { ICardContainerModel } from "../../../constance/models";

export const testData: ICardContainerModel = {
    order: ["list1", "list2","list3","list4"],
    lists: {
        list1: [
            {
                id: 0,
                content: "cont1",
                hitcount: 0,
                image: "",
                sound: "",
                title: "title1",
                updateDaty: "",
                writeDay: ""
            },
            {
                id: 1,
                content: "cont2",
                hitcount: 0,
                image: "",
                sound: "",
                title: "title2",
                updateDaty: "",
                writeDay: ""
            }
        ],
        list2: [
            {
                id: 2,
                content: "cont3",
                hitcount: 0,
                image: "",
                sound: "",
                title: "title3",
                updateDaty: "",
                writeDay: ""
            }
        ],
        list3: [
            {
                id: 2,
                content: "cont4",
                hitcount: 0,
                image: "",
                sound: "",
                title: "title4",
                updateDaty: "",
                writeDay: ""
            }
        ],
        list4: [
            {
                id: 2,
                content: "cont5",
                hitcount: 0,
                image: "",
                sound: "",
                title: "title5",
                updateDaty: "",
                writeDay: ""
            }
        ]
    }
}