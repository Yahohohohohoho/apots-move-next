
const TradeLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body className="flex h-full flex-col items-center justify-between">
                {children}
            </body>
        </html>
    );
};

export default TradeLayout;
