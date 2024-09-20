"use client";

import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useSelector } from "react-redux";
import ScrollableChat from "./ScrollableChat";

const messageSchema = Yup.object().shape({
  content: Yup.string().min(1, "write something").required("Required"),
});

const SingleChat = () => {

  const currentUserData = useSelector(state => state.userData)
  const {selectedChat} = useSelector(state => state.chatData)

  const [allMessage, setAllMessage] = useState([]);

  const fetchMessage = async () => {
    try {

        if(!!selectedChat) {
            const res = await axios.get(`http://localhost:3001/api/message/${selectedChat}`)
            console.log(res)
            setAllMessage(res.data)

        }

    } catch (error) {

        throw new Error(error)
        
    }
  }

  useEffect(() => {
    fetchMessage()

  }, [selectedChat])

  return (
    <div className="w-full h-full border-2 border-black flex flex-col">

        <ScrollableChat allMessage={allMessage} currentUserData={currentUserData}/>
      <Formik
      className="self-end"
        initialValues={{
          content: "",
        }}
        validationSchema={messageSchema}
        onSubmit={async (values) => {

            try {
                // Submit form values

                const payload = {
                    content: values.content,
                    chatId: selectedChat,
                    currentUserId: currentUserData.user._id
                }

                const res = await axios.post('http://localhost:3001/api/message', payload)
                console.log(res)

                setAllMessage([...allMessage, res.data])
                values.content = ""


                //   console.log(payload)
                
            } catch (error) {

                throw new Error(error)
                
            }
          
        }}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="flex w-full p-2">
            <div className="flex w-full border-2 border-gray-700">
              <Field name="content" placeholder="type..." className="w-full"/>
              
            </div>
            <button className="bg-green-500 p-2" type="submit">
              Send
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SingleChat;
