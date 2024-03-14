"use client";

import Marquee from "react-fast-marquee";
import { generateMockOrders } from "./_components/mock_data";

import OrderBook from "./_components/orderbook";

const OrderbookPage = () => {
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

  const handleUseBuyPrice = (price: number, orderId: string) => {
    console.log(`Use buy price: ${price}, order ID: ${orderId}`);
  };

  const handleUseSellPrice = (price: number, orderId: string) => {
    console.log(`Use sell price: ${price}, order ID: ${orderId}`);
  };

  const askOrders = generateMockOrders(20, false); // 生成 10 个卖单
  const bidOrders = generateMockOrders(20, true); // 生成 15 个买单

  return (
    <div className="w-full">
      <div className="w-full h-full flex">
        <div className="basis-1/3">
            <div className="flex items-center pl-20 pr-20 py-10">
              <OrderBook
                askOrders={askOrders}
                bidOrders={bidOrders}
                onUseBuyPrice={handleUseBuyPrice}
                onUseSellPrice={handleUseSellPrice}
              />
          </div>
        </div>
        <div className="basis-2/3 text-center">TradinggView</div>
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

export default OrderbookPage;
