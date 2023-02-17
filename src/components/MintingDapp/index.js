import React, { useState, useEffect } from "react";
import logo from '../../shylock-logo.png';
import twitterIcon from '../../twitter.png';
import ReactPlayer from 'react-player';
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
// import Typewriter from 'typewriter-effect';
import 'animate.css';
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import { motion } from "framer-motion";
import './MintingDapp.scss';
import circleLoop from '../../Video/loop-circle.mp4';
import { ethers } from "ethers";
import contractABI from '../../abi/contractABI.json';
import MerkleTree from 'merkletreejs';
import keccak256 from 'keccak256';
import { toast } from 'react-toastify';

const contractAddress = "0x14e6c5D1462a21fBD13f9e754cef584bDff38472";

const MintingDapp = () => {
    const address = useAddress();
    let navigate = useNavigate();

    const [isWhiteListUser, setIsWhiteListUser] = useState(false);
    const [tokenCount, setTokenCount] = useState(1);
    const [hexProof, setHexProof] = useState([]);
    const [signer, setSigner] = useState(null);
    const [progress, setProgress] = useState(0);
    const [contractDetails, setContractDetails] = useState({
        MAX_TOKENS: "",
        allowlistMints: "",
        price: "",
        presalePrice: "",
        maxPerALWallet: "",
        maxPerWallet: "",
        totalMinted: "",
        preSaleStarted: true,
        freeMax: null,
        maxWhitelistFreeMint: null,
    })


    // All Whitelisted Address
    let whitelist = [
        '0x8ba64E2EEce8a522058939f8253D42CffEfF9E06', // account 6 metamask id ben
        '0x88b0146D1CD316c96F47fB631c57530758ffa84A', //account 7 metamask id ben
        // '0x2B9BbC63e0751b460b0423DA967a27Eab12B96cb', // metamask id ben
        '0x624deBbC5c3Ff951b257cB4E06975Aa82a36E642', // metamask id ben
        '0xCEa3506e61c9F3f839eB881E4E1e5ebfA19B13F1', // metamask id ben
        '0xf3f91d957D142703cc26E3C6a70df14036906F27', // metamask id ben
        '0xf6D14956e5c77390C8367CCDbcb5b845244365dE',
        '0x88b0146D1CD316c96F47fB631c57530758ffa84A', //account 7 metamask id ben
        '0x4f6Cb155B513c6b917Beab345a01be235a2DB28E',
        '0x8ba64E2EEce8a522058939f8253D42CffEfF9E06', // account 6 metamask id ben
        '0xE4C70800F7fBf773A5E18BC96b0eF4135f63f63E',
        '0x97557dB165c299663Ef134F18E1Fb3F093a1F15e',
        '0x670f8FE66F551cdeDa29eAF0Bf380A412e404127',
        '0xb9395AfB1a1a42050fa11562C4c9cA35D1Ec7cF3',
        '0xB282100108E572c21A199ec9B0B4E9cCA3BB641C',
        '0x0Ba6D5893166676B18Ab798a865671d36F11b793'
    ]

    useEffect(() => {

        const tempProvider = new ethers.providers.Web3Provider(window.ethereum);
        const tempSigner = tempProvider.getSigner();
        setSigner(tempSigner);
        // setProvider(tempProvider);
        getContractDetails();
        findMerkleRoot();
        findHexProof();
        const idx = whitelist.indexOf(address);
        console.log(idx);

        if (whitelist.includes(address)) {
            setIsWhiteListUser(true);
            // setTokenCount(2);

        } else {
            setIsWhiteListUser(false);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [address])

    const getContractDetails = async () => {
        const nftContract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );
        try {
            if (window.ethereum) {
                let MAX_TOKENS = await nftContract.maxSupply();
                let tempPrice = await nftContract.mintPrice();
                let price = ethers.utils.formatEther(tempPrice)
                let tempPresalePrice = await nftContract.wlMintPrice();
                let presalePrice = ethers.utils.formatEther(tempPresalePrice)
                let maxPerALWallet = await nftContract.wlMaxMint();
                let maxPerWallet = await nftContract.publicMaxMint();
                let totalMinted = await nftContract.totalSupply();
                let isPreSaleStarted = await nftContract.wlMintEnabled();
                let freeMax = await nftContract.freeMax();
                let maxWhitelistFreeMint = await nftContract.wlMaxMint();
                console.log('freemax', freeMax.toNumber());

                const progressValue = (totalMinted / MAX_TOKENS) * 100;
                setProgress(progressValue);

                setContractDetails((prev) => {
                    return { ...prev, "MAX_TOKENS": MAX_TOKENS.toString(), "price": price.toString(), "presalePrice": presalePrice.toString(), "maxPerALWallet": maxPerALWallet.toString(), "maxPerWallet": maxPerWallet.toString(), "totalMinted": totalMinted.toString(), "preSaleStarted": isPreSaleStarted, "freeMax": freeMax.toNumber(), "maxWhitelistFreeMint": maxWhitelistFreeMint.toNumber() }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    //public Mint
    const publicMinting = async () => {

        if (window.ethereum) {

            const nftContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );
            try {

                await nftContract.publicMint(
                    ethers.BigNumber.from(tokenCount), {
                    value: ethers.utils.parseEther((contractDetails.price * tokenCount).toString()),
                });

                // let tx = await nftMinting.wait();
                // console.log(tx);
            } catch (error) {
                toast.error("User rejected transaction", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: 'foo-bar',
                    theme: "dark"
                })
                console.log(error);
            }
        } else {
            toast.error("wallet not connected", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar',
                theme: "dark"
            })
        }
    };

    //white list Mint
    const whiteListMinting = async () => {

        if (window.ethereum) {
            const nftContract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );

            try {
                console.log(contractDetails.freeMax);
                if (contractDetails.freeMax < contractDetails.maxWhitelistFreeMint) {
                    console.log("1 nft free", contractDetails.price * (tokenCount - 1));
                    await nftContract.whitelistMint(ethers.BigNumber.from(tokenCount), hexProof,
                        {
                            value: ethers.utils.parseEther((contractDetails.presalePrice * (tokenCount - 1)).toString()),
                        },
                    );
                } else {
                    await nftContract.whitelistMint(ethers.BigNumber.from(tokenCount), hexProof,
                        {
                            value: ethers.utils.parseEther((contractDetails.presalePrice * tokenCount).toString()),
                        },
                    );
                }
            } catch (error) {
                toast.error("User rejected transaction", {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    className: 'foo-bar',
                    theme: "dark"
                })
                console.log(error);
            }
        } else {
            toast.error("wallet not connected", {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: 'foo-bar',
                theme: "dark"
            })
        }
    };

    const findMerkleRoot = () => {
        let leafNode = whitelist.map(addr => keccak256(addr));
        const merkleTree = new MerkleTree(leafNode, keccak256, { sortPairs: true });
        const rootHash = merkleTree.getHexRoot();
        console.log('roothash', rootHash);
    }

    // new Hex Proof
    const findHexProof = async () => {
        let leafNode = whitelist.map(addr => keccak256(addr));
        // eslint-disable-next-line array-callback-return
        whitelist.map((whiteAddress, index) => {
            // console.log(whiteAddress, index);
            const merkleTree = new MerkleTree(leafNode, keccak256, { sortPairs: true });
            const clamingAddress = leafNode[index];
            const hexProof = merkleTree.getHexProof(clamingAddress);
            const idx = whitelist.indexOf(address);
            if (idx === index) {
                console.log(hexProof, 'hexProof');
                setHexProof(hexProof);
            }
            // return hexProof;
        })
    }

    function handleTokenDecrease() {
        //   if (isWhiteListUser && contractDetails.preSaleStarted) {
        //   if (tokenCount > 2) {
        //     setTokenCount(tokenCount - 1);
        //   }
        // }else{
        if (tokenCount > 1) {
            setTokenCount(tokenCount - 1);
        }
        // }
    }
    const handleTokenIncrease = () => {
        if (isWhiteListUser && contractDetails.preSaleStarted) {
            if (tokenCount < contractDetails.maxPerALWallet) {
                setTokenCount(tokenCount + 1);
            }
        } else {
            if (tokenCount < contractDetails.maxPerWallet) {
                setTokenCount(tokenCount + 1);
            }
        }

    }

    return (
        <>
            <motion.div className="chapter-container"
                initial={{ opacity: 0, transition: { duration: 0.8 } }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.8 } }}
            >
                <div className="app-container">
                    <div className="header dapp_header bg-transparent d-flex">
                        <div className="twitter-id back-btn ms-4">
                            <div className="back-arrow d-flex align-items-center justify-content-center" onClick={() => navigate('/')}>
                                <span>{'<<'}</span>
                            </div>
                        </div>
                        <div className="logo-container cursor-pointer" onClick={() => navigate('/')}>
                            <img src={logo} className="shylock-logo" alt="logo" />
                        </div>
                        <div className={`metakey me-4 ${address ? "border-orange" : ""}`}>
                            {address
                                ? address.slice(0, 5) + "..." + address.slice(-5)
                                : ""}
                        </div>
                    </div>

                    <ReactPlayer className={`circle-loop-video`} url={circleLoop} playing={true} controls={false} volume={1} muted={false} loop={true} playsinline={true} />

                    <div className='row main-container'>
                        <div className="col-md-6 d-flex flex-column justify-content-center">
                            <div className='contract-details'>
                                <div>
                                    <div className="d-flex justify-content-center my-3">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" aria-label="Example with label" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>

                                    <div className='my-3'>Supply : <span className='orange-text'>{contractDetails.totalMinted ? contractDetails.totalMinted : "XXXX"} / {contractDetails.MAX_TOKENS ? contractDetails.MAX_TOKENS : "XXXX"}</span></div>
                                    <div className='my-3'>price : <span className='orange-text'>{contractDetails.price} ETH</span></div>
                                    <div className='my-3'>Whitelist Price : <span className='orange-text'>{contractDetails.presalePrice} ETH</span></div>
                                </div>
                            </div>

                        </div>
                        <div className="col-md-6 d-flex flex-column justify-content-center">
                            <div className='minting-box'>
                                <div>
                                    <ConnectWallet
                                        accentColor="#000"
                                    />
                                    <div className='orange-text my-2'>Token Count</div>
                                    <div className="token-input-container d-flex justify-content-center align-items-center">
                                        <button className="decrease-count dapp_btn" onClick={handleTokenDecrease}>-</button>
                                        <div className="token-value dapp_btn mx-2">{tokenCount}</div>
                                        <button className="increase-count dapp_btn" onClick={handleTokenIncrease}>+</button>
                                    </div>
                                    <div className='my-2 orange-text cursor-pointer' onClick={isWhiteListUser && contractDetails.preSaleStarted ? () => setTokenCount(contractDetails.maxPerALWallet) : () => setTokenCount(contractDetails.maxPerWallet)}>max : {isWhiteListUser ?
                                        contractDetails.preSaleStarted ? contractDetails.maxPerALWallet : contractDetails.maxPerWallet
                                        : contractDetails.maxPerWallet}
                                    </div>
                                </div>

                                <div className='text-center d-flex flex-column justify-content-center align-items-center'>

                                    {address && (
                                        isWhiteListUser ?
                                            contractDetails.preSaleStarted ?
                                                <button className='ms-2 my-2 dapp_btn' onClick={whiteListMinting}>WhiteList Mint</button>
                                                :
                                                <button className='ms-2 my-2 dapp_btn' onClick={publicMinting}>Mint</button>
                                            :
                                            <button className='ms-2 my-2 dapp_btn' onClick={publicMinting}>Mint</button>
                                    )
                                    }
                                    {
                                        address && (
                                            isWhiteListUser ?
                                                contractDetails.preSaleStarted ?
                                                    <div className='my-2'>You are Whitelisted</div>
                                                    :
                                                    <div className='my-2'>Your Whitelist Tokens are completed</div>
                                                :
                                                <div className='my-2'>You are not WhiteListed</div>
                                        )
                                    }
                                </div>
                            </div>

                        </div>
                        {/* <div className="col-md-4"></div> */}
                    </div>

                    <div className='footer dapp_footer'>
                        <button className="twitter-btn">
                            <a target="_blank" href="https://twitter.com/shylocknft" rel="noreferrer">
                                <img src={twitterIcon} className="twitter-logo" alt="twitter" />
                            </a>
                        </button>
                    </div>
                </div>

            </motion.div>
        </>
    )
}

export default MintingDapp