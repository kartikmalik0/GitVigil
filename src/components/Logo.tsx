import { Rubik_Moonrocks } from "next/font/google"
import Link from "next/link"

const inter = Rubik_Moonrocks({
    subsets: ["cyrillic"],
    weight: ["400"]
})


const Logo = () => {
    return (
        <Link href="/">
            <h1 className={`${inter.className} text-2xl cursor-pointer`}>
                Git
                <span className="text-themeColor">
                    Vigil
                </span>
            </h1>
        </Link>
    )
}

export default Logo
