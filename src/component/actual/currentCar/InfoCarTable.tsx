import { Circle } from "@mui/icons-material";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CarDto } from "../../../../@types/dto";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Accordion, AccordionDetails, AccordionSummary, Button, CardMedia, styled, Typography } from "@mui/material";

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

type Props = {
    car: CarDto,
    showModal: boolean,
    setShowModal: Dispatch<SetStateAction<boolean>>,
    setCarImg: Dispatch<SetStateAction<string>>
}


export function InfoCarTable({ car, showModal, setShowModal, setCarImg }: Props) {


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



    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        height: '60px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    }));

    return (
        <>
            <div className="background">
                {car !== null ?
                    <>
                        <div className="tablebackground">
                            <div className="headerRowTable">
                                <div className="headerRowEl">
                                    <div className="el" id="complectation">Комплектация</div>
                                    <div className="el" style={{ fontSize: '20px', fontWeight: "bold" }}>{car.CarComplectation.name}</div>
                                </div>
                            </div>
                            <div className="descRowTable">
                                <div className="row">
                                    <div className="column" style={{ width: '300px' }}>
                                        <div className="columnTitle">Цвет кузова</div>
                                        <div className="columnDesc">
                                            <Circle sx={{ backgroundColor: `${car.color}`, borderRadius: '50px' }} />
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="columnTitle">Год производства</div>
                                        <div className="columnDesc">{car.year}</div>
                                    </div>
                                    <div className="column">
                                        <div className="columnTitle">Кузов</div>
                                        <div className="columnDesc">{car.CarModification.bodyType}</div>
                                    </div>
                                    <div className="column">
                                        <div className="columnTitle">Привод</div>
                                        <div className="columnDesc">{driverTypeStr(car.CarModification.driveType)}</div>
                                    </div>
                                    <div className="column">
                                        <div className="columnTitle">Двигатель</div>
                                        <div className="columnDesc">{car.CarModification.enginePower} Л.С.</div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="column" style={{ width: '300px' }}>
                                        <div className="columnTitle"></div>
                                        <div className="columnDesc">

                                        </div>
                                    </div>

                                    <div className="column">
                                        <div className="columnTitle">VIN</div>
                                        <div className="columnDesc">{car.vin}</div>
                                    </div>
                                    <div className="column">
                                        <div className="columnTitle">Коробка</div>
                                        <div className="columnDesc">{gearBoxName(car.CarModification.gearboxType)}</div>
                                    </div>
                                    <div className="column">
                                        <div className="columnTitle">Топливо</div>
                                        <div className="columnDesc">{engineTypeName(car.CarModification.engineType)}</div>
                                    </div>
                                    <div className="column">
                                        <div className="columnTitle">Объем двигателя</div>
                                        <div className="columnDesc">{(Math.round((Number(car.CarModification.engineVolume)) * 100) / 100000).toFixed(1)} л</div>
                                    </div>
                                </div>
                            </div>
                            <div className="descMobile">
                                <Accordion sx={{ width: '100%' }}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon style={{ color: '#1565c0' }} />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                    >
                                        <Typography>Технические характеристики</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Box sx={{ flexGrow: 1 }}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={4}>
                                                    <Item sx={{color:'#1565c0' }}>Цвет кузова</Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item  sx={{color:'#1565c0' }}>Год </Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item  sx={{color:'#1565c0' }}>Кузов</Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item><Circle sx={{ backgroundColor: `${car.color}`, borderRadius: '50px' }} /></Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{car.year}</Item>
                                                </Grid>
                                                <Grid item xs={4}>
                                                    <Item>{car.CarModification.bodyType}</Item>
                                                </Grid>
                                            </Grid>
                                        </Box>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
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
                    background-color:#d5d5d55c;
                    justify-content: center;
                }

                .tablebackground {
                    display:flex; 
                    width: 1000px;
                    height:250px;
                    flex-direction: column;
                    border:1px solid #e0e0e0;
                    background-color: white;
                    margin-top:50px;
                }

                .headerRowTable {
                    display: flex;
                    justify-content: start;
                    border-bottom:1px solid #e0e0e0;
                    align-items: center;
                    padding: 17.5px 20px;
                }

                .headerRowEl{
                    display: flex;
                    gap: 15px;
                    align-items: center;
                }

                .descRowTable{
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    padding: 20px;
                    width: 900px;
                    flex-direction: column;
                    gap:20px;
                }

                .column {
                    display: flex;
                    justify-content:center;
                    align-items: start;
                    flex-direction: column;
                    width: 300px;
                    gap: 10px;
                }

                #complectation { 
                    color: '#7b7979'
                }

                .row {
                    display: flex;
                    flex-direction: row;
                    width: 100%;
                    justify-content: space-between;
                }

                .columnTitle{
                    display: flex;
                    justify-content:center;
                    align-items: center;
                    text-align: center;
                    color:#7b7979;
                    font-weight: 400;
                    font-size: 12px;
                }

                .columnDesc{
                    display: flex;
                    justify-content:center;
                    align-items: center;
                    text-align: center;
                    font-weight: 700;
                    font-size: 13px;
                }

                .descMobile {
                    display:none;
                    width: 100%;
                    height: 100%;
                }

                @media (max-width: 1000px) {
                   .tablebackground {
                      width: 800px;
                   }
                   .descRowTable {
                      width: 100%;
                   }
                }

                @media (max-width: 800px) {
                   .tablebackground {
                      width: 100%;
                   }
                   .descRowTable {
                      width: 100%;
                   }
                }

                @media (max-width: 700px) {
                   .descRowTable {
                      display: none;
                   }

                   .descMobile {
                      display:flex;
                   }

                   .tablebackground {
                      height:auto;
                   }

                   .headerRowTable{
                      color:white;
                      background-color: #1565c0;
                   }
                }

               

            `}</style>
        </>)
}


