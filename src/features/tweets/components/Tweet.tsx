import { Spacer, Container, Card, Row, Col, Text, Button } from "@nextui-org/react"
import { FC } from "react"
import { HiOutlineDotsHorizontal } from "react-icons/hi"
import { MdVerified } from "react-icons/md"
import { CopyAdress } from "../../../pages/app"


export type TweetProps = {
    tweet: {
        text: string,
        url: string,
        name: string,
        authority: string,
    }
}

const Tweet: FC<TweetProps> = ({ tweet: { text, name, url, authority } }) => {

    return (
        <>
            <Spacer />
            <Container xs>
                <Card css={{ background: "#11111188", py: "0.4rem", px: "0.4rem", backdropFilter: "blur(20px)" }}>
                    <Row>
                        <Row align="center" >
                            <img width={45} height={45} style={{ borderRadius: "10rem", objectFit: "cover" }} src={url} />
                            <Spacer x={0.5} />
                            <Col>
                                <Row align="center">
                                    <Text b weight="medium">{name}</Text>
                                    <Spacer x={0.2} />
                                    <MdVerified color="var(--nextui-colors-primary)" />
                                    <Spacer x={0.2} />
                                    <CopyAdress adress={authority} />
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
                        <Text css={{ color: "$gray200", letterSpacing: "-0.01em" }}>{text}</Text>
                    </Row>
                </Card>
            </Container >
        </>
    )
}

export default Tweet
