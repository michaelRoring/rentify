"use client";

import React, { useEffect, useState, useRef } from "react";
import InputText from "./InputText";
import FormChat from "./FormChat";
import Icon from "./Icon";
import Image from "next/image";
import User1 from "../../public/users/user-1.png";
import User2 from "../../public/users/user-2.png";
import User3 from "../../public/users/user-3.png";
import User4 from "../../public/users/user-4.png";
import User5 from "../../public/users/user-5.png";
import { WalletConnecButton } from ".";
import firebase from "@/utils/firebaseConfig";
import moment from "moment";
import { addressShort } from "@/utils/addressShort";
import { useActiveAccount } from "thirdweb/react";
import { useAuth } from "@/hooks/useAuth";

const chatDataList = [
  {
    title: "HODLer Extraordinaire",
    content: "For those who believe in holding",
    time: "10m",
    level: "Level 1",
    image: User1,
  },
  {
    title: "Moonshot Enthusiast",
    content: "Always aiming for the moon ",
    time: "12m",
    level: "Level 1",
    image: User2,
  },
  {
    title: "DeFi Digger",
    content: "Excavating decentralized",
    time: "1h",
    level: "Level 1",
    image: User3,
  },
  {
    title: "Crypto Crusader",
    content: "Fighting for decentralization",
    time: "2h",
    level: "Level 1",
    image: User4,
  },
  {
    title: "Stablecoin Stargazer",
    content: "Keeping an eye on stablecoins",
    time: "2h",
    level: "Level 1",
    image: User5,
  },
];

const ChatSection = ({ roomIdSelected, handleSelectRoom, address }) => {
  return (
    <div
      className="
      px-[20px]
      py-[30px]
      border-r
      border-[#ffffff20]
      w-[365px]
      flex
      flex-col
      gap-[20px]
      min-h-[400px]
    "
    >
      <InputText placeholder="Search" withIcon="icon-search" />
      {address && (
        <ChatList
          handleSelectRoom={handleSelectRoom}
          address={address}
          roomIdSelected={roomIdSelected}
        />
      )}
    </div>
  );
};

const ChatList = ({ handleSelectRoom, address, roomIdSelected }) => {
  const [roomId, setRoomId] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const getRoomIds = async () => {
      try {
        const response = await fetch("/api/rooms");
        const data = await response.json();
        setRoomId(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room IDs:", error);
      }
    };

    getRoomIds();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    return (
      <ul className="flex flex-col gap-[6px]">
        {roomId?.map((room) => {
          return (
            <a>
              {roomIdSelected === room ? (
                <div className="bg-slate-600 w-fit px-2 rounded-md hover:bg-slate-700">
                  <p onClick={() => handleSelectRoom(room)}>{room}</p>
                </div>
              ) : (
                <div className="px-2 hover:bg-slate-400 w-fit rounded-md">
                  <p onClick={() => handleSelectRoom(room)}>{room}</p>
                </div>
              )}
            </a>
          );
        })}
      </ul>
    );
  }
};

const ChatItem = (props) => {
  useEffect(() => {
    if (!props.address) return;

    const messagesRef = db.database().ref("messages");

    messagesRef.on("value", (snapshot) => {
      const messagesData = snapshot.val();
      const messagesList = [];
      for (let id in messagesData) {
        messagesList.push(messagesData[id]);
      }

      const onlyMessageOwn = messagesList?.filter(
        (item) => item.sender == props.address
      );
      if (onlyMessageOwn.length > 0) {
        setContent(onlyMessageOwn[onlyMessageOwn.length - 1].text);
      }
    });
  }, [props.address]);

  return (
    <li className="" onClick={() => props.handleShowDetail(props)}>
      <button className="w-full flex items-center px-[10px] py-[10px] focus:bg-[#0D737350] rounded-[6px] gap-[10px]">
        <div className="w-[40px] h-[40px] rounded-full bg-[#ffffff40] overflow-hidden">
          <Image src={props.avatar} alt={props.name} width={40} height={40} />
        </div>
        <div>
          <div className="flex justify-start items-center gap-[10px]">
            <div>
              {/* {!props.currentUser ? addressShort(props.address) : "You" */}
            </div>
            <div className="w-[3px] h-[3px] rounded-full bg-[#ffffff50]"></div>
            <div className="px-[6px] py-[2px] text-[12px] font-inter rounded-full bg-[#01FF6120] text-[#01FF61]">
              Level 1
            </div>
          </div>
          <div className="flex flex-col text-[14px] text-[#ffffff70] font-inter">
            <div className="text-left grow">
              Joined {moment(props.created_at).fromNow()}
            </div>
          </div>
        </div>
      </button>
    </li>
  );
};

const ChatDetails = ({ currentUser, recipient, address }) => {
  const [messages, setMessages] = useState([]);
  // const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const messagesRef = firebase.database().ref("messages");

    messagesRef.on("value", (snapshot) => {
      const messagesData = snapshot.val();
      console.log("messagesData", messagesData);
      const messagesList = [];
      for (let id in messagesData) {
        messagesList.push(messagesData[id]);
      }

      console.log("messagesList", messagesList);
      const onlyMessageOwn = messagesList?.filter(
        (item) =>
          (item.sender == currentUser.address ||
            item.recipient == currentUser.address) &&
          (item.sender == recipient.address ||
            item.recipient == recipient.address)
      );
      console.log(
        "onlyMessageOwn",
        onlyMessageOwn.map(({ sender }) => ({ sender }))
      );
      setMessages(onlyMessageOwn);
    });
  }, [currentUser, recipient]);

  const handleSendMessage = (newMessage) => {
    if (newMessage.trim() !== "" && recipient) {
      // Memastikan recipient sudah terdefinisi
      const conversationId = `${currentUser.address}/${recipient.address}`;
      console.log(newMessage.trim());
      console.log(recipient);
      console.log(conversationId);
      console.log(currentUser);
      // return
      firebase.database().ref("messages").push({
        text: newMessage,
        sender: currentUser.address,
        recipient: recipient.address,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
      });
    }
  };

  return (
    <div className="grow">
      <div className="relative w-full h-[600px]">
        <div className="absolute w-full h-[calc(100%_-_70px)] overflow-hidden">
          <div className="flex flex-col gap-[16px] justify-end p-[16px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`
                border 
                border-[#ffffff20] 
                rounded-[20px] 
                p-[20px] 
                !shadow-sm
                w-[60%] ${
                  address == message.sender
                    ? "self-end !rounded-br-[0px] bg-[#0D7373] text-white"
                    : "self-start !rounded-tl-[0px] bg-black/30"
                }
              `}
              >
                <div className="text-[12px] mb-[6px] text-white/50">
                  {message.sender != address
                    ? `From: ${addressShort(message.sender)}`
                    : "You"}
                </div>
                <p>{message.text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute flex items-center w-full h-[70px] left-0 bottom-0 px-[16px] border-t border-[#ffffff20]">
          <FormChat handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

const ChatMessage = ({ currentUser, sender, avatar, text, timestamp }) => {
  const messageFrom =
    currentUser == sender
      ? "ml-auto rounded-tr-[0] bg-[#0D7373]"
      : "mr-auto rounded-tl-[0] bg-black/70";

  const positionImage = currentUser == sender ? "order-none" : "-order-1";

  return (
    <div className="flex gap-[10px]">
      <div
        className={`
        w-[50%] 
        p-[16px] 
        rounded-[24px]
        shadow-sm
        ${messageFrom}
      `}
      >
        <div className="text-[12px] text-white/50 font-semibold mb-[10px]">
          {currentUser == sender ? (
            <div>You</div>
          ) : (
            <div>
              From:{" "}
              <span className="underline cursor-pointer">
                {addressShort(sender)}
              </span>
            </div>
          )}
        </div>
        <p className="mb-10px">{text}</p>
        <div className="text-[12px] text-white/50 text-right">
          {moment(timestamp).fromNow()}
        </div>
      </div>
      {/* <div
        className={`
         w-[30px]
         h-[30px]
         rounded-full
         bg-white/20
         overflow-hidden
         ${positionImage}
      `}
      ></div> */}
    </div>
  );
};

const ChatGroupDetails = ({ roomIdSelected, address, memberCount }) => {
  const [messages, setMessages] = useState([]);
  const eventSourceRef = useRef(null);

  useEffect(() => {
    if (!roomIdSelected) return;

    eventSourceRef.current = new EventSource(`/api/chat/${roomIdSelected}`);

    eventSourceRef.current.onmessage = (event) => {
      try {
        const newMessages = JSON.parse(event.data);
        setMessages(newMessages);
      } catch (error) {
        console.error("JSON.parse error:", error);
      }
    };

    eventSourceRef.current.onerror = (error) => {
      console.error("EventSource failed:", error);
    };

    return () => {
      if (eventSourceRef.current) {
        eventSourceRef.current.close();
      }
    };
  }, [roomIdSelected]);

  const handleSendMessage = async (newMessage) => {
    if (newMessage.trim() === "") return;

    try {
      const response = await fetch(`/api/chat/${roomIdSelected}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: newMessage, sender: address }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-[calc(100%_-_365px)]">
      <div className="flex flex-col">
        <div className="px-[16px] py-[10px] flex items-center gap-[10px] border-b border-white/20">
          <div className="w-[40px] h-[40px] rounded-full bg-white overflow-hidden">
            <Image
              src="https://ordexhaust.com/ipfs/uploads/rentify_logo.svg"
              alt="Logo"
              width={40}
              height={40}
            />
          </div>
          <div>
            {roomIdSelected !== null ? (
              <div className="font-bold">{roomIdSelected} chat</div>
            ) : (
              <div className="font-semibold">Rentify Community Chat</div>
            )}
            <div className="text-[12px] text-white/50">
              {memberCount} members
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[16px] h-[420px] overflow-y-auto p-[20px]">
          {messages ? (
            messages.map((message, index) => (
              <ChatMessage key={index} currentUser={address} {...message} />
            ))
          ) : (
            <div className="bg-slate-100 animate-pulse"></div>
          )}
        </div>
        <div
          className="
          flex 
          items-center 
          w-full  
          px-[16px] 
          py-[10px] 
          border-t 
          border-[#ffffff20]
        "
        >
          <FormChat handleSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

const NoConnectWallet = () => {
  return (
    <div
      className="
      flex 
      flex-col
      items-center
      justify-center
      gap-[14px]
      grow
    "
    >
      <div className="w-[40px] h-[40px] rounded-full flex items-center justify-center bg-[#ffffff20]">
        <Icon name="icon-warning" size={30} />
      </div>
      <div className="text-[24px] font-inter font">
        You must connected wallet first
      </div>
      <WalletConnecButton />
    </div>
  );
};

const UserDetails = ({ data, ...props }) => {
  console.log("data", data);
  return (
    <div className="w-[calc(100%_-_365px)] p-[16px]">
      <button onClick={props.handleClose}> ← Back to Chat</button>
      <div className="flex flex-col gap-[20px] py-[16px]">
        <div className="w-[100px] h-[100px] rounded-full bg-[#ffffff40] overflow-hidden">
          <Image src={data.avatar} alt={data.name} width={100} height={100} />
        </div>
        <div>
          <div className="text-[12px] text-white/50">Wallet Address:</div>
          <div>{data.address == props.address ? "[You]" : data.address}</div>
        </div>
        <div>
          <div className="text-[12px] text-white/50">Join:</div>
          <div>{moment(data.created_at).fromNow()}</div>
        </div>
      </div>
    </div>
  );
};

const ChatContainer = (props) => {
  const account = useActiveAccount();
  const address = account?.address;
  const { user, loading } = useAuth();
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [token, setToken] = useState(null);
  const [roomIdSelected, setRoomIdSelected] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  useEffect(() => {
    const getUsersData = async () => {
      if (!token) return;

      try {
        const response = await fetch("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const responseJson = await response.json();
        setUsers(responseJson);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    getUsersData();
  }, [token]);

  useEffect(() => {
    if (user && !loading) {
      setCurrentUser(user);
    }
  }, [user, loading]);

  const handleShowDetail = (_userDetails) => {
    setUserDetails(_userDetails);
    setShowDetails(true);
  };

  const handleSelectRoom = (roomId) => {
    setRoomIdSelected(roomId);
    console.log("roomId :", roomId);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className=" 
      border
      border-[#ffffff20]
      rounded-[6px]
      backdrop-blur-lg 
      bg-[#ffffff07]
      flex
      flex-wrap
    "
    >
      <ChatSection
        data={users}
        address={address}
        roomIdSelected={roomIdSelected}
        handleSelectRoom={handleSelectRoom}
      />
      {address && currentUser ? (
        <>
          {!showDetails ? (
            <ChatGroupDetails
              memberCount={users.length}
              address={address}
              userAvatar={currentUser.avatar}
              roomIdSelected={roomIdSelected}
            />
          ) : (
            <UserDetails
              address={address}
              data={userDetails}
              handleClose={() => setShowDetails(false)}
            />
          )}
        </>
      ) : (
        <NoConnectWallet />
      )}
    </div>
  );
};

export default ChatContainer;
