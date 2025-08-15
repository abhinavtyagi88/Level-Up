import Image from "next/image";

export default function Home() {
  console.log(process.env.NEXT_PUBLIC_API_URL); // works in browser & server
  // console.log(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY); // works in browser & server
  console.log(process.env.SECRET_API_KEY); // works only on server

  return (
    <div>
      <div className="flex justify-center">
        <h1> Hello </h1>
      </div>
    </div>
  );
}
