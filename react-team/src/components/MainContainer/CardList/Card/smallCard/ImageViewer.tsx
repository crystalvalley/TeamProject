import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { IPhotoModel, ROOTURL } from '../../../../../constance/models';

const style: StyleRulesCallback = (theme: Theme) => ({

})

interface IProps {
    classes: {

    },
    photos: IPhotoModel[]
    width: number
}

interface IState {
    show: number,
    files: string[],
}

class ImageViewer extends React.Component<IProps, IState>{
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
                    minHeight: this.props.width + "px",
                    maxHeight: "475px",
                    textAlign: "center",
                    lineHeight: this.props.width + "px"
                }}
                onClick={this.changeShow}
            >
                {
                    this.state.files.length === 0 ?
                        "" :
                        <img
                            style={{
                                width: "100%",
                                height: "auto",
                                verticalAlign: "middle",
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

export default withStyles(style)(ImageViewer);