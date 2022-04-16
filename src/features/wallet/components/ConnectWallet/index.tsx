import { Button, ButtonProps } from "@nextui-org/react"
import { useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { useRouter } from "next/router";

/**
* This opens a modal that allows the user select a wallet
*/
const ConnectWalletButton: React.FC<ButtonProps> = (props) => {

    const wallet = useWallet()
    const { visible, setVisible } = useWalletModal();

    const router = useRouter()

    return <Button
        onClick={() => {
            wallet.connected ?
                router.push("/app") :
                setVisible(true)
        }} rounded auto {...props}
        disabled={wallet.connecting || visible}
    >
        {
            wallet.connecting ?
                "Connecting..." :
                wallet.publicKey ? "Go to app" : "Connect Wallet"
        }
    </Button>

}

export default ConnectWalletButton
