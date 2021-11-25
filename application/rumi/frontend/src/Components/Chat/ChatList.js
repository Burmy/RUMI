import React from "react";
// import Avatar from "@material-ui/core/Avatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import Avatar from "react-avatar";
import { VscBellDot } from "react-icons/vsc";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./Chat.css";
const stylenoti = { marginTop: "10px", width: "35px", height: "35px", color: "#1da699" };

class ChatListComponent extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.notify = this.notify.bind(this);
    // }
    // notify() {
    //     console.log("call notify");
    //     toast.success("you just got a message!", {
    //         position: "top-right",
    //         autoClose: 4000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         closeButton: false,
    //         progress: 0,
    //     });
    // }

    render() {
        if (this.props.chats.length > 0) {
            return (
                <div className="chatlist-container">
                    <button variant="contained" fullWidth color="primary" onClick={this.newChat} className="chat-btn">
                        New Message
                    </button>
                    <ul id="chat-list">
                        {this.props.chats.map((_chat, _index) => {
                            return (
                                <div key={_index}>
                                    <li
                                        onClick={() => this.selectChat(_index)}
                                        className={`segmentsList${this.props.selectedChatIndex === _index ? " selected" : ""}`}
                                    >
                                        <div>
                                            <Avatar
                                                className="menu-profile"
                                                name={
                                                    _chat.users.filter((_user) => _user !== this.props.userEmail)[0].split("")[0]
                                                }
                                                round
                                                size="60px"
                                                color="white"
                                            />
                                        </div>
                                        <div>
                                            <div>{_chat.users.filter((_user) => _user !== this.props.userEmail)[0]}</div>
                                        </div>
                                        {_chat.receiverHasRead === false && !this.userIsSender(_chat) ? (
                                            <div>
                                                <VscBellDot style={stylenoti} />
                                                {/* {this.notify()}
                                                {<ToastContainer />} */}
                                            </div>
                                        ) : null}
                                    </li>
                                </div>
                            );
                        })}
                    </ul>
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
