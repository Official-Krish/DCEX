"use client";
import DashboardOptions from "./DashboardOptions";
import Send from "./Send";
import UserInfo from "./UserInfo";

export default function DashboardProfile({ publicKey }: { publicKey: string }) {
    return <div>
        <div className="bg-slate-100 flex flex-col justify-center items-center ">
            <div className="shadow-lg rounded-lg bg-white w-[800px] h-[350px] p-4 mt-12">
                <UserInfo publicKey={publicKey} />
                <div className="px-6 py-3">
                    <DashboardOptions />
                </div>
            </div>
            <div className="flex justify-center w-[800px] flex-grow min-h-[300px]">
                <Send publicKey={publicKey}/>
            </div>
        </div>
    </div>
}   