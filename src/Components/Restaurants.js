import React from 'react'
import { useState, useEffect } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { Card, Table, Pagination} from 'react-bootstrap';

export default function Restaurants() {

    const [restaurants, setRestaurants] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);

    const history = useHistory();
    let location = useLocation();
    let params = queryString.parse(location.search);
    let url = "";


    if(params.borough){
        url = `https://fast-sea-51497.herokuapp.com/api/restaurants?page=${page}&perPage=10&borough=${params.borough}`;
    }else{
        url = `https://fast-sea-51497.herokuapp.com/api/restaurants?page=${page}&perPage=10`;
    }


    useEffect(()=>{
        fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((myJson) => {
            setLoading(false);
            setRestaurants(myJson);
        });
    }, [page, location]);

    function previousPage(){
        if(page > 1)
            setPage(page - 1);
    }

    function nextPage(){
          setPage(page + 1);
    }


    if(!loading){

        if (restaurants.length > 0) {
            return (
                        <>
                            <Card>
                            <Card.Body>
                                <Card.Title>Restaurant List</Card.Title>
                                <Card.Text>
                                Full list of restaurants. Optionally sorted by borough  
                                </Card.Text>
                            </Card.Body>
                            </Card>
                
                            <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Name</th>
                                                <th>Address</th>
                                                <th>Borough</th>
                                                <th>Cuisine</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                restaurants.map((restaurants) => (
                                                    <tr key={restaurants._id} onClick={()=>{ history.push(`/restaurant/${restaurants._id}`)}}>
                                                        <td>{restaurants.name}</td>
                                                        <td>{restaurants.address.building + " " + restaurants.address.street}</td>
                                                        <td>{restaurants.borough}</td>
                                                        <td>{restaurants.cuisine}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                
                                    </Table>
                            
                            <Pagination>
                                <Pagination.Prev onClick={previousPage}/>
                                        <Pagination.Item>{page}</Pagination.Item>
                                <Pagination.Next onClick={nextPage}/>
                            </Pagination>
                
                
                        </>
                    )
        }else{
            return (
                <>
                    <Card>
                    <Card.Body>
                        <Card.Title>No Restaurants Found</Card.Title>
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
                    <Card.Title>Loading Restaurants...</Card.Title>
                </Card.Body>
                </Card>
            </>
        )
    }
    
}
