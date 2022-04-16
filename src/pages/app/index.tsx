import { Button, Card, Col, Container, Row, Spacer, Text, Tooltip } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC, useRef, useState } from "react";

import { TiArrowSortedDown } from 'react-icons/ti'
import { IoImage, IoVideocam } from 'react-icons/io5'
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { MdVerified } from "react-icons/md"
import { delay } from "../../utils";

const LeftSidebar = () => {
    return (
        <Col css={{ background: "$gray900", maxWidth: "16rem", height: "100vh" }}>
            yo
        </Col>
    )
}

const NewTweetBox = () => {

    const [value, setValue] = useState("");
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const wallet = useWallet()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        textAreaRef.current!.style.height = "auto";
        textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px";
        setValue(e.target.value.trim());
    };



    return (
        <Container xs>
            <Card css={{ background: "#11111188", py: "0.1rem", px: "0.5rem", backdropFilter: "blur(20px)" }}>
                <Row align="center" justify="center">
                    {
                        value.length == 0 &&
                        <img width={45} src={`https://avatars.dicebear.com/api/bottts/${wallet.publicKey}.svg`} />
                    }
                    <textarea
                        ref={textAreaRef}
                        onChange={handleChange}
                        rows={1}
                        placeholder="What's happening?"
                        style={{
                            marginLeft: "1rem",
                            width: "100%",
                            resize: "none",
                            padding: "0",
                            background: "#22222255",
                            border: "none",
                            borderRadius: "0.7rem",
                            paddingLeft: "1.1rem",
                            paddingRight: "1.1rem",
                            paddingTop: "0.6rem",
                            paddingBottom: "0.6rem",
                        }} />
                </Row>
                <Row
                    css={{ py: "0.9rem", px: "0.5rem" }}
                    align="center"
                    justify="center"
                >
                    <Button color="success" css={{
                        borderColor: "$gray800",
                        minWidth: "8rem",
                        height: "auto",
                        "&:hover": {
                            borderColor: "$success",
                        },
                    }} rounded bordered >
                        <IoImage style={{
                            filter: "drop-shadow(1px 2px 3px green)",
                            width: "1.5rem", height: "1.5rem"
                        }} />
                        <Spacer x={0.4} />
                        <span>Photo</span>
                    </Button>
                    <Spacer x={0.5} />
                    <Button css={{
                        borderColor: "$gray800",
                        minWidth: "8rem",
                        height: "auto",
                        "&:hover": {
                            borderColor: "$primary",
                        },
                    }} rounded bordered >

                        <IoVideocam style={{
                            filter: "drop-shadow(1px 2px 4px #0056D0)",
                            width: "1.5rem", height: "1.5rem"
                        }} />
                        <Spacer x={0.4} />
                        <span>Video</span>
                    </Button>
                    {
                        value.length > 0 && <Button css={{
                            marginLeft: "auto",
                            minWidth: "8rem",
                        }} rounded >Publish</Button>
                    }


                </Row>
            </Card>
        </Container>
    )
}

const CopyAdress: FC<{ adress: string }> = ({ adress }) => {

    enum CopyStatus {
        None,
        Copying,
        Success,
        Error
    }

    const statusMap = {
        [CopyStatus.None]: "default",
        [CopyStatus.Copying]: "primary",
        [CopyStatus.Success]: "success",
        [CopyStatus.Error]: "error"
    }
    const statusString = {
        [CopyStatus.None]: "Click to copy",
        [CopyStatus.Copying]: "Copying...",
        [CopyStatus.Success]: "Copied!",
        [CopyStatus.Error]: "Error to copy"
    }
    const [status, setStatus] = useState(CopyStatus.None)

    const truncateAdress = (adress: string) => {
        return adress.substring(0, 4) + "..." + adress.substring(adress.length - 4, adress.length);
    }

    return (
        <Tooltip content={statusString[status]} color={statusMap[status] as any}>
            <Button
                onClick={async () => {

                    try {
                        setStatus(CopyStatus.Copying)
                        await navigator.clipboard.writeText(adress);
                        setStatus(CopyStatus.Success)
                        await delay(1000)
                        setStatus(CopyStatus.None)

                    } catch (error) {
                        setStatus(CopyStatus.Error)
                        await delay(2000)
                        setStatus(CopyStatus.None)
                    }
                }}
                light css={{ color: "$gray600", minWidth: "2rem" }} size="xs">{truncateAdress(adress)}</Button>
        </Tooltip>
    )
}

const Tweet = () => {

    return (
        <>
            <Spacer />
            <Container xs>
                <Card css={{ background: "#11111188", py: "0.4rem", px: "0.4rem", backdropFilter: "blur(20px)" }}>
                    <Row>
                        <Row align="center" >
                            <img width={45} style={{ borderRadius: "10rem" }} src="https://pbs.twimg.com/profile_images/1503591435324563456/foUrqiEw_400x400.jpg" />
                            <Spacer x={0.5} />
                            <Col>
                                <Row align="center">
                                    <Text b weight="medium">Elon Musk</Text>
                                    <Spacer x={0.2} />
                                    <MdVerified color="var(--nextui-colors-primary)" />
                                    <Spacer x={0.2} />
                                    <CopyAdress adress="5xx7nMqp5zzPZdGEWSYrmjLbn9X7QgN2mCaMsYDUgCuj" />
                                </Row>
                                <Text h6 weight="medium" css={{ color: "$gray500" }} >Few minutes ago</Text>
                            </Col>
                        </Row>
                        <Button size="xs" light css={{ minWidth: "2rem", color: "$gray500" }}>
                            <HiOutlineDotsHorizontal size={19} />
                        </Button>
                    </Row>
                    <Spacer y={0.7} />
                    <Row>
                        <Spacer x={2.5} />
                        <Text css={{ color: "$gray200", letterSpacing: "-0.01em" }}>Great work by Tesla Texas Team!! Built & delivered first Giga Texas production cars & threw a killer opening party</Text>
                    </Row>
                </Card>
            </Container >
        </>
    )
}


const Home = () => {
    const wallet = useWallet()

    return (
        <Row>
            <LeftSidebar />
            <div style={{
                width: "100%",
                position: "relative",
                overflow: "auto",
                maxHeight: "100vh",
                background: "url(/dark-night-river-forest-minimal-art.png) center center no-repeat",
                backgroundSize: "cover"
            }}>
                <nav style={{ position: "fixed", top: 0, left: 0, width: "100%", padding: "1rem", display: "flex", justifyContent: "end" }}>
                    <WalletMultiButton
                        startIcon={<img src={`https://avatars.dicebear.com/api/bottts/${wallet.publicKey}.svg`} width={20} />}
                        endIcon={<TiArrowSortedDown />}
                    />
                </nav>
                <div
                    style={{ paddingTop: "5rem", paddingBottom: "3rem" }}>
                    <NewTweetBox />
                    <Spacer />
                    <Tweet />
                    <Tweet />
                    <Tweet />
                    <Tweet />
                    <Tweet />
                </div>
            </div>
        </Row>
    );
}

export default Home;
