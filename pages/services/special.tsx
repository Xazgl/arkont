
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import { FooterMain } from '../../src/component/actual/FooterMain'
import { SpecialBanner } from '../../src/component/actual/specialPage/SpecialBanner'
import BarMenu from '../../src/component/BarMenu'
import { MenuBar } from '../../src/component/Menu'
import { Modal } from '../../src/component/Modal'
import { TradeinModal } from '../../src/component/ModalTwo'


const SpecialCarPage: NextPage  = () => {
  
  const [showModal, setShowModal] = useState(false)
  const [showTradeInModal, setShowTradeInModal] = useState(false)
  const refSales = useRef<HTMLDivElement>(null)
  const refTop = useRef<HTMLDivElement>(null)
  const refContact = useRef<HTMLDivElement>(null)
  const refAdvatages = useRef<HTMLDivElement>(null)
  const refFooter = useRef<HTMLDivElement>(null)
  const refForm = useRef<HTMLDivElement>(null)

  return (
    <>
      <Head>
        <title>Дисконтная программа Арконт Special</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuBar />
      <BarMenu />
      <SpecialBanner setShowModal={setShowModal} /> 
      <FooterMain  setShowTradeInModal={setShowTradeInModal} refs={{ refFooter  }} />

      {
        showModal && <Modal showModal={showModal} setShowModal={setShowModal} />
      }

      {
        showTradeInModal && <TradeinModal showTradeInModal={showTradeInModal} setShowTradeInModal={setShowTradeInModal} />
      }

    </>
  )
}




export default  SpecialCarPage




