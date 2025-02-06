"use client";
import DashboardOptions from "./DashboardOptions";
import UserInfo from "./UserInfo";

export default function DashboardProfile({publicKey}: any) {
    return (
        <div className="bg-slate-100 h-screen flex justify-center">
            <div className="shadow-lg rounded-lg bg-white w-[800px] h-[350px] p-4 mt-12">
                <UserInfo publicKey={publicKey} />
                <div className="px-6 py-3">
                    <DashboardOptions />
                </div>
            </div>
        </div>
    );
}   