import Home from "@/components/Home/Home";
import TempForm from "@/components/TempForm";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link"

const page = async () => {

const session = await getSession();
const user = session?.user;

  return (
    <div>
      <Home/>
    </div>
  )
}

export default page