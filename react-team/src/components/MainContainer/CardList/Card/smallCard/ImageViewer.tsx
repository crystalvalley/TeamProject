import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { IPhotoModel } from '../../../../../constance/models';
import { IBoardStore, withSaveBoardContext } from '../../../../../contexts/SaveBoardContext';

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    },
    id: number
    photos: IPhotoModel[]
    width: number
}


class ImageViewer extends React.Component<IProps & IBoardStore>{
    constructor(props: IProps & IBoardStore) {
        super(props);
        if (!this.props.savedBoardImg[this.props.id]) {
            this.props.saveBoard(this.props.photos, this.props.id);
        }
    }
    public render() {
        const { savedBoardImg, id } = this.props
        const handler = () => { this.props.setShow(this.props.id) }
        return (
            <div
                style={{
                    minHeight: this.props.width + "px",
                    maxHeight: "475px",
                    textAlign: "center",
                    lineHeight: this.props.width + "px"
                }}
                onClick={handler}
            >
                {
                    savedBoardImg[id] ?
                        savedBoardImg[id].img.length === 0 ?
                            "" :
                            <img
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    verticalAlign: "middle",
                                    objectFit: "contain",
                                }}
                                src={savedBoardImg[id].img[savedBoardImg[id].show]}
                            /> : ""
                }
            </div>
        );
    }
}

export default withSaveBoardContext(withStyles(style)(ImageViewer));