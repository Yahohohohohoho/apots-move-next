"use client";

import React, { useState } from 'react';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { CgArrowsExchangeAltV } from "react-icons/cg";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"


interface Coin {
    id: number;
    name: string;
    icon: string;
}

const coins: Coin[] = [
    { id: 1, name: 'ETH', icon: '🪙' },
    { id: 2, name: 'USDC', icon: '💵' },
    { id: 3, name: 'DAI', icon: '🪙' },
];

const SwapComponent: React.FC = () => {
    const [fromCoin, setFromCoin] = useState<Coin>(coins[0]);
    const [toCoin, setToCoin] = useState<Coin>(coins[1]);
    const [fromAmount, setFromAmount] = useState<number>(0);
    const [toAmount, setToAmount] = useState<number>(0);
    const exchangeRate = 1.2345; // 假设的兑换比率
    const [slippage, setSlippage] = useState<string>('0.5');

    const handleFromCoinChange = (value: string) => {
        setFromCoin(coins.find((coin) => coin.name === value) as Coin);
    };

    const handleToCoinChange = (value: string) => {
        setToCoin(coins.find((coin) => coin.name === value) as Coin);
    };

    const handleFromAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount = parseFloat(e.target.value);
        setFromAmount(amount);
        setToAmount(amount * exchangeRate);
    };

    const handleSlippageChange = (value: number | string) => {
        const numValue = typeof value === 'string' ? parseFloat(value) : value;
        setSlippage(numValue.toString());
    };

    const handleSlippageInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setSlippage(inputValue);
    };

    const handleSwap = () => {
        // 处理兑换逻辑
        console.log('Swapping', fromAmount, fromCoin.name, 'to', toAmount, toCoin.name);
    };

    const handleHalf = () => {
        setFromAmount(fromAmount / 2);
        setToAmount((fromAmount / 2) * exchangeRate);
    };

    const handleMax = () => {
        // 处理最大值逻辑
        console.log('Setting max amount');
    };

    const handleExchange = () => {
        setFromCoin(toCoin);
        setToCoin(fromCoin);
        setFromAmount(toAmount);
        setToAmount(fromAmount);
    };

    return (
        <div className="p-8 rounded-lg shadow w-[480px] bg-background text-card-foreground" >

            <Tabs defaultValue="market" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                    <TabsTrigger value="market">Market</TabsTrigger>
                    <TabsTrigger value="limit">Limit</TabsTrigger>
                </TabsList>
                <TabsContent value="market">
                    <div className="mb-4 p-4 rounded-lg bg-card">
                        <div className="flex justify-between items-center">
                            <p className='text-sm'>From</p>
                            <div className="flex items-center justify-end flex-grow space-x-2 text-xs">
                                <Button
                                    onClick={handleHalf}
                                    size="sm"
                                    className="bg-main bg-opacity-20 rounded-full text-foreground text-xs btn-flat"
                                    style={{ height: '1.5rem' }}
                                >
                                    Half
                                </Button>
                                <Button
                                    onClick={handleMax}
                                    size="sm"
                                    className="bg-main bg-opacity-20 rounded-full text-foreground text-xs"
                                    style={{ height: '1.5rem' }}
                                >
                                    Max
                                </Button>
                                <p>Balance: xxxx ETH</p> {/* 这里的值应该动态计算 */}
                            </div>
                        </div>

                        <div className="flex items-center mt-4">
                            <Input
                                type="number"
                                value={fromAmount}
                                onChange={handleFromAmountChange}
                                className="mr-2 p-2 flex-grow flex-shrink-0 w-2/3 bg-transparent text-xl"
                                placeholder="0.00"
                            />
                            <Select value={fromCoin.name} onValueChange={handleFromCoinChange}>
                                <SelectTrigger className="px-4 py-2 rounded-full flex-grow flex-shrink-0 w-1/3">
                                    <SelectValue placeholder="Select a coin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {coins.map((coin) => (
                                        <SelectItem key={coin.id} value={coin.name}>
                                            {coin.icon} {coin.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="flex justify-center mb-4">
                        <Button
                            variant='ghost'
                            onClick={handleExchange}
                            className="p-2 bg-card rounded-full"
                        >
                            <CgArrowsExchangeAltV className="w-6 h-6" />
                        </Button>
                    </div>

                    <div className="mb-4 p-4 rounded-lg bg-card text-xs">
                        <div className="flex justify-between">
                            <p className='text-sm'>To</p>
                            <p>Balance: xxxx USDC</p> {/* 这里的值应该动态计算 */}
                        </div>
                        <div className="flex items-center mt-4">
                            <Input
                                type="number"
                                value={toAmount}
                                readOnly
                                className="mr-2 p-2 flex-grow flex-shrink-0 w-2/3 bg-transparent text-xl"
                                placeholder="0.00"
                            />
                            <Select value={toCoin.name} onValueChange={handleToCoinChange}>
                                <SelectTrigger className="px-4 py-2 rounded-full flex-grow flex-shrink-0 w-1/3">
                                    <SelectValue placeholder="Select a coin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {coins.map((coin) => (
                                        <SelectItem key={coin.id} value={coin.name}>
                                            {coin.icon} {coin.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="mb-2 text-muted-foreground">Slippage Tolerance</p>
                        <div className="flex items-center space-x-2">
                            <Slider
                                value={[parseFloat(slippage)]}
                                onValueChange={values => handleSlippageChange(values[0])}
                                min={0.25}
                                max={1}
                                step={0.25}
                            />
                            <div className="flex items-center">
                                <Input
                                    type="text"
                                    value={slippage}
                                    onChange={handleSlippageInputChange}
                                    className="w-16 p-2 text-center"
                                    placeholder="0.5"
                                />
                                <span className="mx-2">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <p className="mb-2 text-muted-foreground">Exchange Rate</p>
                        <p>1 {fromCoin.name} = {exchangeRate} {toCoin.name}</p>
                    </div>
                </TabsContent>
                <TabsContent value="limit">
                    <div className="mb-4 p-4 rounded-lg bg-card">
                        <div className="flex justify-between items-center">
                            <p className='text-sm'>From</p>
                            <div className="flex items-center justify-end flex-grow space-x-2  text-xs">
                                <Button
                                    onClick={handleHalf}
                                    size="sm"
                                    className="bg-main bg-opacity-20 rounded-full text-foreground text-xs btn-flat"
                                    style={{ height: '1.5rem' }}
                                >
                                    Half
                                </Button>
                                <Button
                                    onClick={handleMax}
                                    size="sm"
                                    className="bg-main bg-opacity-20 rounded-full text-foreground text-xs"
                                    style={{ height: '1.5rem' }}
                                >
                                    Max
                                </Button>
                                <p>Balance: xxxx ETH</p> {/* 这里的值应该动态计算 */}
                            </div>
                        </div>
                        <div className="flex items-center mt-4">
                            <Input
                                type="number"
                                value={fromAmount}
                                onChange={handleFromAmountChange}
                                className="mr-2 p-2 flex-grow flex-shrink-0 w-2/3 bg-transparent text-xl"
                                placeholder="0.00"
                            />
                            <Select value={fromCoin.name} onValueChange={handleFromCoinChange}>
                                <SelectTrigger className="px-4 py-2 rounded-full flex-grow flex-shrink-0 w-1/3">
                                    <SelectValue placeholder="Select a coin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {coins.map((coin) => (
                                        <SelectItem key={coin.id} value={coin.name}>
                                            {coin.icon} {coin.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="mb-4 p-4 rounded-lg bg-card">
                        <div className="flex justify-between items-center">
                            <p className='text-sm'>Convert Price</p>
                            <div className="flex items-center justify-end flex-grow space-x-2 text-xs">
                                <p>Market Price: 1.2345 XXX</p> {/* 这里的值应该动态计算 */}
                            </div>
                        </div>

                        <div className="flex items-center mt-4">
                            <Input
                                type="number"
                                value={fromAmount}
                                onChange={handleFromAmountChange}
                                className="mr-2 p-2 flex-grow flex-shrink bg-transparent text-xl"
                                placeholder="0.00"
                            />
                            <div className="flex items-center justify-end flex-grow space-x-2 text-md font-semibold text-gray-500">
                                <p>USDT</p> {/* 动态显示选中的币种 */}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center mb-4">
                        <Button
                            variant='ghost'
                            onClick={handleExchange}
                            className="p-2 bg-card rounded-full"
                        >
                            <CgArrowsExchangeAltV className="w-6 h-6" />
                        </Button>
                    </div>

                    <div className="mb-4 p-4 rounded-lg bg-card">
                        <div className="flex justify-between text-xs">
                            <p className='text-sm'>To</p>
                            <p>Balance: xxxx USDC</p> {/* 这里的值应该动态计算 */}
                        </div>
                        <div className="flex items-center mt-4">
                            <Input
                                type="number"
                                value={toAmount}
                                readOnly
                                className="mr-2 p-2 flex-grow flex-shrink-0 w-2/3 bg-transparent text-xl"
                                placeholder="0.00"
                            />
                            <Select value={toCoin.name} onValueChange={handleToCoinChange}>
                                <SelectTrigger className="px-4 py-2 rounded-full flex-grow flex-shrink-0 w-1/3">
                                    <SelectValue placeholder="Select a coin" />
                                </SelectTrigger>
                                <SelectContent>
                                    {coins.map((coin) => (
                                        <SelectItem key={coin.id} value={coin.name}>
                                            {coin.icon} {coin.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <div className="mb-4">
                        <p className="mb-2 text-muted-foreground">Slippage Tolerance</p>
                        <div className="flex items-center space-x-2">
                            <Slider
                                value={[parseFloat(slippage)]}
                                onValueChange={values => handleSlippageChange(values[0])}
                                min={0.25}
                                max={1}
                                step={0.25}
                            />
                            <div className="flex items-center">
                                <Input
                                    type="text"
                                    value={slippage}
                                    onChange={handleSlippageInputChange}
                                    className="w-16 p-2 text-center"
                                    placeholder="0.5"
                                />
                                <span className="mx-2">%</span>
                            </div>
                        </div>
                    </div>
                    <div className="mb-8">
                        <p className="mb-2 text-muted-foreground">Exchange Rate</p>
                        <p>1 {fromCoin.name} = {exchangeRate} {toCoin.name}</p>
                    </div>
                </TabsContent>
            </Tabs>
            <Button onClick={handleSwap} className="w-full py-6 bg-main text-foreground font-semibold">
                Swap
            </Button>


        </div >
    );
};

export default SwapComponent;