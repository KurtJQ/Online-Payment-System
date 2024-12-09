import Image from "next/image";

export default function Page() {
  return (
    <div className="flex flex-col m-8 p-3 rounded-3xl bg-gray-300">
      <div className="flex justify-between ">
        <div className="bg-gray-400 rounded-3xl p-2 font-bold">
          01/01/2024 - 12/31/2024
        </div>
        <div className="bg-gray-400 rounded-3xl p-2 font-bold">Search Bar</div>
      </div>
      <div className="rounded-3xl h-96 mt-3 bg-gray-500 overflow-y-auto">
        <div className="grid grid-cols-6 items-center bg-gray-300 rounded-3xl m-3 p-2 font-bold text-lg text-center">
          <div>11/15/2024</div>
          <div>#0001</div>
          <div>
            4th Year
            <br />
            <span>Second Sem</span>
          </div>
          <div>2nd Periodical</div>
          <div>1,500 PHP</div>
          <div>
            <button className="mx-3">
              <Image
                src={"/receipt-regular-48.png"}
                width={48}
                height={48}
                alt="receipt icon"
              />
            </button>
            <button className="mx-3">
              <Image
                src={"/download-solid-48.png"}
                width={48}
                height={48}
                alt="download icon"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
