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
            primary: "#000000",
            secondary:"white"
        },
        // 배경
        background: {
            default: "#ffffff",
            paper: "#ffffff",
        },
        primary: {
            light: '#9900ff',
            main: '#9900ff',
            dark: '#9900ff',
            contrastText: '#000000',
        },
    },
    overrides:{
        MuiTypography:{
            title :{
                color:"#000000"
            },
            button:{
                color:"blue"
            }
        },
        MuiSnackbarContent:{
            root:{
                width:"5vw"
            }
        },

    }
});