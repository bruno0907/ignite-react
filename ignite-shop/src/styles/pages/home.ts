import { styled } from "..";

export const HomeContainer = styled('main', {
  display: 'flex',  
  width: '100%',
  maxWidth: 'calc(100vw - ((100vw - 1180px) / 2))',
  marginLeft: 'auto',
  minHeight: 656
})

export const Product = styled('div', {
  position: 'relative',
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,  
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',

  '&:hover': {
    footer: {
      transform: 'translateY(0%)',
      opacity: 1
    }
  },

    img: {
      objectFit: 'cover'
    },

    footer: {
      position: 'absolute',
      bottom: '0.25rem',
      left: '0.25rem',
      right: '0.25rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderRadius: 6,
      padding: '2rem',
      color: '$gray300',
      
      backgroundColor: 'rgba(0, 0, 0, 0.6)',

      transform: 'translateY(110%)',
      opacity: 1,
      transition: 'all 0.2s ease-in-out',

        strong: {
          fontSize: '$lg'
        },

        span: {
          fontSize: '$xl',
          fontWeight: 'bold',
          color: '$green300'
        }    
    }

})