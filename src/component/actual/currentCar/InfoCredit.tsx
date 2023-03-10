import { Circle } from "@mui/icons-material";
import { useRouter } from "next/router";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { CarDto } from "../../../../@types/dto";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Button, CardMedia, Checkbox, FormControlLabel, FormGroup, Slider, TextField } from "@mui/material";

import RoomIcon from '@mui/icons-material/Room';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddRoadIcon from '@mui/icons-material/AddRoad';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { IMaskInput } from "react-imask";

type Props = {
    car: CarDto,
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setCarImg: Dispatch<SetStateAction<string>>
}


export function InfoCredit({ car, showModal, setShowModal, setCarImg }: Props) {

    const [firstPrice, setfirstPrice] = useState<number>(0)
    const [month, setMonth] = useState<number>(36)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')


    function driverTypeStr(x) {
        if (x === 'front') {
            return "Передний привод"
        }
        if (x === 'full_4wd') {
            return "Полный привод"
        }
    }

    function showModalImg(x) {
        setShowModal(true)
        setCarImg(x)
    }

    function numberWithSpaces(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    function engineTypeName(x) {
        if (x === 'diesel') {
            return 'дизель'
        }
        if (x === 'petrol') {
            return 'бензин'
        }
    }

    function gearBoxName(x) {
        if (x === 'automatic') {
            return 'Автомат'
        }
        if (x === 'robotized') {
            return 'Автомат'
        }
        if (x === 'variator') {
            return 'Вариатор'
        }
        if (x === 'manual') {
            return 'Механика'
        }
    }


    const handleChange = (event: Event, newValue: number) => {
        setfirstPrice(newValue as number);
    };

    const handleChangeTime = (event: Event, newValue: number) => {
        setMonth(newValue as number);
    };

    function valuetext(value: number) {
        return `${value}₽`;
    }


    async function sendCredit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        let carName = car.CarModel.modelName
        let carId = car.id
        const res = await fetch('/api/credit/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, phone, firstPrice, month, carName, carId })
        })
        if (res.ok) {

            const result = await res.json()
            console.log(result);

        }
    }









    return (
        <>
            <div className="background">
                {car !== null ?
                    <>
                        <div className="backgroundBlock">
                            <form id="submit-form" onSubmit={sendCredit}>
                                <div className="title">
                                    <h1>РАССЧИТАТЬ КРЕДИТ</h1>
                                </div>
                                <div className="row">

                                    <div className="column">
                                        <TextField id="standard-basic"
                                            size='small'
                                            sx={{ width: '100%', display: 'flex' }}
                                            InputProps={{
                                                disableUnderline: true,
                                            }}
                                            label="Первоначальный платеж" variant="standard" value={`${numberWithSpaces(firstPrice)} ₽`} />
                                        <Slider
                                            size="small"
                                            defaultValue={car.price / 50}
                                            aria-label="Small"
                                            valueLabelDisplay="auto"
                                            step={50000}
                                            min={0}
                                            max={car.price - 300000}
                                            value={firstPrice}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="column">
                                        <TextField id="standard-basic"
                                            size='small'
                                            sx={{ width: '100%', display: 'flex' }}
                                            InputProps={{
                                                disableUnderline: true
                                            }}
                                            label="Срок кредита" variant="standard" value={`${month} мес.`} />
                                        <Slider
                                            size="small"
                                            defaultValue={month}
                                            aria-label="Small"
                                            valueLabelDisplay="auto"
                                            step={12}
                                            min={12}
                                            max={60}
                                            value={month}
                                            onChange={handleChangeTime}
                                        />
                                    </div>

                                </div>

                                <div className="title" style={{ justifyContent: 'start' }}>
                                    <h2>ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ ПО КРЕДИТУ</h2>
                                </div>
                                <div className="row" >
                                    <div className="column">
                                        <input type="text"
                                            className="name"
                                            id="name"
                                            name="name"
                                            placeholder="Ваше имя"
                                            required
                                            value={name}
                                            style={{
                                                fontSize: '16px', height: '100%', padding: '10px 10px', width: '100%', border: 'none',
                                                borderBottom: 'solid 1px #1976d2'
                                            }}
                                            onChange={event => setName(event.target.value)} />
                                    </div>
                                    <div className="column">
                                        <IMaskInput
                                            style={{
                                                fontSize: '16px', height: '100%', padding: '10px 10px', width: '100%', border: 'none',
                                                borderBottom: 'solid 1px #1976d2'
                                            }}
                                            id="inputP"
                                            className="phone"
                                            mask={'+{7}(000)000-00-00'}
                                            placeholder="Телефон"
                                            required
                                            value={phone}
                                            name="phone"
                                            onChange={(event: ChangeEvent<HTMLInputElement>) => setPhone(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="title" style={{ justifyContent: 'start' }}>
                                    <div className="btn">
                                        <Button variant="outlined"
                                            sx={{
                                                width: '100%', height: '100%', border: 'solid 2px #005baa', fontSize: '18px',
                                                backgroundColor: '#005baa', color: 'white',
                                                '&:hover': {
                                                    backgroundColor: "white",
                                                    color: '#005baa'
                                                }
                                            }}
                                            type="submit"
                                        >Отправить</Button>
                                    </div>
                                </div>
                            </form>


                        </div>
                    </>
                    : <Circle />
                }
            </div>
            <style jsx>{`
                .background {
                    display:flex; 
                    width: 100%;
                    height:auto;
                    flex-direction: column;
                    align-items: center;
                    background-color:white;
                    justify-content: center;
                    
                }

                .backgroundBlock{
                    display:flex; 
                    width:1000px;
                    height:600px;
                    flex-direction: start;
                    align-items: center;
                    margin-top:50px;
                    flex-direction: column;
                }

                .title {
                    display: flex;
                    width: 100%;
                    justify-content: center;
                }
                
                .row{
                    display: flex;
                    width: 100%;
                    justify-content:space-around;; 
                    margin-top:30px;
                    padding: 10px;
                    border: solid 1px #ecebeb;
                    border-radius: 7px;
                }

                .column{
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: start;
                    width: 300px;
                }

                .btn {
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    margin-top:20px;
                    width: 300px;
                    height: 60px;
                }
             
                @media(max-width: 1050px) {
                    .backgroundBlock{
                        width: 800px;
                    }
                }

                @media(max-width: 800px) {
                    .row{
                        flex-direction: column;
                        gap:40px;
                    }

                    .backgroundBlock{
                        padding: 20px;
                        height: auto;
                        width: 100%;
                    }
                }

                @media(max-width: 400px) {
                        h1 {
                            font-size:29px
                        }
                        h2 {
                            font-size:23px;
                            text-align: center;
                        }
                        .row {
                            margin-top:20px;
                        }
                        .btn{
                            width:100%;
                            height: 50px;
                        }
                        .column {
                            width: 100%;
                        }
                }

                @media(max-width: 360px) {
                    h1 {
                            font-size:20px
                        }
                        h2 {
                            font-size:18px;
                            text-align: center;
                        }
                        .btn{
                            width:100%;
                            height: 45px;
                        }
                    
                }



            `}</style>
        </>)
}


