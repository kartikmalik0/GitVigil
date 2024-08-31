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
import { upsertGithubToken } from "@/actions/add-token"
import { useState } from "react"

const formSchema = z.object({
    token: z.string().min(10, "Token is required")
})

export default function AddToken() {
    const [isOpen, setIsOpen] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            token: "",
        },
    })

    const { isSubmitting } = form.formState

    async function onSubmit(data: z.infer<typeof formSchema>) {
        try {
            const res = await upsertGithubToken(data.token)
            setIsOpen(false)
            if (res.success) {
                toast.success(res.message)
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
                                Add Token
                            </Button>
                        </DialogTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>Add Your Github Personal Access Token</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Add GitHub Token</DialogTitle>
                    <DialogDescription>
                        Enter your GitHub Personal Access Token to continue.
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
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isSubmitting}>Add</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}