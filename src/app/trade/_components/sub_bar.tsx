import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function SubBar() {
    const tabs = [
        { value: "tab1", label: "Swap" },
        { value: "tab2", label: "Orderbook" },
        { value: "tab3", label: "OTC" },
        { value: "tab4", label: "DCA" },
        { value: "tab5", label: "Perpetual" },
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
                            <TabsTrigger
                                key={tab.value}
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
                        ))}
                    </TabsList>
                </Tabs>
            </div>
        </div>
    );

}