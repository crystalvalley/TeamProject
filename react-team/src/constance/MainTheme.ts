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
            primary: "#606060",
            secondary:"#909090"
        },
        // 배경
        background: {
            default: "#cf9f9",
            paper: "#ffffff",
        },
        primary: {
            light: '#9900ff',
            main: '#ffcccc',
            dark: '#9900ff',
            contrastText: '#303030',
        },
    },
    overrides:{
        MuiTypography:{
            title :{
                color:"#ffcccc"
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