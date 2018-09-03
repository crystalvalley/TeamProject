import * as React from 'react';
import { Card, CardContent, withStyles, StyleRulesCallback, Theme, Avatar, Typography } from '@material-ui/core';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { ICardModel } from '../../../../../constance/models';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';

const style: StyleRulesCallback = (theme: Theme) => ({
    card: {
        maxWidth: 500,
        flexShrink: 0,
        borderRadius: "20px",
        boxShadow: "2px 2px 3px 3px lightgrey",
        marginTop: "25px"
    },
    cardHead: {
        display: "flex",
        alignItems: "center",
        padding:"12px"
    },
    avatar:{
        marginRight:"10px"
    }
});

interface IProps {
    classes: {
        card: string;
        avatar: string;
        cardHead: string;
    }
    card:ICardModel
}

interface IState{
    editorState : EditorState;
}


class SmallCard extends React.Component<IProps,IState>{
    constructor(props: IProps) {
        super(props);
        this.state={
            editorState : EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.card.content)),SNSDecorator)
        }
        this.editorChange=this.editorChange.bind;
    }
    public render() {
        const { classes, card } = this.props;
        return (
            <Card className={classes.card}>
                <div
                    className={classes.cardHead}
                >
                    <Avatar
                        className={classes.avatar}
                        src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&h=350"
                    />
                    <Typography>
                        {card.title}
                    </Typography>
                </div>
                <CardContent>
                    <Editor
                        readOnly={true}
                        editorState={this.state.editorState}
                        onChange={this.editorChange}
                    />
               </CardContent>
                <CardContent>
                    감정표현파트
              </CardContent>
                <CardContent>
                    메뉴
                </CardContent>
            </Card>
        );
    }
    private editorChange(es: EditorState){
        this.setState({
            editorState : es
        })
    }
}
export default withStyles(style)(SmallCard);