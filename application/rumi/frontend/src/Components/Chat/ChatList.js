import React from "react";
import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import "./Chat.css";

class ChatListComponent extends React.Component {
    render() {
        if (this.props.chats.length > 0) {
            return (
                <div className="chatlist-container">
                    <button variant="contained" fullWidth color="primary" onClick={this.newChat} className="chat-btn">
                        New Message
                    </button>
                    <div>
                        {this.props.chats.map((_chat, _index) => {
                            return (
                                <div key={_index}>
                                    <div
                                        onClick={() => this.selectChat(_index)}
                                        className="chat-list-item"
                                        selected={this.props.selectedChatIndex === _index}
                                    >
                                        <div>
                                            <Avatar alt="Remy Sharp">
                                                {_chat.users.filter((_user) => _user !== this.props.userEmail)[0].split("")[0]}
                                            </Avatar>
                                        </div>

                                        <div>
                                            <div>{_chat.users.filter((_user) => _user !== this.props.userEmail)[0]}</div>
                                            <div>
                                                {_chat.messages[_chat.messages.length - 1].message.substring(0, 25) + " ..."}
                                            </div>
                                        </div>
                                        {_chat.receiverHasRead === false && !this.userIsSender(_chat) ? (
                                            <ListItemIcon>
                                                <NotificationImportant className=""></NotificationImportant>
                                            </ListItemIcon>
                                        ) : null}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="">
                    <button variant="contained" fullWidth color="primary" onClick={this.newChat} className="chat-btn">
                        New Message
                    </button>
                </div>
            );
        }
    }
    userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;
    newChat = () => this.props.newChatBtnFn();
    selectChat = (index) => this.props.selectChatFn(index);
}

export default ChatListComponent;
