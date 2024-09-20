"use client";

import React, { useEffect, useRef } from "react";
import ScrollableFeed from "react-scrollable-feed";

const ScrollableChat = ({ allMessage, currentUserData }) => {
  console.log(allMessage);
  const chatEndRef = useRef(null); // To track the end of the chat
  const isInitialLoad = useRef(true); // Track if it's the first render

  const scrollToBottom = (smooth = true) => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto", // No smooth scrolling on initial load
      });
    }
  };

  useEffect(() => {
    if (isInitialLoad.current) {
      scrollToBottom(false); // Instant scroll on initial load
      isInitialLoad.current = false; // Set to false after first scroll
    } else {
      scrollToBottom(true); // Smooth scrolling on message updates
    }
  }, [allMessage]);

  return (
    <ScrollableFeed className="h-full flex flex-col scrollbar-hide">
      {allMessage &&
        allMessage.map((message) => {
          return (
            <div
              className={` flex ${
                message.sender._id == currentUserData.user._id
                  ? "justify-end"
                  : ""
              }`}
            >
              <span
                className={`p-2 text-white rounded-md m-1 ${
                  message.sender._id == currentUserData.user._id
                    ? "bg-green-500 "
                    : "bg-red-500"
                }`}
              >
                {message.content}
              </span>
            </div>
          );
        })}
      <div ref={chatEndRef} /> {/* Scroll target */}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
