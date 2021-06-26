import React from 'react'
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card, CardDeck } from 'react-bootstrap';

export default function Restaurant() {

    let { id } = useParams();

    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        fetch(`https://fast-sea-51497.herokuapp.com/api/restaurants/${id}`)
        .then(res=>res.json())
        .then(restaurant=>{
            setLoading(false);
            if(restaurant.hasOwnProperty("_id")){
                 setRestaurant(restaurant);
            }else{
                 setRestaurant(null);
            }
        })
    }, [id]);


    if(!loading){

        if(restaurant != null){

        return (
            
            <>
                <Card>
                    <Card.Body>
                        <Card.Title>{restaurant.name}</Card.Title>
                        <Card.Title>{restaurant.address.building} {restaurant.address.street}</Card.Title>
                    </Card.Body>
                </Card>

                <br />
    
                <MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} scrollWheelZoom={false}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={[ restaurant.address.coord[1], restaurant.address.coord[0]]}></Marker>
                </MapContainer>
                
                <br />

                <CardDeck>
                    {
                        restaurant.grades.map((g)=>(

                            
                            <Card>
                                <Card.Body>
                                <Card.Title>Grade: {g.grade}  </Card.Title>
                                <Card.Text>
                                    Completed: {g.date}
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        ))
                    }
                </CardDeck>
            </>
        )
        }else{

            return (
                <>
                    <Card>
                    <Card.Body>
                        <Card.Title>Still Restaurant...</Card.Title>
                    </Card.Body>
                    </Card>
                </>
            )

        }

        
    }else{


        return (
            <>
                <Card>
                <Card.Body>
                    <Card.Title>Loading Restaurant...</Card.Title>
                </Card.Body>
                </Card>
            </>
        )
    }

    
}
