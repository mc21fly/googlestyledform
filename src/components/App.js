import React, { useState } from 'react';
import Header from './Header';
import Main from './Main';
import Link from './Link';

export default function App() {

    const [url, setUrl] = useState(window.location.pathname);

    function changeURL(e) {
      window.history.replaceState('', '', `${e}`);
      setUrl(e);
    }

    return (
      <div className="main-app">
        <Header handler={(e) => changeURL(e)}/>
        <Main> 
          <Link path="pytania">
            To jest strona z pytaniami
          </Link>

          <Link path="odpowiedzi">
            To jest strona z odpowiedziami
          </Link>
        </Main>
      </div>
    )
}