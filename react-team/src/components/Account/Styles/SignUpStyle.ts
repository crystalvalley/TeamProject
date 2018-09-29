import { StyleRulesCallback, Theme } from "@material-ui/core";
/**
 * @author : ParkHyeokJoon
 * @since : 18.08.14
 * @version : 18.08.14
 */
/**
 * @author:Kim MinJeong
 * @version:2018.09.29
 */

// 커스텀 style
export const signUpStyle: StyleRulesCallback = (theme: Theme) => ({
    // className : {속성들}
    backGround: {
        height: "100%"
    },
    formBox: {
        position: "absolute",
        width: "420px",
        height: "595px",
        margin: "auto",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        zIndex: 99,
        background: "transparent",
        borderRadius: ".25em .25em .4em .4em",
        textAlign: "center",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        color: "#fff"
    },
    rightTop: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderTop: "50vh solid #ffcccc",
        borderLeft: "50vw solid transparent"
    },
    rightTopInner: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        opacity: 0.5,
        borderTop: "75vh solid #ffcccc",
        borderLeft: "55vw solid transparent"
    },
    leftBottom: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: 0,
        height: 0,
        borderBottom: "50vh solid #ffcccc",
        borderRight: "50vw solid transparent"
    },
    leftBottomInner: {
        position: "absolute",
        left: 0,
        bottom: 0,
        width: 0,
        height: 0,
        opacity: 0.5,
        borderBottom: "75vh solid #ffcccc",
        borderRight: "55vw solid transparent"
    },
    head: {
        textAlign: "center",
        opacity: 0.7,
        padding: "30px",
        backgroundColor: "#ff6666",
        color: "#ecf0f1"
    },
    footer: {
        opacity: 0.7,
        padding: "10px",
        marginTop: "-16px",
        lineHeight: "25px",
        backgroundColor: "#ff6666"
    },
    form: {
        padding: "30px",
        paddingTop: "60px",
        backgroundColor: "white",
    },
    textField: {
        marginBottom: "15px"
    },
    btnRoot: {
        position: "relative",
        padding: "8px 45px",
        lineHeight: "30px",
        overflow: "hidden",
        borderWidth: 0,
        outline: "none",
        borderRadius: "2px",
        boxShadow: "0 1px 4px rgba(0, 0, 0, .6)",
        backgroundColor: "#fff",
       
    },
    headTyphoRoot: {
        color: "white"
    },
})