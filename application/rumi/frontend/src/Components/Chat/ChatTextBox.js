import React from "react";

class ChatTextBoxComponent extends React.Component {
    constructor() {
        super();
        this.state = {
            chatText: "",
        };
    }

    render() {
        return (
            <div className="chat-input">
                <input
                    placeholder="Type your message.."
                    onKeyUp={(e) => this.userTyping(e)}
                    id="chattextbox"
                    className="chat-input-send"
                    onFocus={this.userClickedInput}
                ></input>
                <button onClick={this.submitMessage} className="chat-btn-send">
                    send
                </button>
            </div>
        );
    }
    userTyping = (e) => (e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value }));
    messageValid = (txt) => txt && txt.replace(/\s/g, "").length;
    userClickedInput = () => this.props.userClickedInputFn();
    submitMessage = () => {
        if (this.messageValid(this.state.chatText)) {
            this.props.submitMessageFn(this.state.chatText);
            document.getElementById("chattextbox").value = "";
        }
    };
}

export default ChatTextBoxComponent;
