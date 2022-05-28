import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import MessageBox from "../components/MessageBox";
import Robot from "../assets/robot.gif";
import styled from "styled-components";

let allUsers = [];
let allMessages = [];
let allSelectedUser = {};
// const ENDPOINT =
//   window.location.host.indexOf("localhost") >= 0
//     ? "http://127.0.0.1:5000"
//     : window.location.host;
    const ENDPOINT =
    window.location.host.indexOf("localhost") >= 0
      ? "https://realestate-be-app.herokuapp.com"
      : window.location.host;
export default function SupportScreen() {
  const [selectedUser, setSelectedUser] = useState({});
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    console.log(messages, "messages");
    if (!socket) {
      const sk = socketIOClient(ENDPOINT);
      setSocket(sk);
      sk.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isSeller: userInfo.isSeller,
      });
      sk.on("message", (data) => {
        if (allSelectedUser._id === data._id) {
          allMessages = [...allMessages, data];
        } else {
          const existUser = allUsers.find((user) => user._id === data._id);
          if (existUser) {
            allUsers = allUsers.map((user) =>
              user._id === existUser._id ? { ...user, unread: true } : user
            );
            setUsers(allUsers);
          }
        }
        setMessages(allMessages);
      });
      sk.on("updateUser", (updatedUser) => {
        const existUser = allUsers.find((user) => user._id === updatedUser._id);
        if (existUser) {
          allUsers = allUsers.map((user) =>
            user._id === existUser._id ? updatedUser : user
          );
          setUsers(allUsers);
        } else {
          allUsers = [...allUsers, updatedUser];
          setUsers(allUsers);
        }
      });
      sk.on("listUsers", (updatedUsers) => {
        allUsers = updatedUsers;
        setUsers(allUsers);
      });
      sk.on("selectUser", (user) => {
        allMessages = user.messages;
        setMessages(allMessages);
      });
    }
  }, [messages, socket, users]);

  const selectUser = (user) => {
    allSelectedUser = user;
    setSelectedUser(allSelectedUser);
    const existUser = allUsers.find((x) => x._id === user._id);
    if (existUser) {
      allUsers = allUsers.map((x) =>
        x._id === existUser._id ? { ...x, unread: false } : x
      );
      setUsers(allUsers);
    }
    socket.emit("onUserSelected", user);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Lỗi. Bạn chưa nhập tin nhắn.");
    } else {
      allMessages = [
        ...allMessages,
        { body: messageBody, name: userInfo.name, isSeller: true },
      ];
      setMessages(allMessages);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.name,
          isSeller: userInfo.isSeller,
          _id: selectedUser._id,
        });
      }, 1000);
    }
  };

  return (
    <div
      className="row top full-container"
      style={{ borderTop: "1px solid black" }}
    >
      <div className="col-4 support-users">
        {users.filter((x) => x._id !== userInfo._id).length === 0 && (
          <MessageBox>Không có người dùng online !!!</MessageBox>
        )}
        <ul>
          {users
            .filter((x) => x._id !== userInfo._id)
            .map((user) => (
              <li
                key={user._id}
                className={user._id === selectedUser._id ? "  selected" : "  "}
              >
                <button
                  className="block"
                  type="button"
                  onClick={() => selectUser(user)}
                >
                  <strong style={{ fontWeight: "bold", fontSize: "20px" }}>
                    {user.name}
                  </strong>
                </button>
                <span
                  className={
                    user.unread ? "unread" : user.online ? "online" : "offline"
                  }
                />
              </li>
            ))}
        </ul>
      </div>
      <div className="col-8 support-messages">
        {!selectedUser._id ? (
          <MessageBox>Chọn người dùng để chat!</MessageBox>
        ) : (
          <div>
            <div className="row">
              <strong style={{ fontSize: "30px", color: "red" }}>
                Chat với: {selectedUser.name}{" "}
              </strong>
            </div>
            <ul ref={uiMessagesRef}>
              <Container>
                {messages.length === 0 && (
                  <li>
                    <img src={Robot} alt="" />
                  </li>
                )}
                <div className="chat-messages">
                  {messages.map((message) => {
                    return (
                      <div>
                        <div
                          className={`message ${
                            message.isSeller ? "sended" : "recieved"
                          }`}
                        >
                          <div className="content ">
                            <p style={{ fontSize: "17px" }}>{message.body}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Container>

              {/* {messages.map((msg, index) => (
                <li key={index}>
                  <strong>{`${msg.name}: `}</strong> {msg.body}
                </li>
              ))} */}
            </ul>
            <div>
              <form onSubmit={submitHandler} className="row">
                <input
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  type="text"
                  placeholder=" Tin nhắn"
                />
                <button
                  style={{ width: "8rem", height: "100px", fontWeight: "bold" }}
                  type="submit"
                >
                  Gữi
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const Container = styled.div`
  grid-template-rows: 10% 80% 10%;
  gap: 0.1rem;
  overflow: hidden;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
  .chat-messages {
    padding: 1rem 2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    overflow: auto;
    &::-webkit-scrollbar {
      width: 0.2rem;
      &-thumb {
        background-color: #ffffff39;
        width: 0.1rem;
        border-radius: 1rem;
      }
    }
    .message {
      display: flex;
      align-items: center;
      .content {
        max-width: 80%;
        overflow-wrap: break-word;
        padding: 1rem;
        font-size: 1.1rem;
        border-radius: 1rem;
        color: #d1d1d1;
        @media screen and (min-width: 720px) and (max-width: 1080px) {
          max-width: 70%;
        }
      }
    }
    .sended {
      justify-content: flex-end;
      .content {
        background-color: white;
      }
    }
    .recieved {
      justify-content: flex-start;
      .content {
        background-color: #9900ff20;
      }
    }
  }
`;
