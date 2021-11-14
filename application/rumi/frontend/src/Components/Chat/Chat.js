import React from 'react';

import {ChatEngine} from 'react-chat-engine';
import './chat.css';
import ChatFeed from './ChatFeed.js';

const Chat = () =>{
    return (
    	<ChatEngine
			height='100vh'
			userName='rumichat'
			userSecret='123123'
			projectID='0aaa01bf-ebf8-4269-9d8b-78e64e5fea25'
            renderChatFeed={(chatAppProps)=><ChatFeed {...chatAppProps}/>}
		/>
    )
}
export default Chat;