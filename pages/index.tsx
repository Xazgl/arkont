//@ts-ignore
import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { Menu } from '../src/component/Menu'
import { MainBanner } from '../src/component/MainBanner'
import { OurAdvantages } from '../src/component/OurAdvantages'
import { Modal } from '../src/component/Modal'
import { TradeinModal } from '../src/component/ModalTwo'
import { useEffect, useRef, useState } from 'react'
import BarMenu from '../src/component/BarMenu'
import db, { Sales } from '../prisma'
import { Map } from '../src/component/Map'

import { Cards } from '../src/component/exeed/Cards'
// import { useUtm } from '../src/hooks/useUtm'
import { Form } from '../src/component/exeed/Form'
import { CardsNew } from '../src/component/exeed/CardsNew'





const Home: NextPage<{ sales: Sales[] }> = ({ sales }) => {
  const [showModal, setShowModal] = useState(false)
  const [showTradeInModal, setShowTradeInModal] = useState(false)


  const refSales = useRef<HTMLDivElement>(null)
  const refTop = useRef<HTMLDivElement>(null)
  const refContact = useRef<HTMLDivElement>(null)
  const refAdvatages = useRef<HTMLDivElement>(null)



  // const [modelName, setModelName] = useState<string>(null)
  // useEffect(() => {
  //   const utm = new URLSearchParams(location.search).get('utm_mdl')
  //   if(utm === 'rio_2022') {
  //     setModelName('Rio')
  //   }
  // }, [])
  // const { utm_mdl } = useUtm(['utm_mdl'])
  return (
    <>
      <Head>
        <title>АРКОНТ ОФИЦИАЛЬНЫЙ СЕРВИС CHERY</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Menu refs={{ refSales, refContact, refAdvatages }} />
      <BarMenu />
      <MainBanner refs={{ refTop }} />
      <OurAdvantages setShowModal={setShowModal} refs={{ refAdvatages }} />
      {/* {utm_mdl && <h1>Model name: {utm_mdl}</h1>} */}
      {/* <Cards sales={sales} />  */}
      <CardsNew setShowModal={setShowModal} refs={{ refSales }} />
      <Form />
      <Map refs={{ refTop, refContact }} />
      {/* <MainBanner /> */}
      {/* <Video /> */}
      {/* <WeDo /> */}
      {/* <Config setShowModal={setShowModal}/> */}
      {/* <Config2 setShowModal={setShowModal}/> */}
      {/* <BottomMainManner /> */}
      {/* <OurAdvantages   setShowModal={setShowModal}/>
      <ModelRow  setShowModal={setShowModal}/>
      <HowItWorks />
      <TradeIn setShowTradeInModal={setShowTradeInModal} />
      <Gallery />
      <Map />
      <Footer />  */}
      {/* <SalesComponent sales={sales} setShowModal={setShowModal} /> */}
      {
        showModal && <Modal showModal={showModal} setShowModal={setShowModal} />
      }

      {
        showTradeInModal && <TradeinModal showTradeInModal={showTradeInModal} setShowTradeInModal={setShowTradeInModal} />
      }

    </>
  )
}

export default Home

// export const getServerSideProps: GetServerSideProps = async (context) => {

//   const sales = await db.sales.findMany({
//     where: {
//       active: true
//     }
//   })
//   return {
//     props: {
//       sales: JSON.parse(JSON.stringify(sales)),
//     }
//   }
// }


