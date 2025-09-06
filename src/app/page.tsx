import Login from "@./components/Login";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white flex h-screen">
      <div className="hidden lg:block relative w-1/2">
        <Image
          src="/rcd-bg.jpg"
          alt="RCD BG"
          fill
          className="object-cover pr-0"
        />
        <div className="absolute bottom-6 left-8 flex items-center gap-2 text-white font-bold z-10">
          <Image
            src="/logo-vector.png"
            alt="RCD Logo"
            width={80}
            height={80}
            className="object-contain"
          /> 
          {/* <div className="flex items-center space-x-3 text-justify">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-sm font-medium">
              <span>RCD</span>
            </div>
          </div> */}
          <div className="leading-tight text-xl">
            Realty Marketing <br />
            Corporation
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full p-30">
          <Login />
        </div>
      </div>
    </main>
  );
}
