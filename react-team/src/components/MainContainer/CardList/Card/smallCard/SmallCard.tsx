import * as React from 'react';
import { Card, CardContent, withStyles, StyleRulesCallback, Theme, Avatar, Typography, IconButton } from '@material-ui/core';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { ICardModel } from '../../../../../constance/models';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
import EmotionBox from './EmotionBox';
import BigCard from '../bigCard/BigCard';
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FilledFavoriteIcon from "@material-ui/icons/Favorite";
import { IFavoriteStore, withFavoriteContext } from '../../../../../contexts/FavoriteContext';


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
    modalOpen: number;
}


class SmallCard extends React.Component<IProps & IFavoriteStore, IState>{
    constructor(props: IProps & IFavoriteStore) {
        super(props);
        this.state = {
            modalOpen: -1,
            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.card.content)), SNSDecorator),
        }
        this.closeModal = this.closeModal.bind(this);
        this.editorChange = this.editorChange.bind;
        this.openModal = this.openModal.bind(this);
    }

    public render() {
        const { classes, card } = this.props;
        const writeHandler = () => this.openModal(0);
        const { modalOpen } = this.state;
        const handler = ()=>this.props.setFavorite(this.props.card.id)
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
                    <IconButton
                        style={{
                            right:24,
                            position:"absolute"
                        }}
                        onClick={handler}
                    >
                        {this.props.favorites.indexOf(this.props.card.id) === -1 ?
                            <FavoriteIcon /> :
                            <FilledFavoriteIcon />
                        
                    }
                    </IconButton>
                    <BigCard
                        open={modalOpen === 0}
                        onClose={this.closeModal}
                    />
                </div>

                <div onClick={writeHandler}
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
    private openModal(clicked: number) {
        this.setState({
            modalOpen: clicked
        })
    }
    private closeModal() {
        this.setState({
            modalOpen: -1
        })
    }
    private editorChange(es: EditorState) {
        this.setState({
            editorState: es
        })
    }
}
export default withFavoriteContext(withStyles(style)(SmallCard));
