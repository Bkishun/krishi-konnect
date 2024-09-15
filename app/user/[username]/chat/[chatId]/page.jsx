import LeftChat from "./_components/LeftChat"
import RightChat from "./_components/RightChat"

const page = async ({params}) => {
  const {chatId} = params;
  // console.log("chatID", chatId)


    return (
      <div>
        <LeftChat selectedChatId={chatId}/>
        <RightChat/>
      </div>
    )
  }
  
  export default page