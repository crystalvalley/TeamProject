import * as React from 'react';
import { ListItem, ListItemText, Avatar, Button } from "@material-ui/core";

/**
 * @author:KimMinJeong
 * @since:2018.08.28
 * @version:2018.08.30
 * 사용자가 팔로우하는 친구목록
 */


export const forming = (
    <div>
        <ListItem>
            <Avatar src=""/>

            <ListItemText primary="" />
            <Button size="small">
             들어가보기                                    
            </Button>

            <Button size="small">
             친구끊기                          
            </Button>
        </ListItem>

         <ListItem>
            <Avatar src="" />

            <ListItemText primary="" />
            <Button size="small">
            들어가보기                                       
            </Button>

            <Button size="small">
            친구끊기                          
            </Button>
        </ListItem>
    </div>

);