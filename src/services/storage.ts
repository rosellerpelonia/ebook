import { getDownloadURL, ref } from 'firebase/storage';
import { storage } from './firebase';

export async function getStorageImageUrl(path: string): Promise<string> {
  const imageRef = ref(storage, path);
  return await getDownloadURL(imageRef);
}