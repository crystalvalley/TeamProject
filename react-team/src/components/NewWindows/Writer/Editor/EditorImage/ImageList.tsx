import * as React from 'react'
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import Scrollbars from 'react-custom-scrollbars';

/**
 * @author : ParkHyeokJoon
 * @since : 2018.09.14
 * @version : 2018.09.14
 */

const style: StyleRulesCallback = (theme: Theme) => ({
    wrapper: {
        flexGrow: 1,
    },
    container: {
        padding: "8px"
    }
})

interface IProps {
    classes: {
        wrapper: string;
        container: string;
    }
    files: File[];
    deleteImage(index:number):void;
}

class ImageList extends React.Component<IProps>{
    constructor(props:IProps){
        super(props);
    }
    public render() {
        const { classes } = this.props;
        return (
            <Scrollbars
                className={classes.wrapper}
                autoHide={true}
            >
                <p>
                    더블클릭하면 삭제됩니다.
                </p>
                <div
                    className={classes.container}
                >
                    {
                        this.props.files.map((file, index) => {
                            const handler = ()=>this.props.deleteImage(index);
                            return (
                                <div
                                    onDoubleClick={handler}
                                    key={index} style={{ overflow: "wrap" }}
                                >
                                    <img src={URL.createObjectURL(file)} style={{ width: "100%" }} />
                                </div>
                            );
                        })
                    }
                </div>
            </Scrollbars>
        );
    }
}

export default withStyles(style)(ImageList);