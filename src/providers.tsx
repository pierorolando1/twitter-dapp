import { createTheme, NextUIProvider } from "@nextui-org/react"
import { FC } from "react"
import { RecoilRoot } from "recoil"
import WalletConnectionProvider from "./features/wallet/providers"

const darkTheme = createTheme({
    type: 'dark'
})

const Providers: FC<{ children: any }> = ({ children }) => {
    return (
        <WalletConnectionProvider>
            <NextUIProvider theme={darkTheme}>
                <RecoilRoot>
                    {
                        children
                    }
                </RecoilRoot>

            </NextUIProvider>
        </WalletConnectionProvider>
    )
}

export default Providers
