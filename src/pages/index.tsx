import type { NextPage } from 'next'

import { Container, Spacer, Text } from "@nextui-org/react"
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { scrollLanding } from '../recoil/scrollLanding'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { useWallet } from '@solana/wallet-adapter-react'
import ConnectWalletButton from '../features/wallet/components/ConnectWallet'

const FixedImage = () => {

    const scroll = useRecoilValue(scrollLanding)

    return (
        <img
            style={{
                position: "fixed",
                opacity: scroll + 0.1,
                zIndex: 0,
                height: "100vh",
                width: "100%",
                objectFit: "cover"
            }}
            src="https://www.sushi.com/_next/static/media/neon-street.c2c38843.jpg" />
    )
}

const Home: NextPage = () => {
    const setScrollLanding = useSetRecoilState(scrollLanding)

    const wallet = useWallet()

    const onScroll = () => {
        const element = document.getElementById("container")!
        var scrollPercentage = element.scrollTop / (element.scrollHeight - element.clientHeight);

        console.log(scrollPercentage)
        setScrollLanding(scrollPercentage)
    }

    return (
        <section
            style={{
                position: "relative"
            }}>
            <FixedImage />
            <Container
                onScroll={onScroll}
                id='container'
                style={{ overflow: "auto", zIndex: 2, position: "absolute", maxHeight: "100vh", top: 0, left: 0, right: 0, width: "100vw", }}
            >
                <div style={{ paddingTop: "2rem", display: "flex", alignItems: "center" }}>
                    {
                        wallet.connected &&
                        <>
                            <WalletMultiButton startIcon={
                                <img src={`https://avatars.dicebear.com/api/bottts/${wallet.publicKey}.svg`} width={20} />
                            } />

                        </>

                    }

                    <ConnectWalletButton color="secondary" shadow style={{ marginLeft: "auto" }}>
                        Connect wallet
                    </ConnectWalletButton>
                </div>

                <Container style={{ height: "80vh", display: "flex", flexDirection: "column", justifyItems: "center", justifyContent: "center", alignItems: "flex-start" }}>
                    <div>
                        <Text
                            h1
                            size={60}
                            css={{
                                display: "inline",
                                textGradient: "45deg, $blue500 -2%, $pink500 70%",
                            }}
                            weight="bold"

                        >Descentralize</Text>
                        &nbsp; &nbsp;
                        <Text
                            size={60}
                            h1 style={{
                                display: "inline",
                                background: "none"
                            }}>your voice</Text>
                    </div>
                    <Text size={20} margin="0" color='#aaa'>Powered by Solana</Text>
                    <Spacer y={1.5} />
                    <ConnectWalletButton shadow>
                        Connect wallet
                    </ConnectWalletButton>
                </Container>
                <div style={{ height: "100vh" }}></div>
            </Container>
            {/* <img style={{ position: "fixed", bottom: '-50%', left: '-10%', right: '-50%', opacity: 0.6 }} src="https://nextui.org/gradient-left-dark.svg" /><img style={{ position: "fixed", top: '-50%', right: '-50%', opacity: 0.6 }} src="https://nextui.org/gradient-right-dark.svg" /> */}
        </section >
    )
}

export default Home
