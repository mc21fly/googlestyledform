import React, { useState, useEffect } from 'react';

export default function Main(props) {

    const [toShow, setToShow] = useState();

    useEffect(() => {

        if(window.location.pathname === '/odpowiedzi') {
            setToShow(props.children[1].props.children)
        }
        if(window.location.pathname === '/pytania') {
            setToShow(props.children[0].props.children)
        }
    }, [props.children])

    return (
        <main>
            {toShow}
        </main>
    )
}