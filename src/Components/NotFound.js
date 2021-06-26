import React from 'react'
import { useParams } from "react-router-dom";
import { Card } from 'react-bootstrap';

export default function NotFound() {

    let { id } = useParams();

    return (
        <>
            <Card>
            <Card.Body>
                <Card.Title>Not Found</Card.Title>
                <Card.Text>
                   We can't find what you're looking for...
                </Card.Text>
            </Card.Body>
            </Card>
        </>
    )
}
