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
            main: '#ffff99',
            dark: '#ffffff',
            contrastText: '#0000ff',
        },
    },
    overrides:{
        MuiTypography:{
            title :{
                color:"#343434"
            },
            button:{
                color:"blue"
            }
        }

    }
});