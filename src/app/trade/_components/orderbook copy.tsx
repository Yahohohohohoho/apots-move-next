// components/OrderBook.tsx

import React from 'react';
import useSWR from 'swr';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Order, mockSelectedPair } from './mock_data';
import { getMarketPrice } from './mock_api';
// import { getFiatRate, getMarketPrice, type Order } from '@/queries/orders-api';
// import { useNetworkStore } from '@/store';
// import { defaultPair, selectedPairKey } from '@/data/trading-pairs';
// import { prettyBalance } from '@/lib/formatters';
// import { calcFiatPrice, showFiat, unit, useBtcUnit } from '@/lib/helpers';

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
    // const networkStore = useNetworkStore();
    // const selectedPair = React.useContext(selectedPairKey) || defaultPair;
    // const { data: marketPrice } = useSWR(
    //     ['marketPrice', { network: networkStore.network, tick: selectedPair.fromSymbol }],
    //     () => getMarketPrice({ tick: selectedPair.fromSymbol }),
    // );
    // const { data: fiatRate } = useSWR(['fiatRate'], getFiatRate);
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

    // const rearrangedAskOrders = React.useMemo(() => {
    //     const freeOrders = askOrders.filter((order) => order.freeState === 1);
    //     const nonFreeOrders = askOrders.filter((order) => order.freeState !== 1);
    //     return [...nonFreeOrders, ...freeOrders];
    // }, [askOrders]);

    const rearrangedAskOrders = React.useMemo(() => {
        const freeOrders = askOrders.filter((order) => order.freeState === 1);
        const nonFreeOrders = askOrders.filter((order) => order.freeState !== 1);
        return [...nonFreeOrders, ...freeOrders].slice(0, 11); // 只显示前 11 条数据
    }, [askOrders]);

    const displayedBidOrders = React.useMemo(() => {
        return bidOrders.slice(0, 11); // 只显示前 11 条数据
    }, [bidOrders]);

    return (
        <div className="flex flex-col gap-y-4 max-h-[60vh]">
            <ScrollArea className="h-full pr-1">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead></TableHead>
                            <TableHead>Price ({unit})</TableHead>
                            <TableHead className="text-right">
                                <div className="flex items-center justify-end">
                                    <span>Amount</span>
                                    <span className="ml-2">${selectedPair.fromSymbol.toUpperCase()}</span>
                                    <img src={selectedPair.fromIcon} className="h-4 rounded-full inline ml-1" />
                                </div>
                            </TableHead>
                            <TableHead className="text-right">
                                <div className="flex items-center justify-end">
                                    <span>Total</span>
                                    <span className="ml-2">({unit})</span>
                                    <img src={selectedPair.toIcon} className="h-4 rounded-full inline ml-1" />
                                </div>
                            </TableHead>
                            <TableHead></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {rearrangedAskOrders.map((order) => (
                            <TableRow key={order.orderId} onClick={() => onUseBuyPrice(order.coinRatePrice, order.orderId)}>
                                <TableCell></TableCell>
                                <TableCell>{prettyBalance(order.coinRatePrice)}</TableCell>
                                <TableCell className="text-right">{order.coinAmount}</TableCell>
                                <TableCell className="text-right">{prettyBalance(order.amount)}</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {!rearrangedAskOrders.length && (
                    <div className="flex h-3/4 w-full items-center justify-center">
                        <span className="text-zinc-500">No ask orders</span>
                    </div>
                )}
            </ScrollArea>

            <div className="flex items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="inline-flex items-center">
                            <span className={`text-lg ${marketPrice ? 'text-green-500' : 'text-zinc-500'}`}>
                                {marketPrice ? `${unit} ${prettyBalance(marketPrice)}` : '-'}
                            </span>
                            {showFiat && fiatRate && marketPrice && (
                                <span className="text-xs text-zinc-500 pl-2">${calcFiatPrice(marketPrice, fiatRate)}</span>
                            )}
                        </TooltipTrigger>
                        <TooltipContent>Market Price</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>

            <ScrollArea className="h-full pr-1">
                {bidOrders.length ? (
                    <Table>
                        <TableHeader>
                            <TableRow className="invisible">
                                <TableHead></TableHead>
                                <TableHead>Price ({unit})</TableHead>
                                <TableHead className="text-right">
                                    <div className="flex items-center justify-end">
                                        <span>Amount</span>
                                        <span className="ml-2">${selectedPair.fromSymbol.toUpperCase()}</span>
                                        <img src={selectedPair.fromIcon} className="h-4 rounded-full inline ml-1" />
                                    </div>
                                </TableHead>
                                <TableHead className="text-right">
                                    <div className="flex items-center justify-end">
                                        <span>Total</span>
                                        <span className="ml-2">({unit})</span>
                                        <img src={selectedPair.toIcon} className="h-4 rounded-full inline ml-1" />
                                    </div>
                                </TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {bidOrders.map((order) => (
                                <TableRow key={order.orderId} onClick={() => onUseSellPrice(order.coinRatePrice, order.orderId)}>
                                    <TableCell></TableCell>
                                    <TableCell>{prettyBalance(order.coinRatePrice)}</TableCell>
                                    <TableCell className="text-right">{order.coinAmount}</TableCell>
                                    <TableCell className="text-right">{prettyBalance(order.amount)}</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="flex h-full items-center justify-center">
                        <span className="text-zinc-500">No bid orders</span>
                    </div>
                )}
            </ScrollArea>
        </div>
    );
};

export default OrderBook;