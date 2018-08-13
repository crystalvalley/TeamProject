import * as React from 'react';
import { withStyles, TextField, Button, Typography } from '@material-ui/core';
import { signInStyle } from './SignInStyle';

/**
 * @author : ParkHyeokJoon
 * @since : 18.08.13
 * @version : 18.08.13
 */

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

export default withStyles(signInStyle)(SignIn);