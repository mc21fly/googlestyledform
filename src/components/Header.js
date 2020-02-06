import React, { useState, useEffect, useLayoutEffect } from 'react';
import $ from 'jquery';

export default function Header(props) {

    const [pageTitle, setPageTitle] = useState('Formularz');
    const [isStatusShowed, setStatus] = useState(false);
    const [typingTimeout, setTypingTimeout] = useState(null);
    const [size, setSize] = useState([window.innerWidth, window.innerHeight])
     

    useLayoutEffect(() => {
        function update() {
            setSize([window.innerWidth, window.innerHeight]);
        }

        window.addEventListener('resize', update);
        return () => window.removeEventListener('resize', update);
    }, [])

    useEffect(() => {
        document.title = pageTitle;
    }, [pageTitle])

    useEffect(() => {
        const navEl = $('#one');
        $('.border-bottom').css({
            'left': navEl.offset().left,
            'width': navEl.innerWidth()
        })
    })


    function keyUpHandler() {
        setTypingTimeout(setTimeout(showStatus, 2000))
    }

    function keyDownHandler() {
        clearTimeout(typingTimeout)
    }

    function showStatus() {
        if(!isStatusShowed) {
            const status = $('#status');

            setStatus(true);
            status.slideDown();
            setTimeout(() => {status.slideUp(); setStatus(false)}, 3000)
        }
    }

    function changeBarPosition(id) {
        const navEl = $(`#${id}`);
        $('.border-bottom').animate({
            'left': navEl.offset().left,
            'width': navEl.innerWidth()
        }, 500)
    }

    return (
        <header>
            <div id="status">Zapisano...</div>
            <input id="title" type="text" placeholder="Wprowadź nazwę formularza"
                onChange={() =>
                    {
                        ($('#title').val() === '' || /^\s+/.exec($('#title').val())) 
                            ? setPageTitle('Formularz')
                            : setPageTitle($('#title').val());
                    }
                }
                onKeyUp={keyUpHandler}
                onKeyDown={keyDownHandler}
            />
            <nav>
                <div id="one" onClick={e => {changeBarPosition(e.target.id); props.handler("/pytania")}}>Pytania</div>
                <div id="two" onClick={e => {changeBarPosition(e.target.id); props.handler("/odpowiedzi")}} >Odpowiedzi</div>
            </nav>
            <div className="border-bottom"></div>
        </header>
    )
}