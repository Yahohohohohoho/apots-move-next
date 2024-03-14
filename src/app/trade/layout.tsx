
import { HeroBar } from "./_components/hero_bar";
import SubBar from "./_components/sub_bar";

const TradeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="w-full h-full flex-col items-center justify-between">
                <HeroBar />
                <SubBar />
                {children}
            </body>
        </html>
    );
};

export default TradeLayout;
