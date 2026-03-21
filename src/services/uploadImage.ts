import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from './storage'

export async function uploadHeroImage(file: File): Promise<string> {
  const fileName = `${Date.now()}-${file.name}`
  const imageRef = ref(storage, `home/${fileName}`)

  await uploadBytes(imageRef, file)
  return await getDownloadURL(imageRef)
}