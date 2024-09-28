import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function NotFound() {
    return (
        <div className="flex items-center justify-center bg-gray-100">
            <Card className="w-[350px]">
                <CardHeader>
                    <CardTitle className="text-2xl">404</CardTitle>
                    <CardDescription>Page Not Found</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Oops! The page you&#39;re looking for doesn&#39;t exist.</p>
                </CardContent>
                <CardFooter>
                    <Link href="/" passHref>
                        <Button>Go back home</Button>
                    </Link>
                </CardFooter>
            </Card>
        </div>
    )
}