import * as React from 'react';
import { Theme, StyleRulesCallback, withStyles, Typography, Modal, Button } from '@material-ui/core';


function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }


const styles: StyleRulesCallback = (theme: Theme) => ({
    paper: {
        position: 'absolute',
        width: theme.spacing.unit * 50,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing.unit * 4,
      },
    Typography: {
      color: "black"
    }

})

interface IProps{
    classes:{
        paper: string;
        Typography:string;
    }
    
}

interface IState{
        open:boolean;
        
}

class LargeCardView extends React.Component<IProps, IState>{
    constructor (props: IProps){
        super(props)
        this.state = {
            open: false,
            
          };
          this.handleOpen = this.handleOpen.bind(this);
          this.handleClose = this.handleClose.bind(this);
    }

      public handleOpen = () => {
        this.setState({ open: true });
      };
    
      public handleClose = () => {
        this.setState({ open: false });
      };

        
        public render() {
            const { classes } = this.props;
            
            return (
              <div>
                <Typography gutterBottom={true}>모달 예시</Typography>
                <Button onClick={this.handleOpen}>Open Modal</Button>
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.open}
                  onClose={this.handleClose}
                >
                  <div style={getModalStyle()} className={classes.paper}>
                    <Typography variant="title" id="modal-title" className={classes.Typography}>
                      Modal
                    </Typography>
                    <Typography variant="subheading" id="simple-modal-description">
                      이제 여기에 카드뷰 넣으면 됨
                    </Typography>
                    
                  </div>
                </Modal>
              </div>
            );
          }
    }

/*LargeCardView.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  */

export default withStyles(styles)(LargeCardView);