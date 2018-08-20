import * as React from 'react';
import { EditorState, convertFromRaw, Editor } from 'draft-js';
import { Theme, withStyles } from '@material-ui/core';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.20
 * @version : 2018.08.20
 */
const style = (theme:Theme)=>({    
    text: {
        border: "1px solid black",
        flexGrow: 1,
        marginBottom: "1vh"
    },
})

interface IProps{
    classes:{
      text:string;  
    },
    content:string;
}
interface IState{
    editorState : EditorState
}

class Viewer extends React.Component<IProps,IState>{
    constructor(props:IProps){
        super(props);
        this.state={
            editorState : EditorState.createEmpty()
        }
        this.editorChange = this.editorChange.bind(this);
    }
    public componentWillReceiveProps(nextProps: IProps){
        if(nextProps.content!==""||nextProps.content!==null){
            const getContent = EditorState.createWithContent(
                convertFromRaw(JSON.parse(nextProps.content))
            )
            this.editorChange(getContent);
        }else{return;}
    }
    public render(){
        const {classes} = this.props;
        return(
            <div className={classes.text}>
                <Editor
                    readOnly={true} 
                    editorState={this.state.editorState}
                    onChange={this.editorChange}
                />
            </div>
        );
    }
    private editorChange(e : EditorState){
        this.setState({
            editorState : e
        })
    }
}

export default withStyles(style)(Viewer);