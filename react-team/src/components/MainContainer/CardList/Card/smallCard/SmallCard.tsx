import * as React from 'react';
import { Card, CardContent, withStyles, StyleRulesCallback, Theme, Avatar, Typography } from '@material-ui/core';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { ICardModel } from '../../../../../constance/models';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
import EmotionBox from './EmotionBox';
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.29
 * @version : 2018.09.03
 * 
 */
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
        padding: "12px"
    },
    avatar: {
        marginRight: "10px"
    },
    title: {
        textAlign: "center"
    },
    cardBody: {
        padding: "12px"
    }
});

interface IProps {
    classes: {
        card: string;
        avatar: string;
        cardHead: string;
        title: string;
        cardBody: string;
    }
    card: ICardModel
}

interface IState {
    editorState: EditorState;
}


class SmallCard extends React.Component<IProps, IState>{
    constructor(props: IProps) {
        super(props);
        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.card.content)), SNSDecorator),
        }
        this.editorChange = this.editorChange.bind;
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
                        src={"http://localhost:8081/resources" + card.writer.profileImg}
                    />
                    <Typography>
                        {card.writer.id}
                    </Typography>
                </div>
                <div
                    className={classes.cardBody}
                >
                    <Typography
                        className={classes.title}
                    >
                        {card.title}
                    </Typography>
                    <CardContent>
                        <Editor
                            readOnly={true}
                            editorState={this.state.editorState}
                            onChange={this.editorChange}
                        />
                    </CardContent>
                </div>
                <CardContent>
                    <EmotionBox 
                        id={this.props.card.id}
                    />
                </CardContent>
                <CardContent>
                    메뉴
                </CardContent>
            </Card>
        );
    }
    private editorChange(es: EditorState) {
        this.setState({
            editorState: es
        })
    }
}
export default withStyles(style)(SmallCard);