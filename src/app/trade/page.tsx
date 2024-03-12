"use client";

import { useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";
import { Calendar } from "lucide-react";
import Image from "next/image";
import { HeroBar } from "./_components/hero_bar";

const TradePage = () => {
    const scrollerRef = useRef<HTMLDivElement>(null);

    // Effect to handle the auto-scrolling
    useEffect(() => {
        const scroller = scrollerRef.current;
        if (scroller) {
            // Logic for auto-scrolling
            // You would use setInterval to increment the scroll position
            // Make sure to clear the interval when the component unmounts
        }
    }, []);


    const components = [
        {
            id: 1,
            title: "0",
            content: "Total DID Minted",
        },
        {
            id: 2,
            title: "0",
            content: "Total Value Locked",
        },
        {
            id: 3,
            title: "0",
            content: "Total Transactions",
        },
        {
            id: 4,
            title: "0",
            content: "Daily Transactions",
        },
    ];

    return (
        <div className="w-full">
            <HeroBar></HeroBar>
            <div className="flex flex-col overflow-x-clip">
                <div className="h-screen flex flex-col flex-grow items-center justify-center">
                    <div className="flex-grow flex gap-x-20">
                        <div className="w-3/4 flex items-center justify-center pl-20 pr-20 py-10">
                            {/* Container taking up 4/5th of the width and centering content vertically */}
                            <div
                                className="flex flex-col space-y-12"
                                style={{ maxWidth: "1000px" }}
                            >
                                {/* Flex container with a larger maximum width and increased space between elements */}
                                <h1
                                    className="text-[3rem] lg:text-[6rem] font-bold"
                                    style={{
                                        background: "linear-gradient(45deg, #75FBC8, #fff)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        lineHeight: "1.3", // Reduced line height for tighter spacing between lines
                                    }}
                                >
                                    {/* Responsive font size, gradient color, and custom line spacing */}
                                    Trading Booster
                                    <br />
                                    for Degen and Earn
                                </h1>
                                <p
                                    className="text-md lg:text-4xl font-bold
                 text-neutral-100 leading-relaxed"
                                    style={{
                                        lineHeight: "1.3",
                                    }}
                                >
                                    {/* Subtitle with responsive font size and a relaxed line height */}
                                    Simpler Trades, Diverse Markets, Elevated Yields.
                                </p>
                            </div>
                        </div>
                        <div className="w-1/4 overflow-auto border-l border-slate-600">
                            {/* Adjusted width for right-side content */}
                            <h2 className="text-3xl font-bold mb-4 pl-10 pr-20 pt-32">
                                NEWS
                            </h2>{" "}
                        </div>
                    </div>
                    <div className="w-full">
                        {/* Container for the fixed item and the marquee */}
                        <div className="h-16 flex items-center pl-4 bg-gradient-to-r from-[#769CFB] to-[#50D480]">
                            {" "}
                            {/* Fixed item container */}
                            <span className="text-lg lg:text-xl font-bold whitespace-nowrap pl-4 pr-8 text-white">
                                Trading 0+ assets
                            </span>
                            <Marquee
                                className="h-24 flex items-center text-white"
                                gradient={false}
                                speed={30}
                            >
                                {/* Bottom scrolling bar */}
                                {/* Ticker news items */}
                                <div className="mx-4">APT $25.99 (+18.88%)</div>
                                <div className="mx-4">APT $25.99 (+18.88%)</div>
                                <div className="mx-4">APT $25.99 (+18.88%)</div>
                                <div className="mx-4">APT $25.99 (+18.88%)</div>
                                <div className="mx-4">APT $25.99 (+18.88%)</div>

                                {/* etc. */}
                            </Marquee>
                        </div>
                    </div>
                </div>

            </div>
            <div className="w-full bg-black flex justify-between items-center pt-10 pb-10">
                {components.map((component) => (
                    <div key={component.id} className="w-1/4 p-2 text-center">
                        <h3 className="text-5xl font-bold mb-2">{component.title}</h3>
                        <p className="text-2xl mt-8">{component.content}</p>

                        <div className="border-b-4 ml-12 mr-12 pb-20 border-slate-800"></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TradePage;
