import * as React from 'react';
import { IPhotoModel, ROOTURL } from '../constance/models';

export interface IBoardStore {
    savedBoardImg: {
        [boardId: number]: {
            show: number,
            img: string[]
        }
    },
    saveBoard(phtos: IPhotoModel[], id: number): void,
    setShow(id: number): void;
}

const saveImageContext = React.createContext<IBoardStore>({
    savedBoardImg: {},
    saveBoard: (phtos: IPhotoModel[], id: number) => { return },
    setShow: (id: number) => { return; }
});

export default class SaveBoardContextProvider extends React.Component<{}, IBoardStore>{
    constructor(props: {}) {
        super(props);
        this.saveImage = this.saveImage.bind(this);
        this.setShow = this.setShow.bind(this);
        this.saveImage = this.saveImage.bind(this);
        this.state = {
            savedBoardImg: {},
            saveBoard: this.saveImage,
            setShow: this.setShow
        };
    }

    public render() {
        return (
            <saveImageContext.Provider value={this.state}>
                {this.props.children}
            </saveImageContext.Provider>
        );
    }
    private saveImage(photos: IPhotoModel[], id: number) {
        const files: string[] = []
        for (const photo of photos) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", ROOTURL + "/resources" + photo.url);
            xhr.responseType = "blob";
            xhr.addEventListener("load", () => {
                files.push(URL.createObjectURL(xhr.response));
                this.setState({
                    savedBoardImg: {
                        ...this.state.savedBoardImg,
                        [id]: {
                            img: files,
                            show: 0
                        }
                    }
                })
            })
            xhr.send();
        }
    }

    private setShow(id: number) {
        let show = this.state.savedBoardImg[id].show + 1;
        if (show === this.state.savedBoardImg[id].img.length) { show = 0 }
        this.setState({
            savedBoardImg: {
                ...this.state.savedBoardImg,
                [id]: {
                    img: this.state.savedBoardImg[id].img,
                    show
                }
            }
        })

    }
}

export function withSaveBoardContext<P extends IBoardStore>(Component: React.ComponentType<P>) {
    return function wrappedComponent(props: Pick<P, Exclude<keyof P, keyof IBoardStore>>) {
        return (
            <saveImageContext.Consumer>
                {
                    value =>
                        <Component {...value} {...props} />
                }
            </saveImageContext.Consumer>
        );
    }
}