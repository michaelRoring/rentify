// pages/index.js

import { useState, useEffect } from "react";
import firebase from "@/utils/firebaseConfig";
import Image from "next/image";
import {
  AddressCopy,
  Button,
  ChatRoom,
  WalletConnecButton,
} from "@/components-new";
import { useAddress } from "@thirdweb-dev/react";

export default function Home() {
  const address = useAddress();
  const [currentUser, setCurrentUser] = useState(null);
  const [recipient, setRecipient] = useState(null); // Menambahkan state untuk recipient
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Implementasi autentikasi Firebase di sini
    // Gunakan alamat dompet sebagai ID pengguna
    // Pastikan untuk memeriksa dan menambahkan user baru jika belum ada
    if (!address) return;
    const checkAndAddUser = async () => {
      try {
        const usersRef = firebase.database().ref("users");
        const snapshot = await usersRef.child(address).once("value");
        const userData = snapshot.val();

        if (!userData) {
          // Jika address wallet belum terdaftar, tambahkan user baru
          const newUser = {
            name: address, // Gunakan address sebagai default name
            avatar: "https://rentifyai.app/assets/person1-nos3vchk.png", // Avatar default
            created_at: firebase.database.ServerValue.TIMESTAMP,
          };

          await usersRef.child(address).set(newUser);
          // Setelah menambahkan user baru, dapatkan data pengguna tersebut
          const newUserSnapshot = await usersRef.child(address).once("value");
          const newUserData = newUserSnapshot.val();
          setCurrentUser({ ...newUserData, address }); // Mengatur currentUser dengan data pengguna yang baru ditambahkan

          return;
        }

        setCurrentUser({ ...userData, address }); // Mengatur currentUser dengan data pengguna yang baru ditambahkan
      } catch (error) {
        console.error("Error checking and adding user:", error);
      }
    };

    if (address) {
      checkAndAddUser();
    }
  }, [address]);

  useEffect(() => {
    const usersRef = firebase.database().ref("users");
    usersRef.on("value", (snapshot) => {
      const usersData = snapshot.val();
      const userList = [];
      for (let address in usersData) {
        userList.push({ address, ...usersData[address] });
      }

      const filterUsers = userList.filter(({ name }) => name != address);
      console.log("filterUsers", filterUsers);
      setUsers(filterUsers);
    });
  }, [address]);

  useEffect(() => {
    console.log("currentUser", currentUser);
  }, [currentUser]);

  return (
    <div>
      <AddressCopy />
      <WalletConnecButton />
      <div>
        <h1>Daftar Pengguna</h1>
        <ul>
          {users.map((user) => (
            <li key={user.address}>
              <Image src={user.avatar} alt={user.name} width={50} height={50} />
              <h2>
                Chat with {user.name.substr(0, 4)}...
                {user.name.substr(user.name.length - 4, user.name.length)}
              </h2>
              <Button onClick={() => setRecipient(user)}>Chat</Button>
            </li>
          ))}
        </ul>

        <div className="py-[40px]">
          {currentUser && recipient && (
            <ChatRoom currentUser={currentUser} recipient={recipient} />
          )}
        </div>
      </div>
    </div>
  );
}
