import * as React from 'react'
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import Axios from 'axios';

interface IProp{
    target:string
}

interface IState{
    open:boolean
}
export default class FriConfirm extends React.Component<IProp,IState>{
    constructor(props:IProp){
        super(props)
        this.state={
            open:false
        }
        this.openMenu = this.openMenu.bind(this);
        this.ahandleClose  = this.ahandleClose.bind(this);
        this.dhandleClose  = this.dhandleClose.bind(this);
    }

    public openMenu(){
        this.setState({open:true})
    }
    public ahandleClose(){
        this.saveFriend();
        this.setState({open:false})
    }
    public dhandleClose(){
        
        this.setState({open:false})
    }
    public saveFriend(){
        Axios.get("http://localhost:8081/networks/acceptFriend",{
            params: {
                target:this.props.target
            }
            
        }).then(()=>{alert("친구 됐다~")})
        
    }

    public render(){
        return(
            <div>
        <Button  onClick={this.openMenu}>확인</Button>
        <Dialog
         fullScreen={false}
          open={this.state.open}
          onClose={this.dhandleClose}
          aria-labelledby="responsive-dialog-title"
        >
         
          <DialogTitle id="responsive-dialog-title">{"친구가 될래요??"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              친구 요청을 받아들이시겠습니까?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.dhandleClose} color="primary">
              Disagree
            </Button>
            <Button onClick={this.ahandleClose} color="primary" autoFocus={true}>
              Agree
            </Button>
          </DialogActions>
        </Dialog>


            </div>
        
        )
    }
}