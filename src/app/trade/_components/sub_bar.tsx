import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function SubBar() {
    const tabs = [
        { value: "swap", label: "Swap" },
        { value: "orderbook", label: "Orderbook" },
        { value: "otc", label: "OTC" },
        { value: "dca", label: "DCA" },
        { value: "perpetual", label: "Perpetual" },
    ];

    return (
        <div className="w-full bg-background">
            <div className="border-t border-b bottom-2 border-[#262826]">
                <Tabs
                    defaultValue={tabs[0].value}
                    className="w-full max-w-4xl mx-auto"
                >
                    <TabsList className="flex bg-background justify-center">
                        {tabs.map((tab) => (
                            <Link key={tab.value} href={`/trade/${tab.value}`}>
                                <TabsTrigger
                                    value={tab.value}
                                    className={cn(
                                        "px-6 py-3 text-base font-medium text-white hover:text-white/80 focus:outline-none",
                                        "border-b border-transparent hover:border-white/80 focus:bg-transparent rounded-none",
                                        "data-[state=active]:border-white",
                                        "active:outline-none active:ring-0"
                                    )}
                                >
                                    {tab.label}
                                </TabsTrigger>
                            </Link>
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );

}