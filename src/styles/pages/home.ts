import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 500
})

export const Product = styled('div', {
  background: 'Linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  // padding: '0.25rem',
  cursor: 'pointer',
  position: 'relative',


  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',



  img: {
    objectFit: 'cover'
  },

  footer: {
    position: 'absolute',
    bottom: '0.25rem',
    left: '0.25rem',
    right: '0.25rem',
    borderRadius: 6,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#202024',
    padding: '2rem',


    transform: 'translateY(110%)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',
    overflow: 'hidden',

    'strong': {
      fontSize: '$lg',
      color: '$gray100'
    },

    span: {
      fontSize: '$xl',
      fontWeight: 'bold',
      color: '$green300',
    },

    '.info': {
      display: 'flex',
      flexDirection: 'column'
    },

    button: {
      backgroundColor: '$green300',
      border: 0,
      width: '46px',
      height: '46px',
      borderRadius: 8,
      cursor: 'pointer',

    }




  },



  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  }
})