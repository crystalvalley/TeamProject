import * as React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';



interface IState{
    open:boolean
}
export default class FriConfirm extends React.Component<{},IState>{
    constructor(props:{}){
        super(props)
        this.state={
            open:false
        }
        this.openMenu = this.openMenu.bind(this);
        this.handleClose  = this.handleClose.bind(this);
    }

    public openMenu(){
        this.setState({open:true})
    }
    public handleClose(){
        this.setState({open:false})
    }

    public render(){
        return(
            <div>
        <Button  onClick={this.openMenu}>확인</Button>
        <Dialog
         fullScreen={false}
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="responsive-dialog-title"
        >
         
          <DialogTitle id="responsive-dialog-title">{"친구가 될래요??"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              친구 요청을 받아들이시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.handleClose} color="primary" autoFocus={true}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>


            </div>
        
        )
    }
}