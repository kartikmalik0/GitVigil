
import { Rubik_Moonrocks } from "next/font/google"

const inter = Rubik_Moonrocks({
    subsets: ["cyrillic"],
    weight: ["400"]
})


const Logo = () => {
    return (
        <h1 className={`${inter.className} text-2xl`}>
            Git
            <span className="text-themeColor">
                Vigil
            </span>
        </h1>
    )
}

export default Logo
