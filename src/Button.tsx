import { ButtonImage } from './lib/types'
import styles from './Button.module.css'

export interface ButtonProps {
  image: ButtonImage
}

export const Button = (props: ButtonProps) => {
  return <div className={[styles.button, styles.b01].join(' ')}></div>
}
