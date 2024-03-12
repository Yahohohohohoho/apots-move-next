// components/OrderBook.tsx

import React from 'react';
import useSWR from 'swr';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Order, mockSelectedPair } from './mock_data';
import { getMarketPrice } from './mock_api';

export const prettyBalance = (balance: number) => {
    return balance.toFixed(2); // 保留两位小数
};

export const calcFiatPrice = (price: number, rate: number) => {
    return (price * rate).toFixed(2); // 计算法币价格
};

export const showFiat = true; // 是否显示法币价格
export const unit = 'USD'; // 价格单位

interface OrderBookProps {
    askOrders?: Order[];
    bidOrders?: Order[];
    onUseBuyPrice: (price: number, orderId: string) => void;
    onUseSellPrice: (price: number, orderId: string) => void;
}

const OrderBook: React.FC<OrderBookProps> = ({ askOrders = [], bidOrders = [], onUseBuyPrice, onUseSellPrice }) => {
    const [marketPrice, setMarketPrice] = React.useState<number | null>(null);
    React.useEffect(() => {
        const fetchMarketPrice = async () => {
            const price = await getMarketPrice();
            setMarketPrice(price);
        };

        fetchMarketPrice();
    }, []);

    const fiatRate = 1;
    const selectedPair = mockSelectedPair;

    const displayedAskOrders = React.useMemo(() => {
        return askOrders.slice(0, 11);
    }, [askOrders]);

    const displayedBidOrders = React.useMemo(() => {
        return bidOrders.slice(0, 11);
    }, [bidOrders]);

    const emptyRows = (count: number) => Array.from({ length: count }, (_, index) => (
        <TableRow key={`empty-${index}`}>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
        </TableRow>
    ));

    return (
        <div className="flex-col items-center gap-y-2">
            <div className="flex-1" style={{ height: `calc(${(displayedAskOrders.length + 1) * 32}px + 1rem)` }}>
                <Table className="table-compact">
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-1/12 pl-4"></TableHead>
                            <TableHead className="w-5/12">Price ({unit})</TableHead>
                            <TableHead className="w-3/12 text-right">
                                <div className="flex items-center justify-end">
                                    <span>Amount</span>
                                    <span className="ml-2">${selectedPair.fromSymbol.toUpperCase()}</span>
                                    <img src={selectedPair.fromIcon} className="h-4 rounded-full inline ml-1" />
                                </div>
                            </TableHead>
                            <TableHead className="w-3/12 text-right">
                                <div className="flex items-center justify-end">
                                    <span>Total</span>
                                    <span className="ml-2">({unit})</span>
                                    <img src={selectedPair.toIcon} className="h-4 rounded-full inline ml-1" />
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {emptyRows(11 - displayedAskOrders.length)}
                        {displayedAskOrders.map((order) => (
                            <TableRow key={order.orderId} onClick={() => onUseBuyPrice(order.coinRatePrice, order.orderId)}>
                                <TableCell className="pl-4"></TableCell>
                                <TableCell className="w-5/12">{prettyBalance(order.coinRatePrice)}</TableCell>
                                <TableCell className="w-3/12 text-right">{order.coinAmount}</TableCell>
                                <TableCell className="w-3/12 text-right">{prettyBalance(order.amount)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mx-auto">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="inline-flex items-center">
                            <span className={`text-lg ${marketPrice ? 'text-green-500' : 'text-zinc-500'}`}>
                                {marketPrice ? `${prettyBalance(marketPrice)}` : '-'}
                            </span>
                            {showFiat && fiatRate && marketPrice && (
                                <span className="text-xs text-zinc-500 pl-2">${calcFiatPrice(marketPrice, fiatRate)}</span>
                            )}
                        </TooltipTrigger>
                        <TooltipContent>Market Price</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <div className="flex-1" style={{ height: `calc(${(displayedBidOrders.length + 1) * 32}px + 1rem)` }}>
                <Table className="table-compact">
                    <TableHeader>
                        <TableRow className="invisible">
                            <TableHead className="w-1/12 pl-4"></TableHead>
                            <TableHead className="w-5/12">Price ({unit})</TableHead>
                            <TableHead className="w-3/12 text-right">
                                <div className="flex items-center justify-end">
                                    <span>Amount</span>
                                    <span className="ml-2">${selectedPair.fromSymbol.toUpperCase()}</span>
                                    <img src={selectedPair.fromIcon} className="h-4 rounded-full inline ml-1" />
                                </div>
                            </TableHead>
                            <TableHead className="w-3/12 text-right">
                                <div className="flex items-center justify-end">
                                    <span>Total</span>
                                    <span className="ml-2">({unit})</span>
                                    <img src={selectedPair.toIcon} className="h-4 rounded-full inline ml-1" />
                                </div>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {displayedBidOrders.map((order) => (
                            <TableRow key={order.orderId} onClick={() => onUseSellPrice(order.coinRatePrice, order.orderId)}>
                                <TableCell className="pl-4"></TableCell>
                                <TableCell className="w-5/12">{prettyBalance(order.coinRatePrice)}</TableCell>
                                <TableCell className="w-3/12 text-right">{order.coinAmount}</TableCell>
                                <TableCell className="w-3/12 text-right">{prettyBalance(order.amount)}</TableCell>
                            </TableRow>
                        ))}
                        {emptyRows(11 - displayedBidOrders.length)}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default OrderBook;