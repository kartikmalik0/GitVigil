"use client"

import { useState } from "react"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

import Link from "next/link"
import { signOut, useSession } from "next-auth/react"
import { Calendar, KeyRound, UsersRound } from "lucide-react"
import EditScheduledCommit from "../dashboard/edit-scheduled-commit/EditScheduledCommit"



export default function ProfileDropDown() {
    const session = useSession()
    const [isCommitModalOpen, setIsCommitModalOpen] = useState(false)

    console.log(session.data?.user)

    return (
        <>
            {session.data?.user ? (
                <>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={session.data?.user && session.data?.user.image} />
                                    <AvatarFallback>JD</AvatarFallback>
                                </Avatar>
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem className="cursor-pointer" onSelect={() => setIsCommitModalOpen(true)}>
                                <Calendar className="mr-2 h-4 w-4" />
                                <span>Manage Scheduled Commits</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="#" className="flex items-center gap-2" prefetch={false}>
                                    <UsersRound className="mr-2 h-4 w-4" />
                                    <span>About Us</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href="/privacy-policy" className="flex items-center gap-2" prefetch={false}>
                                    <KeyRound className="mr-2 h-4 w-4" />
                                    <span>Privacy Policy</span>
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => signOut()} className="text-red-500 flex cursor-pointer justify-center">
                                <span>Logout</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>


                    <EditScheduledCommit
                        isCommitModalOpen={isCommitModalOpen}
                        setIsCommitModalOpen={setIsCommitModalOpen}
                        userId={session.data.user.id}
                    />
                </>
            ) : null}
        </>
    )
}