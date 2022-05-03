import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

const ENDPOINT =
  window.location.host.indexOf("localhost") >= 0
    ? "http://127.0.0.1:5000"
    : window.location.host;

export default function ChatBox(props) {
  const { userInfo } = props;
  const [socket, setSocket] = useState(null);
  const uiMessagesRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [messageBody, setMessageBody] = useState("");
  const [messages, setMessages] = useState([
    {
      name: "Seller",
      isSeller: true,
      body: (
        <p>
          <img src={Robot} />
          Xin chào, chúng tôi giúp được gì cho bạn ?
        </p>
      ),
    },
  ]);
  console.log(messages);
  useEffect(() => {
    if (uiMessagesRef.current) {
      uiMessagesRef.current.scrollBy({
        top: uiMessagesRef.current.clientHeight,
        left: 0,
        behavior: "smooth",
      });
    }
    if (socket) {
      socket.emit("onLogin", {
        _id: userInfo._id,
        name: userInfo.name,
        isSeller: userInfo.isSeller,
      });
      socket.on("message", (data) => {
        setMessages([
          ...messages,
          { body: data.body, name: "Seller", isSeller: true },
        ]);
      });
    }
  }, [messages, isOpen, socket]);

  const supportHandler = () => {
    setIsOpen(true);
    console.log(ENDPOINT);
    const sk = socketIOClient(ENDPOINT);
    setSocket(sk);
  };
  const submitHandler = (e) => {
    e.preventDefault();
    if (!messageBody.trim()) {
      alert("Lỗi. Bạn chưa nhập tin nhắn");
    } else {
      setMessages([
        ...messages,
        { body: messageBody, name: userInfo.name, isSeller: false },
      ]);
      setMessageBody("");
      setTimeout(() => {
        socket.emit("onMessage", {
          body: messageBody,
          name: userInfo.name,
          isSeller: userInfo.isSeller,
          _id: userInfo._id,
        });
      }, 1000);
    }
  };
  const closeHandler = () => {
    setIsOpen(false);
  };
  return (
    <div className="chatbox">
      {!isOpen ? (
        <button type="button" onClick={supportHandler}>
          <i class="fas fa-life-ring"></i>
        </button>
      ) : (
        <div className="card card-body">
          <div className="row">
            <div
              className="col-10"
              style={{
                borderBottom: "solid 1px gray",
                justifyContent: "center",
                borderLeft: "solid 1px gray",
              }}
            >
              <h2 style={{ color: "Red", textAlign: "center" }}>
                Hỗ trợ khách hàng
              </h2>
            </div>
            <div
              className="col-2"
              style={{ position: "absolute", right: "0", top: "0" }}
            >
              <button
                type="button"
                onClick={closeHandler}
                style={{ float: "right" }}
              >
                <i class="fas fa-times-circle"></i>
              </button>
            </div>
          </div>
          <ul ref={uiMessagesRef}>
            <Container>
              <div className="chat-messages">
                {messages.map((message) => {
                  return (
                    <div>
                      <div
                        className={`message ${
                          message.isSeller ? "recieved" : "sended"
                        }`}
                      >
                        <div className="content ">
                          <p style={{fontSize:"17px"}}>{message.body}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
            {/* {messages.map((msg, index) => (
              <li key={index}>
                <strong style={{ float: "left" }}>{`${msg.name}:`}</strong>
                &nbsp;
                {msg.body}
              </li>
            ))} */}
          </ul>
          <div>
            <form onSubmit={submitHandler} className="row">
              <input
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                type="text"
                placeholder="Tin nhắn"
              />
              <button style={{ width: "100%" }} type="submit">
                Gữi
              </button>
            </form>
          </div>
        </div>
      )}
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
