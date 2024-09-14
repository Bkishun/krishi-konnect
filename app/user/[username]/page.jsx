import Home from "@/components/Home/Home";
import TempForm from "@/components/TempForm";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link"
import Main from "./_components/Main";

const page = async () => {

const session = await getSession();
const user = session?.user;

  return (
    <div>
      <Main/>
    </div>
  )
}

export default page