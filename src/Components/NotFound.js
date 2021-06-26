import React from 'react'
import { Card } from 'react-bootstrap';

export default function NotFound() {

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
