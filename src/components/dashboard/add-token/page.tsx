"use client"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { GlobeLock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { useEffect, useState } from "react"
import { upsertGithubToken } from "@/actions/add-token"
import { useSession } from "next-auth/react"


const formSchema = z.object({
    token: z.string().min(10, "Token is required")
})

export default function AddToken({ token }: { token: string }) {
    const [isOpen, setIsOpen] = useState(false)



    useEffect(() => {
        if (token === "NO_TOKEN") {
            setIsOpen(true)
        }
    }, [token])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token: "",
        },
    })

    const session = useSession()
    if (session.status == "unauthenticated") {
        return null
    }

    const { isSubmitting } = form.formState

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const res = await upsertGithubToken(data.token)
            setIsOpen(false)
            if (res.success) {
                toast.success("Your token added")
            }
        } catch (error) {
            toast.error("Error in Upserting Token")
        }
    }




    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <DialogTrigger asChild>
                            <Button className="gap-1">
                                <GlobeLock className="h-5 w-5" />
                                {token === "NO_TOKEN" ? "Add Token" : "Update Token"}
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{token === "NO_TOKEN" ? "Add Your Github Personal Access Token" : "Update Your Github Personal Access Token"}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>{token === "NO_TOKEN" ? "Add GitHub Token" : "Update GitHub Token"}</DialogTitle>
                    <DialogDescription>
                        {token === "NO_TOKEN"
                            ? "Enter your GitHub Personal Access Token to continue."
                            : "Update your GitHub Personal Access Token."}
                    </DialogDescription>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="token"
                            render={({ field }) => (
                                <FormItem>
                                    <Label htmlFor="token">GitHub Token</Label>
                                    <FormControl>
                                        <Input id="token" {...field} placeholder="ghp_..." />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter className="sm:justify-end">
                            {token !== "NO_TOKEN" && (
                                <Button type="button" variant="secondary" onClick={() => setIsOpen(false)}>
                                    Cancel
                                </Button>
                            )}
                            <Button type="submit" disabled={isSubmitting}>
                                {token === "NO_TOKEN" ? "Add" : "Update"}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}