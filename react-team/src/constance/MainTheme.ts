import { createMuiTheme } from "@material-ui/core";


// A theme with custom primary and secondary color.
// It's optional.
export const mainTheme = createMuiTheme({
    palette: {
        text: {
            primary: "#000000"
        },
        // 배경
        background: {
            default: "#ffffff",
            paper: "#ffffff",
        },
        primary: {
            light: '#fffff7',
            main: '#fff9c4',
            dark: '#cbc693',
            contrastText: '#ffffff',
        },
    },
    overrides:{
        MuiTypography:{
            title :{
                color:"red"
            },
            button:{
                color:"blue"
            }
        }

    }
});