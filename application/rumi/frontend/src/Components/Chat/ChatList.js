import React, { useState, useEffect } from "react";
import { db, auth } from "./Firebase";

function ChatList() {
    const [messages, setMessages] = useState([]);
    const [message,addMessage] = useState([]);
    useEffect(() => {
        db.collection("messages")
            .orderBy("createdAt")
            .limit(50)
            .onSnapshot((snapshot) => {
                setMessages(snapshot.docs.map((doc) => doc.data()));
                
            });
    }, []);
   const handleMessage = (e)=>{
       addMessage(e.target.vaule);
   }
 
   const handleChat=()=>{
    db.collection("messages").add({
        createdAt: db.FieldValue.serverTimestamp(),
        text: message 
    
    })
   }
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
            <form>
                <label>chat:</label>
                <input type="text" value={message} onChange={handleMessage}/>
                <input type='submit' onSubmit={handleChat}/>
            </form>
        </div>
    );
}

export default ChatList;
