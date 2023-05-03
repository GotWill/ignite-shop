import { styled } from "..";

export const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '480px',
    minHeight: '100vh',
    backgroundColor: '#202024',
    boxShadow: '-4px 0px 30px rgba(0, 0, 0, 0.8)',
    zIndex: 1000,
    padding: '20px 40px',

    '.flex': {
        display: 'flex',
        flexDirection: 'column',
    },

    '.close': {
        display: 'flex',
        justifyContent: 'flex-end',


        button: {
            cursor: 'pointer',
            backgroundColor: 'transparent',
            border: 0
        }
    },

    h2: {
        color: '#E1E1E6',
        fontWeight: 700,
        fontSize: '$lg',
        margin: '32px 0'
    },

    footer: {
        marginTop: 'auto',
       
       
        '.flex-info': {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            p: {
                color: '#E1E1E6',
                fontWeight: 400,

            },

            span: {
                color: '#C4C4CC',
                fontSize: 18
            },
        },

        button: {
            backgroundColor: '$green500',
            border: 0,
            color: '$white',
            borderRadius: 8,
            padding: '1.25rem',
            cursor: 'pointer',
            fontWeight: 'bold',
            fontSize: '$md',
            width:' 384px',
    
    
            '&:not(:disabled):hover':{
                backgroundColor: '$green300'
            },
    
            '&:disabled':{
                opacity: 0.6,
                cursor: 'not-allowed'
            }
        }
       
    }
})

export const CardProduct = styled('div', {
    display: 'flex',
    gap: '20px',
    alignItems: 'center',
    padding: '20px 0',


    '.box': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(180deg, #1EA483 0%, #7465D4 100%)',
        width:' 101.94px',
        height: '93px',
        borderRadius: 8,
        
    },

    '.info': {
        display: 'flex',
        flexDirection: 'column',
        rowGap: '13px',

        h3: {
            color: '#C4C4CC',
            fontWeight: 400,
            fontSize: '$lg',
           
        },

        span: {
            color: '#E1E1E6',
            fontWeight: 700,
            fontSize: '$lg'
        },

        button: {
            color: '#00875F',
            fontWeight: 700,
            fontSize: '16px',
            backgroundColor: 'transparent',
            border: 0,
            textAlign: 'inherit',
            cursor: 'pointer'
        }
    }

})