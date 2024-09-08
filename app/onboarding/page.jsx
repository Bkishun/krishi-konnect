import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link"

const page = async () => {

const session = await getSession();
const user = session?.user;

console.log(user)
  return (
    <div>
        <Link href={`/`}> click</Link>
    </div>
  )
}

export default page