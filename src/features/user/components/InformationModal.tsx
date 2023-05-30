import { useEffect, useState } from "react";
import { Modal, Text, Radio, Input, Spacer, Button } from "@nextui-org/react";
import { useRecoilState } from "recoil";
import { userGlobalAtom } from "../api/recoil/userGlobalAtom";

const imageOptions = ["default", "url", "upload"] as const
type ImageType = typeof imageOptions[number]

const UrlInput = () => {
    const [userRecoil, setUserRecoil] = useRecoilState(userGlobalAtom)

    useEffect(() => {
        setUserRecoil({ ...userRecoil, photoUrl: localStorage.getItem("photoUrl") ?? "" })
    }, [])

    return <>
        <Input
            onChange={(e) => localStorage.setItem("photoUrl", e.target.value)}
            labelPlaceholder="Url" helperColor="primary" color="primary" bordered />
        <Spacer />
    </>

}

const UploadInput = () => {
    return <>
        <Button
            onClick={() => {/*TODO: use ipfs or someshit*/}}
            auto light
        >Upload file</Button>
        
        <Spacer />
        <Input css={{ display: "none" }} hidden type="file" color="primary" />
    </>

}

const renderImageOption = (option: ImageType) => {

    switch (option) {
        case "url":
            return <UrlInput />

        case "upload":
            return <UploadInput />

        default:
            return <></>
    }
};

const InformationModal = () => {

    const [userRecoil, setUserRecoil] = useRecoilState(userGlobalAtom)
    const [imageOption, setImageOption] = useState<ImageType>("default");

    const [nameInput, setNameInput] = useState("")

    console.log(userRecoil)

    return (
        <Modal
            open={userRecoil.photoUrl == undefined || userRecoil.name == ""}
            preventClose
            css={{
                py: "1rem",
                px: "2rem"
            }}>
            <Modal.Header css={{ flexDirection: "column" }}>
                <Text b size={20}>Let's complete your profile</Text>
                <Text size="0.7rem" color="$gray600" b weight="normal">Don't worry about your data, is stored in your local storage</Text>
            </Modal.Header>
            <Spacer />
            <Input
                initialValue={userRecoil.name}
                onChange={(e) => {
                    setNameInput(e.target.value)
                }}
                labelPlaceholder="Name" helperColor="primary" color="primary" bordered
            />
            <Spacer />
            <Text css={{ textAlign: "left" }} b>Select what photo you want to use</Text>
            <Radio.Group onChange={(e) => setImageOption(e as ImageType)} size="xs" value={imageOption} css={{ px: "1rem" }}>
                <Radio size="xs" value="default">Use default photo</Radio>
                <Radio size="xs" value="url">Use url</Radio>
                <Radio size="xs" value="upload">Upload photo</Radio>
            </Radio.Group>
            <Spacer y={2} />
            {
                renderImageOption(imageOption)
            }
            <Button
                disabled={!nameInput}
                onClick={() => {
                    localStorage.setItem("name", nameInput)
                    setUserRecoil({ ...userRecoil, name: nameInput, photoUrl: localStorage.getItem("photoUrl") ?? "" })

                    imageOption == "default" && localStorage.setItem("photoUrl", "")
                }}
                rounded shadow>Save</Button>
            <Spacer y={1} />
        </Modal >
    )
}

export default InformationModal;
