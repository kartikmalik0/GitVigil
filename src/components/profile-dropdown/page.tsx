"use client"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"
import { signOut, useSession } from "next-auth/react"

export default function ProfileDropDown() {
    const session = useSession()
    return (
        <>
            {
                session.data?.user ? <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-full">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={session.data?.user && session.data?.user.image} />
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <span className="sr-only">Toggle user menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                        <DropdownMenuItem>
                            <Link href="#" className="flex items-center gap-2" prefetch={false}>
                                <div className="h-4 w-4" />
                                <span>About Us</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Link href="#" className="flex items-center gap-2" prefetch={false}>
                                <div className="h-4 w-4" />
                                <span>Privacy Policy</span>
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => signOut()} className="text-red-500 flex cursor-pointer justify-center">
                            <span>Logout</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu> : <></>
            }
        </>
    )
}