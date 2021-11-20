import React from "react";
import styles from "./styles";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";

class ChatViewComponent extends React.Component {
    componentDidMount = () => {
        const container = document.getElementById("chatview-container");
        if (container) container.scrollTo(0, container.scrollHeight);
    };
    componentDidUpdate = () => {
        const container = document.getElementById("chatview-container");
        if (container) container.scrollTo(0, container.scrollHeight);
    };
    getUserFromEmail=()=>{

    };
    render() {
        if (this.props.chat === undefined) {
            return <div className="chat-view-container">heloooooooooooooooooo there will be some text here!!</div>;
        } else {
            return (
                <div className="chat-view-container">
                    <div className="">
                        Your conversation with {this.props.chat.users.filter((_usr) => _usr !== this.props.user)[0]}
                    </div>
                    <div id="chatview-container" className="">
                        {this.props.chat.messages.map((_msg, _index) => {
                            return (
                                <div key={_index} className={_msg.sender === this.props.user ? "sent" : "received"}>
                                    {_msg.message}
                                </div>
                            );
                        })}
                    </div>
                </div>
            );
        }
    }
}

export default withStyles(styles)(ChatViewComponent);
