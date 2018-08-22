import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, Toolbar} from '@material-ui/core';
import { ICardModel, IPhotoModel } from '../../../constance/models';

const style: StyleRulesCallback = (theme: Theme) => ({
    viewContainer: {
        backgroundColor: "white",
        height: "100%",
        padding: "10px",
        boxShadow: "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);",
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: " space-around"
    },
    containers: {
        position: "absolute",
        top: "190px",
        right: "300px",
        width: "1100px",
        height: "65px",

    },
    imageContainer : {
       
        height: "80%",
        width: "30%",
        border: "1px solid black"
    },
    imageSize :{
        padding: "10px",
        height: "320px",
        width: "320px"
    },
    replyContainer: {
        padding: "30px",
        top: "230px",
        height: "550px",
        width: "30%",
        border: "1px solid black",
    },
    buttons : {
        position: "absolute",
        top: "820px",
        width: "1100px",
        height: "65px",
        padding: "25px",
        align:"center"
    }
})


interface IProps{
    classes: {
        viewContainer: string;
        wrapper: string;
        containers: string;
        image: string;
        imageContainer: string;
        text: string;
        emotion: string;
        replyWriter: string;
        replyContainer: string;
        writer: string;
        imageSize:string;
        buttons:string
    }
    location: Location;
}

interface IState{
    item: {
        content: ICardModel,
        writer: string,
        image: IPhotoModel[],
    }
}

 class UpdateUser extends React.Component<IProps,IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            item: {
                content: {
                    content: "",
                    hitcount: 0,
                    id: -1,
                    image: "",
                    sound: "",
                    title: "",
                    updateDaty: "",
                    writeDay: "",
                },
                image: [],
                writer: ""
            }
        }
    }
    public render(){
        const { classes } = this.props;
        return (
            <div className={classes.viewContainer}>
            <Toolbar className={classes.containers}
                    style={{
                        border: "1px solid black"
                    }}
                >
                   <div>
                    수정페이지
                    </div>
                </Toolbar>
               
                <div className={classes.imageContainer}>
                <br />
                   <img className={classes.imageSize} src="https://pbs.twimg.com/profile_images/1014241239300861952/AR1Up0pf_400x400.jpg" />
                   <br />
                   <input style={{
                         padding: "50px"
                    }} type="file" />
                </div>

                <div  
                 className={classes.replyContainer}>
                        <h2>[개인정보 수정]</h2><br />
                       <input type="text" value="닉네임"/><br /><br />
                       <input type="text" value="이름"/><br /><br />
                       <input type="text" value="비밀번호"/><br /><br />
                       <input type="text" value="비밀번호 확인"/><br /><br />
                </div>
                <div className={classes.replyContainer}>
                    <textarea>
                        이렇게 넣을까
                    </textarea>
                </div>
                <div className={classes.buttons}
                    >
                    <button> 뒤로가기</button>
                    <button>정보 수정</button>
                </div>
            </div>
        )
    }
}
export default withStyles(style)(UpdateUser);