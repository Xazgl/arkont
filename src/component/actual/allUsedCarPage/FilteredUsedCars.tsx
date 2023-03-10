import { Car } from '@prisma/client'
import React, { Dispatch, MouseEventHandler, SetStateAction, useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import HistoryIcon from '@mui/icons-material/History';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CompareIcon from '@mui/icons-material/Compare';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveRoadIcon from '@mui/icons-material/RemoveRoad';
import RoomIcon from '@mui/icons-material/Room';
import Link from 'next/link';

import { AllUsedCarDto } from '../../../../@types/dto';
import { Box, Button } from '@mui/material';
import { logoFind, LogoList } from './services/servicesUsedCars';

type Props = {
  setShowModal: Dispatch<SetStateAction<boolean>>,
  filteredCars: AllUsedCarDto,
}


function FilteredUsedCars({ setShowModal, filteredCars }: Props) {

  const [expanded, setExpanded] = React.useState(false);
  const [favArr, setFavArr] = React.useState([]);
  const [watchedArr, setWatchedArr] = React.useState([]);
  const [compareArr, setCompareArr] = React.useState([]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));


  function numberWithSpaces(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }

  function showModal(event: MouseEventHandler<HTMLButtonElement>) {
    setShowModal(true)
  }

  function upFirst(engine) {
    return engine.charAt(0).toUpperCase() + engine.slice(1)
  }

  async function addToFavorite(id) {
    const res = await fetch('/api/usedfavorite/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      console.log(res)
      async function start() {
        const res = await fetch('/api/usedfavorite/getAll', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res.ok) {
          // console.log(res)
          const result = await res.json()
          result !== undefined ?
            setFavArr(result.favoriteCarUser.favoriteUsedCars)
            :
            setFavArr(null)
        }
      }
      start()
    }
  }


  async function deleteToFavorite(id) {
    const res = await fetch('/api/usedfavorite/del/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      console.log(res)
      async function start() {
        const res = await fetch('/api/usedfavorite/getAll', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res.ok) {
          // console.log(res)
          const result = await res.json()
          console.log(result)
          result !== undefined ?
            setFavArr(result.favoriteCarUser.favoriteUsedCars)
            :
            setFavArr(null)
        }
      }
      start()
    }
  }


  async function addToCompare(id) {
    const res = await fetch('/api/usedcompare/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      console.log(res)
      async function startCompare() {
        const res = await fetch('/api/usedcompare/getAll', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res.ok) {
          // console.log(res)
          const result = await res.json()
          result !== undefined ?
            setCompareArr(result.compareCarUser.compareUsedCars)
            :
            setCompareArr(null)
        }
      }
      startCompare()
    }
  }

  async function deleteToCompare(id) {
    const res = await fetch('/api/usedcompare/del/' + id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    if (res.ok) {
      console.log(res)
      async function start() {
        const res = await fetch('/api/usedcompare/getAll', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (res.ok) {
          // console.log(res)
          const result = await res.json()
          result !== undefined ?
            setCompareArr(result.compareCarUser.compareUsedCars)
            :
            setCompareArr(null)
        }
      }
      start()
    }
  }

  // ?????? ???????????????? ???????? ??????????????????, ??????????????????
  useEffect(() => {
    async function start() {
      const res = await fetch('/api/usedfavorite/getAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (res.ok) {
        const result = await res.json()
        result !== undefined ?
          setFavArr(result.favoriteCarUser.favoriteUsedCars)
          :
          setFavArr(null)
      }
      const resComapre = await fetch('/api/usedcompare/getAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (resComapre.ok) {
        const resultCompare = await resComapre.json()
        resultCompare !== undefined ?
          setCompareArr(resultCompare.compareCarUser.compareUsedCars)
          :
          setCompareArr(null)
      }
      const resWatched = await fetch('/api/usedwatched/getAll', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (resWatched.ok) {
        const resultWatched = await resWatched.json()
        resultWatched !== undefined ?
          setWatchedArr(resultWatched.watchedCarUser.watchedUsedCars)
          :
          setWatchedArr(null)
      }
    }
    start()
  }, [])

  return (
    <>
      <div className='background'>
        <Box
          sx={{
            display: 'flex', position: 'fixed', flexDirection: 'column', bottom: '0', right: '0',
            width: 'auto', height: 'auto', marginBottom: '20px',
          }}
        >
          {watchedArr.length > 0 &&
            (<>
              <Link href={'/catalog/watched-cars'}>
                <HistoryIcon
                  sx={{
                    display: 'flex', fontSize: '40px', bottom: '0', right: '0', color: '#005baa',
                    '&:hover': { color: 'black' }
                  }}
                />
              </Link>
              <Typography
                sx={{
                  display: 'flex', fontSize: '17px', justifyContent: 'center'
                }}
              >{watchedArr.length}</Typography>
            </>)
          }
          {compareArr.length > 0 &&
            (<>
              <Link href={'/catalog/compare-cars'}>
                <CompareIcon
                  sx={{
                    display: 'flex', fontSize: '40px', bottom: '0', right: '0', color: '#005baa',
                    '&:hover': { color: 'green' }
                  }}
                />
              </Link>
              <Typography
                sx={{
                  display: 'flex', fontSize: '17px', justifyContent: 'center'
                }}
              >{compareArr.length}</Typography>
            </>)
          }
          {favArr.length > 0 &&
            (<>
              <Link href={'/catalog/favorite-cars'}>
                <FavoriteBorderIcon
                  sx={{
                    display: 'flex', fontSize: '40px', bottom: '0', right: '0', color: '#005baa',
                    '&:hover': { color: 'red' }
                  }}
                />
              </Link>
              <Typography
                sx={{
                  display: 'flex', fontSize: '17px', justifyContent: 'center'
                }}
              >{favArr.length}</Typography>
            </>)
          }
        </Box>


        <div className='cards' id="desktop">
          {filteredCars.map(car =>
            <Card sx={{
              width: 345, height: 500, display: 'flex', border: '1px  solid transparent',
              flexDirection: 'column', marginTop: '10px', transition: ' 0.2s linear',
              '&:hover': { transform: 'scale(1.04)', border: '1px solid black' },
              '&:hover .credit': {
                display: 'flex',
                transition: '1s',
                animation: 'credit-open.5s',
                marginTop: '330px',
                backgroundColor: '#0c7ee1',
                position: 'absolute'
              }
            }} >
              <CardHeader
                avatar={
                  <Avatar sx={{}} aria-label="recipe"
                    src={logoFind(LogoList, car.vendor)}>

                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={car.vendor}
                subheader={car.modelShortName}
              />

              <Link href={{
                pathname: '/catalog/used-car/[id]',
                query: { id: car.id }
              }}>
                <CardMedia
                  component="img"
                  height="194"
                  image={car.picture[0]}
                  sx={{ cursor: 'pointer' }}

                  alt="Paella dish"
                />
              </Link>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {upFirst(car.engine)} / {car.driverType} / ???????????? {numberWithSpaces(car.mileage)} ????
                  <div className='price'><h3>{numberWithSpaces(Number(car.price))} ???</h3></div>
                  <div className='priceMonth'>
                    <button className="btn">???? {numberWithSpaces(Math.round(Number(car.price) / 150))} ???/??????</button>
                  </div>
                  {/* <div className='office'>
                    <span>{car.DealerModel.name}</span>    <RoomIcon />
                  </div> */}
                </Typography>
              </CardContent>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  {favArr.find(carFav => carFav.car.id === car.id) ?
                    <FavoriteIcon sx={{ color: 'red' }}
                      onClick={() => deleteToFavorite(car.id)}
                    /> :
                    <FavoriteIcon sx={{ '&:hover': { color: 'red' } }}
                      onClick={() => addToFavorite(car.id)}
                    />
                  }
                </IconButton>
                <IconButton aria-label="share">
                  {compareArr.find(carCompar => carCompar.car.id === car.id) ?
                    <AddRoadIcon sx={{ color: 'green' }}
                      onClick={() => deleteToCompare(car.id)}
                    /> :
                    <AddRoadIcon sx={{ '&:hover': { color: 'green' } }}
                      onClick={() => addToCompare(car.id)}
                    />
                  }
                </IconButton>
              </CardActions>
              <button className="credit" onClick={() => showModal}>
                <span className="consultation" >???????????????? ????????????????????????</span>
              </button>
            </Card>
          )}
        </div>

        <div className='cards' id="mob">
          {filteredCars.map(car =>
            <Card sx={{
              width: '90%', height: 430, display: 'flex', border: '1px  solid transparent',
              flexDirection: 'column', marginTop: '10px', transition: ' 0.2s linear',
              '&:hover': { transform: 'scale(1.04)', border: '1px solid black' },
            }} >
              <CardHeader
                sx={{ display: 'flex', height: '50px', dispaly: 'flex', alignItems: 'center' }}
                avatar={
                  <Avatar sx={{}} aria-label="recipe"
                    src={logoFind(LogoList, car.vendor)}>
                  </Avatar>
                }
                action={
                  <IconButton aria-label="settings" sx={{
                    marginTop: '-10px',
                    marginRight: '-5px'
                  }}>
                    {favArr.find(carFav => carFav.car.id === car.id) ?
                      <FavoriteIcon sx={{ color: 'red' }}
                        onClick={() => deleteToFavorite(car.id)}
                      /> :
                      <FavoriteIcon sx={{ '&:hover': { color: 'red' } }}
                        onClick={() => addToFavorite(car.id)}
                      />
                    }
                  </IconButton>
                }
                title={car.vendor}
                subheader={car.modelShortName}
              />

              <Link href={{
                pathname: '/catalog/car/[id]',
                query: { id: car.id }
              }}>
                <CardMedia
                  component="img"
                  height="160px"
                  image={car.picture[0]}
                  sx={{
                    cursor: 'pointer',
                    backgroundSize: 'contain'
                  }}

                  alt="car"
                />
              </Link>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {upFirst(car.engine)} / {car.driverType} ???????????? / ???????????? {numberWithSpaces(car.mileage)} ????
                  <div className='price'><h3>{numberWithSpaces(Number(car.price))} ???</h3></div>
                  <div className='priceMonth'>
                    <button className="btn">???? {numberWithSpaces(Math.round(Number(car.price) / 150))} ???/??????</button>
                  </div>
                </Typography>
              </CardContent>
              <div style={{ display: "flex", width: '100%', height: '45px', justifyContent: 'center', padding: '6px' }}>
                <Button variant="contained"
                  sx={{ textAlign: 'center', fontSize: '12px', width: '95%', }}
                  onClick={() => showModal}>???????????????? ????????????????????????</Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      <style jsx>{`              
      @keyframes credit-open {
                0% {
                    opacity: 0;
                    margin-top:-100%;
                }

                50% {
                    opacity: 0.5;
                }

                60% {
                    opacity: 0.8;
                }
                80% {
                    opacity: 0.9;
                }
        
                100% {
                    opacity: 1;
                }
      }
 
    .background {
      display:flex;
      width: 100%;
      height: 110vh;
      padding: 20px;
      justify-content: center;
      overflow: auto;
      border-top: 1px solid #d4d3d3;
      background-color: #f5f2f261;
    }
    
    .cards {
      display: flex;
      justify-content: center;
      gap:40px;
      width: 100%;
      flex-direction: row;
      flex-wrap: wrap;
    }
 
    .price {
      font-size: 18px;
      line-height: 18px;
      display: flex;
      align-items: center;
      font-weight: 400;
      letter-spacing: normal;
      font-family: 'Roboto',sans-serif;
      color:black;
    }

    .priceMonth {
      display: flex;
      justify-content: start;
      width: 80%;
      height: 35px;
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding:1px;
      width:80%;
      height: 100%;
      border:solid 1px #005baa;
      color:#005baa;
      background-color: transparent;
      border-radius: 3px;
      font-size: 15px;
      font-weight: bold;
      transition: 0.6s;
    }

    .btn:hover {
      background-color:#005baa; 
      color:white;
      transform: scale(0.99);
    }

    ul {
      list-style: none;
    }

    .office{
      display: flex;
      justify-content: start;
      margin-top: 10px;
      font-size: 12px;
      align-items: center;
    }


    .credit {
      display: none;
      justify-content: center;
      text-align: center;
      align-items: center;
      width: 100%;
      height: 50px;
      transition: 1.2s;
      margin-top:-10em;
      cursor: pointer;
      color:white;
      font-size:16px;
      text-align: center;
      border:none;
    }

    .credit:hover {
      background-color:#0088ff;
    }

    #mob{
      display: none;
      gap:10px;
      flex-direction: column;
      align-items: center;
      justify-content: start;
      flex-wrap: nowrap;
    }

    .row {
      display:flex;
      flex-direction: row;
    }

    .column {
      display:flex;
      flex-direction: column;
      height: auto;
    }

    #priceModbile{
      font-size: 17px;
      height: 30px;
      margin-top:15px;
      font-weight: bold;
      width: 100%;
    }

    #priceMonth {
      width: 100%;
      height: auto;
      font-weight: bold;
      margin-top:20px;
    }

    @media(max-width: 640px) {
      #desktop{
        display: none;
      }
      #mob{
        display: flex;
      } 
      .btn {
        width: 100px;
        height: 30px;
        font-size: 12px;
      }

      .office{
        font-size: 9px;
      }
      .background{
        height: auto;
      }
    }

    @media(max-width: 400px) {
      .btn {
        width: 90%
      }
      h3{
        font-weight: 300;
      }
    }
            
  `}</style>
    </>
  )
}

export default FilteredUsedCars