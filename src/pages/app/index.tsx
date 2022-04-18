import { Button, Card, Container, Loading, Progress, Row, Spacer, Text, Tooltip } from "@nextui-org/react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { FC, useEffect, useRef, useState } from "react";

import { TiArrowSortedDown } from 'react-icons/ti'
import { IoImage, IoVideocam } from 'react-icons/io5'
import { MdExplore } from "react-icons/md"
import { BsFillPersonFill } from "react-icons/bs"

import { delay } from "../../utils";
import { getAllTweets } from "../../features/tweets/api/getAll";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { scrollLanding } from "../../recoil/scrollLanding";
import Link from "next/link";
import { useRouter } from "next/router";
import ConnectWalletButton from "../../features/wallet/components/ConnectWallet";
import Tweet from "../../features/tweets/components/Tweet";
import { tweetState } from "../../recoil/tweet";
import { createNewTweet } from "../../features/tweets/api/createNew";
import useSWR from "swr";
import { CLUSTER } from "../../features/program/consts";
import InformationModal from "../../features/user/components/InformationModal";
import { userGlobalAtom } from "../../features/user/api/recoil/userGlobalAtom";


export const AppScaffold: FC<{
    children: JSX.Element | JSX.Element[],
    pb?: boolean
}> = ({ children, pb = true }) => {

    const wallet = useWallet()
    const setScrollLanding = useSetRecoilState(scrollLanding)

    const [userGlobal, setUserGlobal] = useRecoilState(userGlobalAtom)

    useEffect(() => {
        setUserGlobal({
            name: localStorage.getItem("name") ?? "",
            photoUrl: localStorage.getItem("photoUrl") ?? undefined,
        })
    }, [])

    return (
        <>
            <InformationModal />
            <Row
                css={{
                    zIndex: 101,
                    maxWidth: "100%",
                    width: "100%",
                    position: "fixed",
                    opacity: 0.8,
                    background: "$gray900"
                }}
                align="center"
                justify="center"
            >
                <Text size="0.8rem" weight="medium" b>You are on the {CLUSTER.toUpperCase()}</Text>
            </Row>
            <Row>
                <LeftSidebar />
                <div
                    onScroll={(e) => {
                        const element = e.target as HTMLElement
                        var scrollPercentage = element.scrollTop / (element.scrollHeight - element.clientHeight);
                        console.log(scrollPercentage)
                        setScrollLanding(scrollPercentage)
                    }}
                    style={{
                        width: "100%",
                        position: "relative",
                        overflow: "auto",
                        maxHeight: "100vh",
                        height: "100vh",
                        background: "url(/dark-night-river-forest-minimal-art.jpg) center center no-repeat",
                        backgroundSize: "cover"
                    }}>
                    <Navbar />
                    <div style={{ paddingTop: "6rem", paddingBottom: pb ? "3rem" : "0" }}>
                        {
                            wallet.connected ?
                                children
                                :
                                <>
                                    <Spacer y={3} />
                                    <Container xs>
                                        <Card css={{ background: "#11111166", px: "0.9rem", py: "2.5rem", backdropFilter: "blur(20px)" }}>
                                            <Text css={{ textAlign: "center" }} weight="medium" size={20} b>You need to connect your wallet to interact with the app</Text>
                                            <Spacer />
                                            <ConnectWalletButton css={{ width: "min-content", mx: "auto" }} />
                                        </Card>
                                    </Container>
                                </>
                        }
                    </div>
                </div>
            </Row>
        </>
    )
}


const icons = {
    home: <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" height="21" width="21" xmlns="http://www.w3.org/2000/svg"><path stroke="currentColor" strokeWidth="2" d="M1 22V9.76a2 2 0 01.851-1.636l9.575-6.72a1 1 0 011.149 0l9.574 6.72A2 2 0 0123 9.76V22a1 1 0 01-1 1h-5.333a1 1 0 01-1-1v-5.674a1 1 0 00-1-1H9.333a1 1 0 00-1 1V22a1 1 0 01-1 1H2a1 1 0 01-1-1z"></path></svg>,
    explore: <MdExplore size={21} />,
    profile: <BsFillPersonFill size={21} />,
}

const keysIcons = ["home", "explore", "profile"] as const

const NavLink: FC<{
    href: string,
    as?: string,
    title: string,
    disabled?: boolean,
    icon: typeof keysIcons[number],
}> = ({ href, title, disabled, as, icon }) => {

    const { asPath } = useRouter()

    const style = !disabled
        ? asPath === href || asPath === as ? "active" : "normal"
        : "disabled"

    const state = {
        "normal": "$gray700",
        "disabled": "$gray900",
        "active": "$primary"
    }

    console.log(asPath)

    return (
        <>
            <Link href={href} passHref>
                <Button light={style == "normal" || style == "disabled"} bordered={style == "active"} disabled={disabled}>
                    <Row css={{ color: state[style] }} align="center">
                        {
                            icons[icon]
                        }
                        <Spacer x={0.6} />
                        <Text color="inherit">{title}</Text>
                    </Row>
                </Button>
            </Link>
            <Spacer y={0.5} />
        </>
    )
}


const LeftSidebar = () => {

    console.log("yo")
    return (
        <Row
            align="center"
            justify="center"
            css={{
                display: "none",
                "@xs": {
                    display: "flex"
                },
                flexDirection: "column",
                maxWidth: "16rem", height: "100vh",
                boxShadow: "16px 0px 130px 50px rgba(0,0,0,1)",
            }}
        >
            <NavLink href="/app" title="Home" icon="home" />
            <NavLink href="/app/explore" disabled title="Explore" icon="explore" />
            <NavLink href="/app/profile" title="Profile" icon="profile" />

            <Spacer y={3} />

            <Button rounded>
                Tweet
            </Button>
        </Row >
    )
}



const NewTweetBox = () => {

    const [value, setValue] = useState("");
    const [userRecoil, setUserRecoil] = useRecoilState(userGlobalAtom)
    const [tweetRecoil, setTweetRecoil] = useRecoilState(tweetState);

    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    const wallet = useWallet()

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        textAreaRef.current!.style.height = "auto";
        textAreaRef.current!.style.height = textAreaRef.current!.scrollHeight + "px";
        setValue(e.target.value.trim());
    };

    return (
        <Container xs css={{}}>
            <Card css={{ position: "relative", background: "#11111188", backdropFilter: "blur(20px)" }}>
                <Row align="center" justify="center">
                    {
                        value.length == 0 &&
                        <img
                            style={{ objectFit: "cover", borderRadius: "50%" }}
                            width={45}
                            height={45}
                            alt=""
                            src={userRecoil.photoUrl == "" ? `https://avatars.dicebear.com/api/bottts/${wallet.publicKey}.svg` : userRecoil.photoUrl} />
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
                    <Button
                        color="success"
                        css={{
                            borderColor: "$gray800",
                            minWidth: "8rem",
                            height: "auto",
                            "&:hover": {
                                borderColor: "$success",
                            },
                        }}
                        rounded bordered>
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
                    <Spacer x={0.5} />
                    {
                        value.length > 0 &&
                        <Text color="primary" size={13} b>{value.length}/2024</Text>
                    }
                    {
                        value.length > 0 &&
                        <Button
                            disabled={tweetRecoil.isCreating}
                            onClick={async () => {
                                setTweetRecoil({ ...tweetRecoil, isCreating: true })
                                await createNewTweet(wallet as any, {
                                    url: "https://res.cloudinary.com/piero-rolando/image/upload/v1632012213/gzl88zcngp0pyirl8xbm.jpg",
                                    name: "Piero Rolando",
                                    text: value.trim()
                                })
                                setValue("")
                                setTweetRecoil({ ...tweetRecoil, isCreating: false })

                            }}
                            css={{
                                marginLeft: "auto",
                                minWidth: "8rem",
                            }}
                            rounded>Publish</Button>
                    }
                </Row>
                {
                    tweetRecoil.isCreating &&
                    <div
                        style={{
                            zIndex: 1000,
                            position: "absolute",
                            top: "0",
                            left: "0",
                            borderRadius: "14px",
                            padding: "2px",
                            width: "100%",
                            height: "100%",
                            background: "rgba(0,0,0,0.7)",
                        }}
                    >
                        <Progress
                            css={{
                                height: "0.3rem"
                            }}
                            indeterminated
                            status="primary"
                            color="primary"
                        />
                    </div>
                }
            </Card>
        </Container >
    )
}

export const CopyAdress: FC<{ adress: string }> = ({ adress }) => {

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
        return adress.substring(0, 5) + "..." + adress.substring(adress.length - 5, adress.length);
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



const Navbar = () => {
    const wallet = useWallet()
    const scroll = useRecoilValue(scrollLanding)
    const user = useRecoilValue(userGlobalAtom)

    return (
        <nav style={{
            background: `rgba(0,0,0,${scroll})`,
            backdropFilter: `blur(${scroll == 0 ? 0 : 12}px)`,
            position: "fixed", top: 0, left: 0, width: "100%", padding: "1rem", display: "flex", justifyContent: "end", zIndex: 100
        }}>
            <WalletMultiButton
                startIcon={
                    <img alt="" src={user.photoUrl == "" || !user.photoUrl ? `https://avatars.dicebear.com/api/bottts/${wallet.publicKey}.svg` : user.photoUrl}
                        style={{
                            objectFit: "cover",
                            borderRadius: "50%",
                        }}
                        height={20}
                        width={20}
                    />}
                endIcon={<TiArrowSortedDown />}
            />
        </nav>
    )
}

const Feed = () => {
    const [tweets, setTweets] = useState<{ text: string, url: string, name: string, authority: string }[]>()
    const wallet = useWallet()

    const { data } = useSWR("tweets", () => getAllTweets(wallet as any))

    useEffect(() => {

        (async () => {
            const tweets = data?.map(tweet => ({
                text: tweet.account.text,
                url: tweet.account.posterUrl,
                name: tweet.account.posterName,
                authority: tweet.account.authority.toString()
            }))

            console.log(tweets)
            setTweets(tweets ?? [])
        })()
    }, [wallet, data])


    return <>{

        tweets?.length ?? 0 > 0 ?
            tweets?.map((tweet, index) => (
                <Tweet key={index} tweet={tweet} />
            ))
            :
            <Loading size="lg" css={{ mx: " auto", width: "100%" }} />
    }</>

}

const Home = () => {


    return (
        <AppScaffold>
            <NewTweetBox />
            <Spacer />
            <Feed />
        </AppScaffold>
    )
}

export default Home;
