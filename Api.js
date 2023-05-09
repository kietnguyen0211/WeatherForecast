import { useEffect, useState } from "react"
import axios from "axios"
import { BsSearchHeart } from 'react-icons/bs';
import { RiWindyLine } from 'react-icons/ri';
import css from "./App.css"
import { TbTemperatureCelsius, TbTemperatureFahrenheit } from 'react-icons/tb';
export default function ApiWeather() {
    //https://github.com/kietnguyen0211/Api.git
    const [data, setData] = useState(null)
    const getData = async () => {
        const apiKey = "e0ddc538b3415427caeb7901218a30dd"
        const cityName = text
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`

        axios
            .get(url)
            .then((res) => {
                console.log(res.data)
                setData(res.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }



    useEffect(() => {
        getData();
    }, [])



    const cal = function (temp) {
        return Math.round(temp - 273.15)
    }


    const calF = function (temp) {
        return Math.round(1.8 * (temp - 273) + 32)
    }



    const [text, setText] = useState("Ha Noi")
    let d = new Date((new Date().getTime()) - (data && data.timezone * 1000));




    const dayInWeek = function (num) {


        let day = num + 1;
        let strDay;


        if (day == 1) {
            strDay = "SunDay"
        }
        else if (day == 2) {
            strDay = "Monday"
        }
        else if (day == 3) {
            strDay = "Tuesday"
        }
        else if (day == 4) {
            strDay = "Wednesday"
        }
        else if (day == 5) {
            strDay = "Thursday"
        }
        else if (day == 6) {
            strDay = "Friday"
        }
        else if (day == 7) {
            strDay = "Saturday"
        }


        return strDay
    }
    return (
        <div className="boxWeather">
            <h1 className="tittle"><span>W</span>eather <span>F</span>orecast</h1>
            <div className="bgInput">
                <input
                    type="text"
                    placeholder="Enter City"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key == "Enter" && text) {
                            getData()
                            setText("")
                        }
                    }}
                ></input>
                <a href="#">
                    <BsSearchHeart />
                </a>
            </div>
            {
                data && (
                    <div className="content">
                        <div className="contentIner">
                            <div className="header">    
                                <h1>
                                    {data.name}
                                </h1>
                                <h1>
                                    {data.sys.country}
                                </h1>
                            </div>
                            <div className="body">
                            <div className="inforForecast">


                                <p>
                                    {dayInWeek(d.getDay())}
                                </p>

                                <p>
                                    {d.getDate()}/{(d.getMonth()) + 1}/{d.getFullYear()}
                                </p>
                                <div className="wind">
                                    <a href="#"><RiWindyLine/></a>
                                    <p>{data.wind.speed}</p>
                                </div>

                            </div>
                            <div className="iconTemp">
                                
                                <img
                                    src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                                />
                                

                                <p>
                                    {
                                        (data.weather[0].description).charAt(0).toUpperCase()
                                        +
                                        (data.weather[0].description).slice(1).toLowerCase()
                                    }
                                </p>
                            </div>
                            <div className="temp">
                                 <p>
                                     {cal(data.main.temp)}
                                 </p>
                                 <p>
                                    o
                                 </p>
                            </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
