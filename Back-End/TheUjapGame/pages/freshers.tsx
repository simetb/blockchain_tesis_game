import React, { useEffect, useState } from "react";
import Head from "next/head";
//components
import { FresherCard, MintCard, CornerModal, InputModal} from "../components";
import { Title } from "../components";
// styles
import styles from "../styles/views/freshers.module.scss";
// Moralis
import { useMoralis } from "react-moralis";
// Custom Hooks
import { useUserInfo, useNft, useMarket } from "../hooks";

const Freshers = () => {
  // Custom Hooks {useUserInfo}
  const { loadNfts, nfts, loadIndexNft, indexs } = useUserInfo();
  // Moralis
  const { isAuthenticated } = useMoralis();
  // Custom Hook {useMarket}
  const { putInMarket,successSell,setSuccessSell,errorMarket,setErrorMarket,successOut,setSuccessOut } = useMarket();
  // Custom Hook {useNft}
  const {burnNft, mintNft, transferNft,  setSuccessMint,setSuccessTransfer,setSuccessBurn, setError, successMint,successTransfer,successBurn, error} = useNft()

  // Modals and values
  const[transferModal,setTransferModal] = useState(false)
  const[address,setAddress] = useState("")

  const[textBurn,setTextBurn] = useState("")
  const[burnModal,setBurnModal] = useState(false)

  const[marketModal,setMarketModal] = useState(false)
  const[price,setPrice] = useState(-1)

  // Nft state id from react components
  const[nftId,setNftId] = useState(-1)

  // Transfer Nft
  const transfer = () =>{
    if (address != "") {
      transferNft(address, nftId);
    }
  }

  // Mapping transfer modal
  useEffect(()=>{
    transfer()
  },[address])

  // Burn Nft
  const burn = () =>{
    if(textBurn == "Quemar Mi Nft"){
      burnNft(nftId)
    }
  }
  
  // Mapping Burn Modal
  useEffect(()=>{
    burn()
  },[textBurn])

  // Market Nft
  const market  = () =>{
    if(price > 0 && price != NaN){
      let value = Number(price) 
      putInMarket(nftId,value)
    }
  }

  // Mapping Market Modal
  useEffect(()=>{
    market()
  },[price])

  // Load User Nft
  useEffect(() => {
    loadIndexNft();
    loadNfts();
  }, []);

  // Load user Nft
  useEffect(() => {
    if (isAuthenticated) {
      loadIndexNft();
    }
  }, [isAuthenticated]);

  // Load user indexs Nft
  useEffect(() => {
    loadNfts();
  }, [indexs]);

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Freshers - Mi NFT's</title>
      </Head>
      <Title>Freshers</Title>
      <section className={styles.cards}>
        <MintCard mintNft={mintNft} freshers={nfts.length} />
        {nfts.map((nfts) => (
          <FresherCard 
          key={nfts.id} 
          fresher={nfts} 
          
          burnModal={setBurnModal}

          transferModal={setTransferModal}

          marketModal = {setMarketModal}

          setNftId={setNftId}/>


        ))}
      </section>
      {successMint ? <CornerModal image={1} closeModal={setSuccessMint} showing={successMint} title="Nft" message="Nft Minteado"/> : null}
      {successTransfer ? <CornerModal image={1} closeModal={setSuccessTransfer} showing={successTransfer} title="Nft" message="Nft Transferido"/> : null}
      {successBurn ? <CornerModal image={1} closeModal={setSuccessBurn} showing={successBurn} title="Nft" message="Nft Quemado"/> : null}
      {successSell ? <CornerModal image={1} closeModal={setSuccessSell} showing={successSell} title="Nft" message="Puesto en el Mercado"/> : null}
      {successOut ? <CornerModal image={1} closeModal={setSuccessOut} showing={successOut} title="Nft" message="Nft sacado del Mercado"/> : null}
      
      {transferModal ? <InputModal closeModal={setTransferModal} showing={transferModal} title="Transferir" message="Address Del Afortunado" action={setAddress}/> : null}
      {burnModal ? <InputModal closeModal={setBurnModal} showing={burnModal} title="Quemar" message="Escribe ('Quemar Mi Nft') para confirmar" action={setTextBurn}/> : null}
      {marketModal ? <InputModal closeModal={setMarketModal} showing={marketModal} title="Mercado" message="Ingresa el precio" action={setPrice} type="number"/> : null}
      
      {error ? <CornerModal image={2} closeModal={setError} showing={error} title="Nft" message="Error en la ejecucion"/> : null}
      {errorMarket ? <CornerModal image={2} closeModal={setErrorMarket} showing={errorMarket} title="Nft" message="Error en la ejecucion"/> : null}
    </div>
  );
};

export default Freshers;
