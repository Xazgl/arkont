
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useRef, useState } from 'react'
import db, { Offer } from '../../prisma'
import { FooterMain } from '../../src/component/actual/FooterMain'
import { CardsSpecialOffers } from '../../src/component/actual/specialOffers/CardsSpecialOffers'
import { CarSale } from '../../src/component/actual/tradeinPage/CarSale'
import { MainBannerTradeIn } from '../../src/component/actual/tradeinPage/MainBannerTradeIn'
import { TradeInForm } from '../../src/component/actual/tradeinPage/TradeInForm'
import { TradeinStepper } from '../../src/component/actual/tradeinPage/TradeinStepper'
import BarMenu from '../../src/component/BarMenu'
import { MenuBar } from '../../src/component/Menu'
import { Modal } from '../../src/component/Modal'
import { TradeinModal } from '../../src/component/ModalTwo'


const SpecialOffersPage: NextPage <{ offers: Offer[] }> = ({ offers }) => {
  
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
        <title>АРКОНТ ОФИЦИАЛЬНЫЙ ДИЛЕР В ВОЛГОГРАДЕ</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MenuBar  />
      <BarMenu />
      <CardsSpecialOffers setShowModal={setShowModal} offers={ offers }  />
      {/* <TradeInForm /> */}
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


export const getServerSideProps: GetServerSideProps = async (context) => {
  const offers = await db.offer.findMany()
        
  return {
    props: {
      offers: JSON.parse(JSON.stringify(offers)),
    }
  }
}


export default SpecialOffersPage





