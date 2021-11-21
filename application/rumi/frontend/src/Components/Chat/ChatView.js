import React from "react";
import { RiQuestionAnswerLine } from "react-icons/ri";

const style = { width: "50%", height: "50%", marginLeft: "10px", marginTop: "-5px" };
class ChatViewComponent extends React.Component {
    componentDidMount = () => {
        const container = document.getElementById("chatview-container");
        if (container) container.scrollIntoView({ behavior: 'smooth', block: 'end' })
    };
    componentDidUpdate = () => {
        const container = document.getElementById("chatview-container");
        if (container) container.scrollIntoView({ behavior: 'smooth', block: 'end' })
    };

    render() {
        if (this.props.chat === undefined) {
            return (
                <div className="chat-view-container chat-view-container-empty">
                    <RiQuestionAnswerLine style={style} />
                </div>
            );
        } else {
            return (
                <div className="chat-view-container">
                    <div className="chat-view-heading">{this.props.chat.users.filter((_usr) => _usr !== this.props.user)[0]}</div>
                    <div id="chatview-container" className="msg">
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

export default ChatViewComponent;
