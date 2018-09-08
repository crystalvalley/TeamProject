import * as React from 'react';
import { TextField } from '@material-ui/core';
import { IMemberModel } from '../../../../constance/models';
/**
 * @author:Kim MinJeong
 * @since:2018.08.28
 * @version:2018.08.30
 * 이 파일은 사용X (테스트용)
 */


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