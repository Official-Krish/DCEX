import { signOut, useSession } from "next-auth/react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useRouter } from "next/navigation";
import Image from "next/image";

export const UserDropdown = () => {
    const session = useSession();
    const router = useRouter();
    const Avatar = () => {
        return (
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-600">
                <Image src={session.data?.user?.image || ""} alt="Avatar" className="w-full h-full rounded-full" width={50} height={50} />
            </div>
        );
    };
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[180px] bg-gray-800 border-gray-600">
                <DropdownMenuItem className="text-white cursor-pointer" onClick={() => window.location.href = `/profile?=${localStorage.getItem("name")}`}>
                    <a className="flex items-center gap-2">
                        <span>Profile</span>
                    </a>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-white cursor-pointer">
                    <button className="flex items-center gap-2 ">
                        <span>Settings</span>
                    </button>
                </DropdownMenuItem>
                <DropdownMenuItem  className="text-white cursor-pointer" onClick={() => {
                    signOut();
                    router.push("/");
                }}>
                    <button className="flex items-center gap-2 ">
                        <span>Sign Out</span>
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};