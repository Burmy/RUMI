import React, { useState, useEffect } from "react";
import { db, auth } from "./Firebase";

function ChatList() {
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        db.collection("messages")
            .orderBy("createdAt")
            .limit(50)
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
            });
    }, []);
    return (
        <div>
            <div className="">
                {messages.map(({ id, text, photoURL, uid }) => (
                    <div>
                        <div
                            key={id}
                            // className={`msg ${uid === auth.currentUser.uid ? "sent" : "received"}`}
                        >
                            {/* <img src={photoURL} alt="" /> */}
                            <p>{text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ChatList;
