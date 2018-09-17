import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles } from '@material-ui/core';
import { IPhotoModel } from '../../../../../constance/models';

const style : StyleRulesCallback = (theme:Theme)=>({

})

interface IProps{
    classes :{

    },
    photos : IPhotoModel[]
}

class ImageViewer extends React.Component<IProps>{
    public render(){
        return(
            <div>
                test
            </div>
        );
    }
}

export default withStyles(style)(ImageViewer);