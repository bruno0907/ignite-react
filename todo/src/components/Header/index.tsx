import Logo from '../../assets/logo.svg'
import styles from './styles.module.css'

export const Header = () => {
  return (
    <div className={styles.container}>      
      <img src={Logo} />      
    </div>    
  )
}