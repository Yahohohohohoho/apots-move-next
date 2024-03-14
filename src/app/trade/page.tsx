"use client";

import { redirect } from 'next/navigation';

export default function Trade() {
    redirect('/trade/swap');
}

import { useEffect, useRef } from "react";
import Marquee from "react-fast-marquee";

import { generateMockOrders } from "./_components/mock_data";

import OrderBook from "./_components/orderbook";

// const TradePage = () => {
//     const scrollerRef = useRef<HTMLDivElement>(null);

//     // Effect to handle the auto-scrolling
//     useEffect(() => {
//         const scroller = scrollerRef.current;
//         if (scroller) {
//             // Logic for auto-scrolling
//             // You would use setInterval to increment the scroll position
//             // Make sure to clear the interval when the component unmounts
//         }
//     }, []);


//     const components = [
//         {
//             id: 1,
//             title: "0",
//             content: "Total DID Minted",
//         },
//         {
//             id: 2,
//             title: "0",
//             content: "Total Value Locked",
//         },
//         {
//             id: 3,
//             title: "0",
//             content: "Total Transactions",
//         },
//         {
//             id: 4,
//             title: "0",
//             content: "Daily Transactions",
//         },
//     ];

//     const handleUseBuyPrice = (price: number, orderId: string) => {
//         console.log(`Use buy price: ${price}, order ID: ${orderId}`);
//     };

//     const handleUseSellPrice = (price: number, orderId: string) => {
//         console.log(`Use sell price: ${price}, order ID: ${orderId}`);
//     };

//     const askOrders = generateMockOrders(20, false); // 生成 10 个卖单
//     const bidOrders = generateMockOrders(20, true); // 生成 15 个买单

//     return (
//         <div className="w-full">
//             <div className="flex flex-col overflow-x-clip">
//                 <div className="h-screen flex flex-col flex-grow items-center justify-center">
//                     <div className="flex-grow flex gap-x-20">
//                         <div className="w-3/4 flex items-center justify-center pl-20 pr-20 py-10">
//                             <OrderBook
//                                 askOrders={askOrders}
//                                 bidOrders={bidOrders}
//                                 onUseBuyPrice={handleUseBuyPrice}
//                                 onUseSellPrice={handleUseSellPrice}
//                             />
//                         </div>
//                         <div className="w-1/4 overflow-auto border-l border-slate-600">
//                             {/* Adjusted width for right-side content */}
//                             <h2 className="text-3xl font-bold mb-4 pl-10 pr-20 pt-32">
//                                 NEWS
//                             </h2>{" "}
//                         </div>
//                     </div>
//                     <div className="w-full">
//                         {/* Container for the fixed item and the marquee */}
//                         <div className="h-16 flex items-center pl-4 bg-gradient-to-r from-[#769CFB] to-[#50D480]">
//                             {" "}
//                             {/* Fixed item container */}
//                             <span className="text-lg lg:text-xl font-bold whitespace-nowrap pl-4 pr-8 text-white">
//                                 Trading 0+ assets
//                             </span>
//                             <Marquee
//                                 className="h-24 flex items-center text-white"
//                                 gradient={false}
//                                 speed={30}
//                             >
//                                 {/* Bottom scrolling bar */}
//                                 {/* Ticker news items */}
//                                 <div className="mx-4">APT $25.99 (+18.88%)</div>
//                                 <div className="mx-4">APT $25.99 (+18.88%)</div>
//                                 <div className="mx-4">APT $25.99 (+18.88%)</div>
//                                 <div className="mx-4">APT $25.99 (+18.88%)</div>
//                                 <div className="mx-4">APT $25.99 (+18.88%)</div>

//                                 {/* etc. */}
//                             </Marquee>
//                         </div>
//                     </div>
//                 </div>

//             </div>
//             <div className="w-full bg-black flex justify-between items-center pt-10 pb-10">
//                 {components.map((component) => (
//                     <div key={component.id} className="w-1/4 p-2 text-center">
//                         <h3 className="text-5xl font-bold mb-2">{component.title}</h3>
//                         <p className="text-2xl mt-8">{component.content}</p>

//                         <div className="border-b-4 ml-12 mr-12 pb-20 border-slate-800"></div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default TradePage;
