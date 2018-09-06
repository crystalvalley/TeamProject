import * as React from 'react';
import { TextField } from '@material-ui/core';
import { IMemberModel } from '../../../../constance/models';

interface IProps {
   member : IMemberModel
}


class Exam extends React.Component<IProps>{
    constructor(props: IProps) {
        super(props);
        this.state={

        }

    }
    public render() {
        return (
            <div>
                <TextField>
                    {this.props.member.id}
                </TextField>

                <TextField>
                    {this.props.member.name}
                </TextField>

                <TextField> 
                    {this.props.member.profileImg}
                </TextField>
            </div>

        )
    }
}
export default (Exam)