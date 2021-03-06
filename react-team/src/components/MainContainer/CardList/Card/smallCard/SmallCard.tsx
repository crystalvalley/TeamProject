import * as React from 'react';
import { Card, CardContent, withStyles, StyleRulesCallback, Theme, Avatar, Typography, IconButton, } from '@material-ui/core';
import { Editor, EditorState, convertFromRaw } from 'draft-js';
import { ICardModel, ROOTURL } from '../../../../../constance/models';
import { SNSDecorator } from '../../../../NewWindows/Writer/Editor/Decorator';
import EmotionBox from './EmotionBox';
import BigCard from '../bigCard/BigCard';
import FavoriteIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FilledFavoriteIcon from "@material-ui/icons/Favorite";
import { IFavoriteStore, withFavoriteContext } from '../../../../../contexts/FavoriteContext';
import WriterClickMenu from './WriterClickMenu';
import ImageViewer from './ImageViewer';


/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.29
 * @version : 2018.09.06
 * 
 */
const style: StyleRulesCallback = (theme: Theme) => ({
    card: {
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
        textAlign: "center",
        fontSize: "20px",
        fontFamily: "Jua, snas-serif"
    },
    cardBody: {
        padding: "12px",
    },
    content: {
        overflow: "hidden",
        maxHeight: "475px",
        fontFamily: "Sunflower,sans-serif"
    },
    username: {
        color: "black",
        fontFamily: "Roboto,sans-serif",
    },
});

interface IProps {
    classes: {
        card: string;
        avatar: string;
        cardHead: string;
        title: string;
        cardBody: string;
        content: string;
        username: string;
    }
    card: ICardModel,
    personal?: boolean,
    boardRefresh(): void
}

interface IState {
    editorState: EditorState;
    bigger: boolean;
    cutted: boolean;
    open: boolean;
}


class SmallCard extends React.Component<IProps & IFavoriteStore, IState>{
    private anchor: HTMLSpanElement | null;
    private ref: HTMLDivElement | null;
    private imgWidth: HTMLDivElement | null;
    constructor(props: IProps & IFavoriteStore) {
        super(props);
        let sub: EditorState;
        try {
            sub = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.card.content)), SNSDecorator)
        } catch{
            sub = EditorState.createEmpty(SNSDecorator)
        }
        this.state = {
            bigger: false,
            editorState: sub,
            cutted: false,
            open: false
        }
        this.closeModal = this.closeModal.bind(this);
        this.editorChange = this.editorChange.bind(this);
        this.openModal = this.openModal.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
    }
    public componentDidMount() {
        if (this.props.card.photos.length > 0) { return }
        if (this.ref!.offsetHeight > 475 && this.state.cutted === false) {
            this.setState({
                cutted: true
            })
        } else if (this.ref!.offsetHeight <= 475 && this.state.cutted === true) {
            this.setState({
                cutted: false
            })
        }
    }

    public render() {
        const { classes, card } = this.props;
        const writeHandler = () => this.openModal(0);
        const handler = () => this.props.setFavorite(this.props.card.id)
        return (
            <Card className={classes.card} style={{ width: this.props.personal ? "100%" : "", maxWidth: this.props.personal ? "" : "500px" }}>
                <div
                    className={classes.cardHead}
                >
                    <Avatar
                        className={classes.avatar}
                        onClick={this.openMenu}
                        src={ROOTURL + "/resources" + card.writer.profileImg}
                    />
                    <Typography
                        onClick={this.openMenu}
                        className={classes.username}
                    >
                        <span ref={(element) => { this.anchor = element }} />
                        {card.writer.id}
                    </Typography>
                    <IconButton
                        style={{
                            right: 24,
                            position: "absolute"
                        }}
                        onClick={handler}
                    >
                        {this.props.favorites.indexOf(this.props.card.id) === -1 ?
                            <FavoriteIcon /> :
                            <FilledFavoriteIcon style={{ color: "red" }} />

                        }
                    </IconButton>
                    <BigCard
                        boardRefresh={this.props.boardRefresh}
                        addFavorite={handler}
                        favorited={this.props.favorites.indexOf(this.props.card.id) === -1}
                        card={this.props.card}
                        open={this.state.bigger}
                        onClose={this.closeModal}
                    />
                </div>
                <div
                    ref={(element) => { this.imgWidth = element }}
                    className={classes.cardBody}
                >
                    <Typography
                        className={classes.title}
                        onClick={writeHandler}
                    >
                        {card.title}
                    </Typography>
                    {
                        this.props.card.photos.length > 0 ?
                            <ImageViewer
                                id={this.props.card.id}
                                width={this.imgWidth !== undefined ? this.imgWidth!.offsetWidth - 24 : 0}
                                photos={this.props.card.photos}
                            /> :
                            (
                                <CardContent
                                    className={classes.content}
                                >
                                    <div
                                        ref={(element) => { this.ref = element }}
                                    >
                                        <Editor
                                            readOnly={true}
                                            editorState={this.state.editorState}
                                            onChange={this.editorChange}
                                        />
                                    </div>
                                </CardContent>
                            )
                    }
                </div>
                <CardContent>
                    <EmotionBox
                        id={this.props.card.id}
                    />
                </CardContent>
                <WriterClickMenu
                    left={0}
                    top={60}
                    anchor={this.anchor}
                    open={this.state.open}
                    closeMenu={this.closeMenu}
                    id={card.writer.id}
                />
            </Card>
        );
    }
    private openMenu() {
        this.setState({
            open: true
        })
    }
    private closeMenu() {
        this.setState({
            open: false
        })
    }
    private openModal(clicked: number) {
        this.setState({
            bigger: true
        })
    }
    private closeModal() {
        this.setState({
            bigger: false
        })
    }
    private editorChange(es: EditorState) {
        this.setState({
            editorState: es,
        })
    }
}
export default withFavoriteContext(withStyles(style)(SmallCard));
