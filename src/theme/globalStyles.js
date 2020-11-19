import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600&family=Montserrat:wght@400;500;600&family=Roboto&display=swap');
    *, *::before, *::after {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
    *,*:focus,*:hover{
    outline:none;
    }
    html {
        font-size: 62.5%;
    }
    body {
        font-size: 1.6rem; // happy rems
        font-family: 'Montserrat', sans-serif;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        background-color: #F0F0F0;
    }
    h1, h2, h3, h4, h5, h6, ul, li, p{
        margin: 0;
        padding: 0;
    }
    h1 {
        font-family: 'Barlow', sans-serif;
        font-size: 48px;
        font-weight: 500;
        color: #A5A5A5;
    }
    h2 {
        font-family: 'Barlow', sans-serif;
        font-size: 32px;
        font-weight: 600;
        color: #727272;
        margin: 30px 0;
    }
    h3 {
        font-family: 'Barlow', sans-serif;
        font-size: 24px;
        font-weight: 400;
        color: #A5A5A5;
    }
    h4 {
        font-family: 'Barlow', sans-serif;
        font-size: 21px;
        font-weight: 600;
        color: #5F5F5F;
        margin: 15px 0;
    }
    p {
        font-family: 'Roboto', sans-serif;
        color: #898989;
    }
`;

export default GlobalStyle;
