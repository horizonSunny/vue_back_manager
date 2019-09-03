import { PUBLIC_KEY } from './global'
import JSEncrypt from 'jsencrypt'

export function RSAencrypt (pas) {
  let jse = new JSEncrypt()
  jse.setPublicKey(PUBLIC_KEY)
  return jse.encrypt(pas)
}
