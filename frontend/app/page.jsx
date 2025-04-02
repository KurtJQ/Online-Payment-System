import Image from "next/image";
import { Login } from "@/components/auth/sign-in";

export default function Page() {
  return (
    <>
      <div className="flex">
        <Image
          src={"/background.webp"}
          width={1280}
          height={720}
          priority={true}
          className="w-2/3 h-screen"
          alt="St Clare College Background"
        />
        <div className="w-1/4 h-full mx-auto mt-12">
          <div>
            <Image
              src={"/SCC icon.webp"}
              width={200}
              height={200}
              className="m-auto size-3/4"
              alt="SCC Icon"
            />
          </div>
          <Login />
        </div>
      </div>
    </>
  );
}
