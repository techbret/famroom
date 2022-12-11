import React, { useState, useEffect } from 'react';
import firebase from 'firebase';

function ChatSorter(props) {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('chats')
      .where('user1', '==', props.user1)
      .where('user2', '==', props.user2)
      .orderBy('timestamp')
      .onSnapshot(snapshot => {
        const newChats = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setChats(newChats);
      });

    return () => unsubscribe();
  }, [props.user1, props.user2]);

  return (
    <div>
      {chats.map(chat => (
        <div key={chat.id}>{chat.text}</div>
      ))}
    </div>
  );
}