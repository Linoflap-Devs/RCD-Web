import Login from "@/components/Login";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white h-screen flex">
      <div className="hidden lg:flex relative w-1/2">
        <Image
          src="/rcd-bg.jpg"
          alt="RCD BG"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-10 left-10 flex items-center gap-3 text-white z-10">
          <Image
            src="/logo-vector.png"
            alt="RCD Logo"
            width={70}
            height={70}
            className="object-contain drop-shadow-lg"
          />
          <div className="leading-tight text-2xl font-bold drop-shadow-md">
            Realty Marketing <br />
            Corporation
          </div>
        </div>
      </div>
      <div className="flex w-full lg:w-1/2 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Login />
          <p className="absolute bottom-12 right-60 text-xs text-gray-400 text-center">
            © {new Date().getFullYear()} RCD Realty Marketing Corp.  All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
