import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar2.jsx";
import "../styles/messages.css";
import { sendMessage, getMessages } from "../api/messageApi";

function Messages() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);

  // In a real app, you would fetch contacts from the backend
  // For now, we'll simulate with sample contacts
  const contacts = [
    { id: 2, name: "Rohit Kumar", role: "Alumni" },
    { id: 3, name: "Sunil Sharma", role: "Alumni" },
    { id: 4, name: "Priya Singh", role: "Student" }
  ];

  useEffect(() => {
    async function loadMessages(contactId) {
      if (!user || !contactId) return;
      
      try {
        const response = await getMessages(user.id, contactId);
        const data = response.data;
        if (data.success) {
          setMessages(data.messages);
        }
      } catch (err) {
        console.error("Error loading messages:", err);
      }
    }
    
    if (selectedContact) {
      loadMessages(selectedContact.id);
    }
  }, [selectedContact, user]);

  async function handleSendMessage(e) {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact || !user) return;
    
    try {
      const messageData = {
        sender_id: user.id,
        receiver_id: selectedContact.id,
        content: newMessage
      };
      
      const response = await sendMessage(messageData);
      const data = response.data;
      
      if (data.success) {
        // Add the new message to the chat
        setMessages([...messages, {
          ...messageData,
          sent_at: new Date().toISOString(),
          senderName: user.name
        }]);
        setNewMessage("");
      } else {
        alert("Error sending message: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Error sending message");
    }
  }

  return (
    <>
      <Navbar />

      <div className="chat-container">
        {/* Contact List */}
        <div className="contact-list">
          <h3>Contacts</h3>
          {contacts.map(contact => (
            <div 
              key={contact.id}
              className={`contact-item ${selectedContact?.id === contact.id ? 'active' : ''}`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="contact-avatar">{contact.name.charAt(0)}</div>
              <div className="contact-info">
                <div className="contact-name">{contact.name}</div>
                <div className="contact-role">{contact.role}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="chat-area">
          {/* Chat Header */}
          <div className="chat-header">
            <h2 className="chat-title">
              {selectedContact ? selectedContact.name : "Select a contact"}
            </h2>
            <p className="chat-sub">Chat with your mentor / student</p>
          </div>

          {/* Chat Window */}
          <div className="chat-box">
            {selectedContact ? (
              messages.map(message => (
                <div 
                  key={message.id} 
                  className={`message ${message.sender_id == user?.id ? 'message-sent' : 'message-received'}`}
                >
                  <p className="msg-text">{message.content}</p>
                  <span className="msg-time">
                    {new Date(message.sent_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))
            ) : (
              <div className="no-contact-selected">
                <p>Select a contact to start chatting</p>
              </div>
            )}
          </div>

          {/* Chat Input */}
          {selectedContact && (
            <form className="chat-input-box" onSubmit={handleSendMessage}>
              <input 
                type="text" 
                placeholder="Type your message..." 
                className="chat-input" 
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                disabled={!selectedContact}
              />
              <button className="send-btn" type="submit">Send</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}

export default Messages;
