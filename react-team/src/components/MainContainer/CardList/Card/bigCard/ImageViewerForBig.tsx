import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { IPhotoModel, ROOTURL } from '../../../../../constance/models';

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    },
    photos: IPhotoModel[]
    width: number,
    height:number
}

interface IState {
    show: number,
    files: string[],
}

class ImageViewerForBig extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            show: 0,
            files: [],
        }
        this.changeShow = this.changeShow.bind(this);
    }
    public componentDidMount() {
        const files: string[] = []
        for (const photo of this.props.photos) {
            const xhr = new XMLHttpRequest();
            xhr.open("GET", ROOTURL+"/resources" + photo.url);
            xhr.responseType = "blob";
            xhr.addEventListener("load", () => {
                files.push(URL.createObjectURL(xhr.response));
                this.setState({
                    files,
                })
            })
            xhr.send();
        }
    }
    public render() {
        const { show } = this.state;
        return (
            <div
                style={{
                    width: this.props.width,
                    flexBasis:this.props.height+"px",
                    maxHeight:this.props.height
                }}
                onClick={this.changeShow}
            >
                {
                    this.state.files.length === 0 ?
                        this.state.files.length :
                        <img
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "contain",
                            }}
                            src={this.state.files[show]}
                        />
                }
            </div>
        );
    }
    private changeShow() {
        let show = this.state.show + 1;
        if (show === this.props.photos.length) { show = 0 }
        this.setState({
            show
        })
    }
}

export default withStyles(style)(ImageViewerForBig);