import * as React from 'react';
import { StyleRulesCallback, Theme, withStyles, TextField, Button, Typography } from '@material-ui/core';

const style: StyleRulesCallback = (theme: Theme) => ({
    backGround: {
        height: "100%"
    },
    formBox: {
        position: "absolute",
        width: "420px",
        height:"460px",
        margin:"auto",
        top:0,
        left:0,
        bottom:0,
        right:0,
        zIndex: 99,
        background: "transparent",
        borderRadius: ".25em .25em .4em .4em",
        textAlign: "center",
        boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        color: "#fff"
    },
    form: {
        padding: "30px",
        paddingTop: "60px",
        backgroundColor: "white",
    },
    textField: {
        marginBottom: "45px"
    },
    head: {
        textAlign: "center",
        opacity: 0.7,
        padding: "30px",
        backgroundColor: "#3F51B5",
        color: "#ecf0f1"
    },
    headTyphoRoot: {
        color: "white"
    },
    footer: {
        opacity: 0.7,
        padding: "10px",
        marginTop: "-16px",
        lineHeight: "25px",
        backgroundColor: "#737fc5"
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
        backgroundColor: "#03a9f4",
    },
    rightTop: {
        position:"absolute",
        top:0,
        right:0,
        width: 0,
        height: 0,
        borderTop: "50vh solid #3F51B5",
        borderLeft: "50vw solid transparent"
    },
    rightTopInner: {
        position:"absolute",
        top:0,
        right:0,
        width: 0,
        height: 0,
        opacity:0.5,
        borderTop: "75vh solid #3F51B5",
        borderLeft: "55vw solid transparent"
    },
    leftBottom: {
        position:"absolute",
        left:0,
        bottom:0,
        width: 0,
        height: 0,
        borderBottom: "50vh solid #3F51B5",
        borderRight: "50vw solid transparent"
    },
    leftBottomInner: {
        position:"absolute",
        left:0,
        bottom:0,
        width: 0,
        height: 0,
        opacity:0.5,
        borderBottom: "75vh solid #3F51B5",
        borderRight: "55vw solid transparent"
    },
})

interface IProps {
    classes: {
        backGround: string;
        formBox: string;
        form: string;
        head: string;
        textField: string;
        footer: string;
        btnRoot: string;
        headTyphoRoot: string;
        rightTop: string;
        leftBottom: string;
        leftBottomInner:string;
        rightTopInner:string;
    }
}


class SignIn extends React.Component<IProps> {
    public render() {
        const { classes } = this.props;
        return (
            <div className={classes.backGround}>
                <div className={classes.leftBottom} />
                <div className={classes.rightTop} />
                <div className={classes.leftBottomInner} />
                <div className={classes.rightTopInner} />
                <div className={classes.formBox}>
                    <div className={classes.head}>
                        <Typography
                            classes={{
                                root: classes.headTyphoRoot
                            }}
                        >
                            <h1>SNS LOGIN</h1>
                        </Typography>
                    </div>
                    <form
                        action="http://localhost:8081/login"
                        method="get"
                        className={classes.form}
                    >
                        <TextField
                            name="userid"
                            className={classes.textField}
                            fullWidth={true}
                            label="Username"
                        />
                        <br />
                        <TextField
                            name="password"
                            className={classes.textField}
                            fullWidth={true}
                            type="Password"
                            label="Password"
                        />
                        <br />
                        <Button
                            type="submit"
                            variant="contained"
                        >
                            Subscribe
                        </Button>
                    </form>
                    <div className={classes.footer}>
                        <Typography>
                            Powered By SCI
                        </Typography>
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(style)(SignIn);