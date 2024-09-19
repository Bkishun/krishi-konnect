import LeftChat from "./_components/LeftChat"
import RightChat from "./_components/RightChat"

const page = async ({params}) => {
  const {chatId} = params;
  // console.log("chatID", chatId)


    return (
      <div className="flex border-2 border-green-500 h-screen p-2">
        <LeftChat selectedChatId={chatId}/>
        <RightChat/>
      </div>
    )
  }
  
  export default page