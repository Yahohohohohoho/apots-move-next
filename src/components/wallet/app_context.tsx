import { OKXWallet } from "@okwallet/aptos-wallet-adapter";
import {
    AptosWalletAdapterProvider,
    NetworkName,
} from "@aptos-labs/wallet-adapter-react";
import { AutoConnectProvider, useAutoConnect } from "./auto_connect_provider";
import { FC, ReactNode } from "react";
import { AlertProvider, useAlert } from "./alert_provider";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const { autoConnect } = useAutoConnect();
    const { setErrorAlertMessage } = useAlert();

    const wallets = [
        new OKXWallet(),
    ];

    return (
        <AptosWalletAdapterProvider
            plugins={wallets}
            autoConnect={autoConnect}
            onError={(error) => {
                console.log("Custom error handling", error);
                setErrorAlertMessage(error);
            }}
        >
            {children}
        </AptosWalletAdapterProvider>
    );
};

export const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <AutoConnectProvider>
            <AlertProvider>
                <WalletContextProvider>{children}</WalletContextProvider>
            </AlertProvider>
        </AutoConnectProvider>
    );
};
