import * as React from 'react';
import { GridList, GridListTile, TextField } from '@material-ui/core';
import { IMemberModel, ROOTURL, ITagPercentModel } from '../../../../constance/models';
import { ILoginStore, withLoginContext } from '../../../../contexts/LoginContext';
import axios from 'axios';
import { INetworkStore, withNetworkContext } from '../../../../contexts/NetworkContext';
import Allmemberstile from './Allmemberstile';
import Scrollbars from 'react-custom-scrollbars';

/**
 * @author:KimMinJeong
 * @since:2018.09.16
 * @version:2018.09.16
 * 전체 모든 사람들 목록
 */

/**
 * @author:Kim MinJeong
 * @version:2018.09.19
 */

interface IState {
    members: IMemberModel[],
    tags: {
        [id: string]: {
            taginfo: ITagPercentModel[],
            allCount: number
        }
    },
    keyword: string;
}

class AllFriends extends React.Component<INetworkStore & ILoginStore, IState>{
    constructor(props: INetworkStore & ILoginStore) {
        super(props);
        this.state = {
            members: [
                {
                    id: "",
                    profileImg: ""
                }
            ],
            tags: {},
            keyword: ""
        }
        this.onChange = this.onChange.bind(this);
    }

    public componentDidMount() {
        const axiosInstance = axios.create({
            headers: {
                'Cache-Control': 'no-cache'
            }
        })
        axiosInstance.get(ROOTURL + "/members/members").then((result) => {
            let members: IMemberModel[] = []
            let tags: {
                [id: string]: {
                    taginfo: ITagPercentModel[],
                    allCount: number;
                }
            } = {}
            for (const member of result.data.memberlist) {
                members = [...members, member];
                tags = {
                    ...tags,
                    [member.id]: {
                        taginfo: result.data[member.id].taginfo,
                        allCount: result.data[member.id].allCount
                    }
                }
            }
            this.setState({
                members,
                tags
            })
        })
    }

    public render() {
        const filteredList = this.state.members.filter((item) => {
            if (!this.state.tags[item.id]) { return true }
            if (this.state.keyword === "") { return true }
            for (let i = 0; i < this.state.tags[item.id].taginfo.length; i++) {
                const tag = this.state.tags[item.id][i];
                if (i > 2) { return false }
                if (tag.indexOf(this.state.keyword) !== -1) { return true };
            }
            return false;
        })
        return (
            <React.Fragment>
                <TextField
                    style={{
                        width: "25vw"
                    }}
                    onChange={this.onChange}
                    label="search"
                    fullWidth={false}
                />
                <div style={{ height: "3em" }} />
                <Scrollbars autoHide={true}>
                    <GridList cols={4} cellHeight={500} spacing={0}>
                        {
                            filteredList.map((member, index) => {
                                return (
                                    <GridListTile
                                        key={index}
                                    >
                                        <Allmemberstile
                                            tags={this.state.tags[member.id]}
                                            friendInfo={member}
                                            addFriend={this.props.addFriend}
                                        />
                                    </GridListTile>
                                );
                            })
                        }
                    </GridList>
                </Scrollbars>
            </React.Fragment>
        );
    }
    private onChange(e: React.ChangeEvent<HTMLInputElement>) {
        this.setState({
            keyword: e.currentTarget.value
        })
    }
}
export default withNetworkContext(withLoginContext((AllFriends)));