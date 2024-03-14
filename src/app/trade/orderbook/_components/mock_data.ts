// mock-data.ts
// mock-data.ts

// import { Order } from "./types";

export type Order = {
  amount: number;
  buyerAddress: string;
  coinAmount: number;
  coinDecimalNum: number;
  coinRatePrice: number;
  coinPrice: number;
  net: "mainnet" | "testnet";
  orderId: string;
  orderState: number;
  orderType: number;
  freeState?: 1 | 0;
  sellerAddress: string;
  tick: string;
  timestamp: number;
};

export const mockAskOrders: Order[] = [
  {
    amount: 5000,
    buyerAddress: "0x123...",
    coinAmount: 0.1,
    coinDecimalNum: 8,
    coinRatePrice: 28.81,
    coinPrice: 5000,
    net: "testnet",
    orderId: "1",
    orderState: 0,
    orderType: 0,
    freeState: 1,
    sellerAddress: "0x456...",
    tick: "BTC/USD",
    timestamp: 1621234567,
  },
  {
    amount: 5141,
    buyerAddress: "0x123...",
    coinAmount: 0.2,
    coinDecimalNum: 8,
    coinRatePrice: 28.92,
    coinPrice: 5000,
    net: "testnet",
    orderId: "2",
    orderState: 0,
    orderType: 0,
    freeState: 1,
    sellerAddress: "0x456...",
    tick: "BTC/USD",
    timestamp: 1621234567,
  },
];

export const mockBidOrders: Order[] = [
  {
    amount: 7350,
    buyerAddress: "0x789...",
    coinAmount: 0.15,
    coinDecimalNum: 8,
    coinRatePrice: 49000,
    coinPrice: 7350,
    net: "testnet",
    orderId: "3",
    orderState: 0,
    orderType: 1,
    freeState: 1,
    sellerAddress: "0xabc...",
    tick: "BTC/USD",
    timestamp: 1621234567,
  },
  // ... 添加更多模拟数据
];

export interface TradingPair {
  id: number;
  fromSymbol: string;
  toSymbol: string;
  fromIcon: string;
  toIcon: string;
  hasPool?: boolean;
  usePool?: boolean;
  useDecimals?: number;
  isNew?: boolean;
  hasEvent?: boolean;
}

export const mockTradingPairs: TradingPair[] = [
  {
    id: 1,
    fromSymbol: "BTC",
    toSymbol: "USD",
    fromIcon: "/path/to/btc-icon.png",
    toIcon: "/path/to/usd-icon.png",
    hasPool: true,
    usePool: true,
    useDecimals: 8,
    isNew: false,
    hasEvent: false,
  },
  // ... 添加更多模拟数据
];

export const mockSelectedPair: TradingPair = mockTradingPairs[0];

const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

const getRandomString = (length: number) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export const generateMockOrders = (count: number, isAsk: boolean): Order[] => {
  const orders: Order[] = [];
  const initialPrice = getRandomNumber(1000, 2000);
  const priceStep = getRandomNumber(0.1, 1);

  for (let i = 0; i < count; i++) {
    const order: Order = {
      amount: getRandomNumber(100, 20000),
      buyerAddress: getRandomString(42),
      coinAmount: getRandomNumber(0.1, 10),
      coinDecimalNum: 18,
      coinRatePrice: isAsk
        ? initialPrice + i * priceStep
        : initialPrice - i * priceStep,
      coinPrice: getRandomNumber(1000, 2000),
      net: Math.random() < 0.5 ? "mainnet" : "testnet",
      orderId: `order-${i}`,
      orderState: Math.floor(Math.random() * 5),
      orderType: Math.floor(Math.random() * 3),
      freeState: Math.random() < 0.5 ? 1 : 0,
      sellerAddress: getRandomString(42),
      tick: getRandomString(3).toUpperCase(),
      timestamp: Date.now() + Math.floor(Math.random() * 1000000),
    };

    orders.push(order);
  }

  return orders.sort((a, b) =>
    isAsk
      ? a.coinRatePrice - b.coinRatePrice
      : b.coinRatePrice - a.coinRatePrice
  );
};
