import { createMuiTheme } from "@material-ui/core";


/**
 * @author:ParkHyeokJoon
 * @since:2018.08.14
 * @version:2018.08.14
 * 
 */

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