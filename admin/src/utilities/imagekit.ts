import ImageKit from 'imagekit'

let imagekitInstance: ImageKit | null = null

export function getImageKit(): ImageKit | null {
  const publicKey = process.env.IMAGEKIT_PUBLIC_KEY
  const privateKey = process.env.IMAGEKIT_PRIVATE_KEY
  const urlEndpoint = process.env.IMAGEKIT_URL_ENDPOINT

  if (!publicKey || !privateKey || !urlEndpoint) {
    return null
  }

  if (!imagekitInstance) {
    imagekitInstance = new ImageKit({
      publicKey,
      privateKey,
      urlEndpoint,
    })
  }

  return imagekitInstance
}
