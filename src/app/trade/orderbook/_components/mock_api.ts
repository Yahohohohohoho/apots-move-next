// mock-api.ts

import { mockAskOrders, mockBidOrders } from "./mock_data";

export const getMarketPrice = async () => {
  return 50000; // 返回一个固定的市场价格
};

export const getFiatRate = async () => {
  return 1; // 返回一个固定的法币汇率
};

export const getAskOrders = async () => {
  return mockAskOrders; // 返回模拟的卖单数据
};

export const getBidOrders = async () => {
  return mockBidOrders; // 返回模拟的买单数据
};
