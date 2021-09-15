import React, {useState, useEffect} from "react";
import './App.css';
import Login from "./components/auth/login/login";
import Register from "./components/auth/register/register";
import Tasks from "./components/tasks/tasks";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import ReactMapGL, {Marker} from "react-map-gl";

export default function App() {
    const [viewport, setViewport] = useState(myCurrentLocation);
    const [mapStyle, setMapStyle] = useState(themes.find(theme => theme.selected).value);
    const [viewportChanged, setViewportChanged] = useState(false);
    useEffect(()=> {
        console.log()
    })

    return (
        <>
            <div className={"mt-5 d-flex justify-content-center"}>
                <h1>Welcome to Map</h1>
            </div>
            <div className={"mt-3 d-flex justify-content-center"}>
                <label htmlFor="map-style">Choose Map theme:</label>

                {/* Select Map theme */}
                <select name="map-style" id="map-style"
                        onChange={e => {
                            e.preventDefault();
                            themes.forEach(theme => theme.selected = theme.value === e.target.value)
                            setMapStyle(e.target.value)
                        }}>
                    {/* theme options here */}
                    {themes.map((theme) => (
                        <option value={theme.value} selected={theme.selected}>{theme.name}</option>
                    ))}
                </select>
            </div>
            <div className={"mt-3 d-flex justify-content-center"}>
                <ReactMapGL {...viewport}
                            mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                            mapStyle={mapStyle}
                            onViewportChange={viewport => {
                                setViewport(viewport)
                            }}
                            width={"95%"}
                            height={"350px"}>

                    {viewportChanged ? (
                        <Marker latitude={myCurrentLocation.latitude} longitude={myCurrentLocation.longitude}>
                            <img width={viewport.zoom * 2} height={viewport.zoom * 2}
                                 src="https://w7.pngwing.com/pngs/731/25/png-transparent-location-icon-computer-icons-google-map-maker-marker-pen-cartodb-map-marker-heart-logo-color-thumbnail.png"
                                 alt="my location"/>
                        </Marker>) : null}
                    <div>
                        <img className={"custom-map-setting-icons"}
                             src="https://icon-library.com/images/current-location-icon/current-location-icon-17.jpg"
                             alt="my location icon" onClick={(e) => {
                            e.preventDefault();
                            if (navigator.geolocation) {
                                return navigator.geolocation.getCurrentPosition(position => {
                                    myCurrentLocation.latitude = position.coords.latitude
                                    myCurrentLocation.longitude = position.coords.longitude
                                    myCurrentLocation.zoom = 8
                                    setViewportChanged(true)
                                    setViewport(myCurrentLocation)
                                });
                            }
                        }}/>
                        <img name={"zoom-out"}
                             className={"custom-map-setting-icons"}
                             src="https://cdn0.iconfinder.com/data/icons/typicons-2/24/minus-512.png"
                             alt="my location icon" onMouseEnter={(e) => {
                            e.preventDefault();
                            zoom(true);
                            console.log(myCurrentLocation)
                            setViewport(myCurrentLocation);
                        }}/>
                        <img name={"zoom-in"}
                             className={"custom-map-setting-icons"}
                             src="https://cdn-icons-png.flaticon.com/512/32/32339.png"
                             alt="my location icon" onMouseEnter={(e) => {
                            e.preventDefault();
                            zoom();
                            console.log(myCurrentLocation)
                            setViewport(myCurrentLocation);
                        }}/>
                    </div>
                </ReactMapGL>
            </div>
        </>
    )
};

function zoom(out = false) {
    myCurrentLocation.zoom = out ? myCurrentLocation.zoom - 0.96688385572887 : myCurrentLocation.zoom + 0.03311614427113;
}

const myCurrentLocation = {
    latitude: 29.386594610174882,
    longitude: 71.71525725276511,
    zoom: 8,
}

const themes = [
    {id: 0, name: 'Dark', value: "mapbox://styles/sobi360/cktgslsh91hd517pb9fnjzp68", selected: true},
    {id: 1, name: 'Outdoors', value: "mapbox://styles/sobi360/ckthppvq50kcj17rtr11xjvq2", selected: false},
]

//export default function setToken(userToken) {
//     sessionStorage.setItem("token", JSON.stringify(userToken))
// }
//
// function getToken() {
//     console.log("token data from sessionStorage --> ")
//     return JSON.parse(sessionStorage.getItem("token"))
// }
//
// function App() {
//     const token = getToken();
//     // const [token, setToken] = useState();
//     if (!token) {
//         return (
//             <div className="App">
//                 <Login setToken={setToken}/>
//             </div>
//         )
//     }
//
//     return (
//         <div className="App">
//             <BrowserRouter>
//                 <Switch>
//                     <Route path={"/tasks"}>
//                         <Tasks/>
//                     </Route>
//                 </Switch>
//             </BrowserRouter>
//             {/*<Tasks/>*/}
//             {/*<Login/>*/}
//             {/*<Register/>*/}
//         </div>
//     );
// }
//