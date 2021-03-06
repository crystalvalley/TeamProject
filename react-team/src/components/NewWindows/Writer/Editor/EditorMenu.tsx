import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { EditorState } from 'draft-js';
import Dropzone from 'react-dropzone';
import ImageList from './EditorImage/ImageList';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.20
 * @version : 2018.09.14
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        height: "100%"
    },
    buttons: {
        display: "flex",
        minHeight: "50px",
        border: "1px solid black",
        margin: "5px"
    },
    audio: {
        display: "flex",
        minHeight: "50px",
        border: "1px solid black",
        flexBasis: "10%",
        margin: "5px"
    },
    photos: {
        display: "flex",
        minHeight: "50px",
        border: "1px solid black",
        borderRadius:"15px",
        margin: "5px",
        flexDirection: "column"
    }
})

interface IProps {
    classes: {
        container: string;
        photos: string;
        buttons: string;
        audio: string;

    }
    title: string;
    editorState: EditorState;
    writer: string;
    files: File[];
    deleteImage(index: number): void;
    onDrop(files: File[]): void;
}


class EditorMenu extends React.Component<IProps> {
    constructor(props: IProps) {
        super(props);
        this.state = {
            files: []
        }
        this.onDrop = this.onDrop.bind(this);
    }
    public render() {
        const { classes } = this.props
        return (
            <div
                className={classes.container}
            >
            
                <div
                    className={classes.photos}
                >
                    <Dropzone
                        style={{ width: "100%" }}
                        onDrop={this.props.onDrop}
                    >
                        <p>Drop here</p>
                    </Dropzone>
                </div>
                <ImageList
                    deleteImage={this.props.deleteImage}
                    files={this.props.files}
                />
            </div>
        );
    }
    private onDrop(files: File[]) {
        this.setState({
            files
        })
    }
}

export default withStyles(style)(EditorMenu);