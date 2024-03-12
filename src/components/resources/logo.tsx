import Image from "next/image";
import localFont from "next/font/local";

import { cn } from "@/lib/utils";

const headingFont = localFont({
    src: "../../../public/fonts/font.woff2",
});

export const Logo = () => {
    return (
        <div className="hover:opacity-75 transition flex items-center gap-x-2 md:flex">
            <div style={{ width: '2.8125rem', height: '2.8125rem', position: 'relative' }}>
                <Image
                    src="/images/unitxn.svg"
                    alt="Logo"
                    layout="fill"
                    objectFit="contain"
                />
            </div>
            <p className={cn(
                "text-[1.5rem] text-white pb-1", // 使用 text-[1.5rem] 直接指定字体大小
                headingFont.className,
            )}>
                UniTxn
            </p>
        </div>
    );
};
