import { Card, Container, Row, Spacer, Text } from "@nextui-org/react"
import { useWallet } from "@solana/wallet-adapter-react"
import { MdVerified } from "react-icons/md"
import { AppScaffold, CopyAdress } from "."


const ProfilePage = () => {

    const wallet = useWallet()

    return (
        <AppScaffold pb={false}>
            <Row
                css={{
                    position: "relative",
                    height: "100vh",
                    marginTop: "18vh",
                    background: "$black"
                }}
            >
                <Row
                    css={{
                        position: "absolute",
                        top: "-3rem",
                    }}
                >
                    <Container css={{
                        maxW: "30rem",
                    }}>
                        <Card css={{ py: "1.5rem" }}>
                            <Row css={{
                                flexDirection: "column",
                            }} align="center">

                                <img
                                    style={{
                                        borderRadius: "100%",
                                        width: "5rem",
                                        objectFit: "cover"
                                    }}
                                    src="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg"

                                />
                                <Spacer y={0.7} />
                                <Row align="center" justify="center">
                                    <Text size={19} b>Elon Musk</Text>
                                    <Spacer x={0.25} />
                                    <MdVerified color="var(--nextui-colors-primary)" />
                                </Row>
                                <CopyAdress adress={wallet.publicKey?.toString()!} />
                            </Row>
                        </Card>
                    </Container>
                </Row>
            </Row>
        </AppScaffold >

    )
}

export default ProfilePage
