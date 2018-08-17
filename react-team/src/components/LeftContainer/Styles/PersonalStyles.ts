import { StyleRulesCallback, Theme } from "@material-ui/core";
/**
 * @author : ParkHyeokJoon
 * @since : 2018.08.17
 * @version : 2018.08.17
 */


export const personalStyle: StyleRulesCallback = (theme: Theme) => ({
    avatar: {
        margin: "6px",
        width: "60px",
        height: "60px",
        flexGrow: 0,
        flexShrink: 0
    },
    userName: {
        flexGrow: 1,
        position: "relative",
        display: "inline",
        textAlign: "center",
        height: "100%",
        margin: "6px",
        lineHeight: "60px",
        fontSize: "22px",
        fontFamily: "Jua"
    },
    personalMenus: {
        margin: 15,
        padding: 0,
        justifyContent: "center"
    },
    icon: {
        margin: 2,
        color: "blue",
        opacity: 0.5
    }
})