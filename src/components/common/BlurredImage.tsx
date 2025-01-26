import Image from 'next/image'
interface BlurredImageProps {
  src: string
  alt: string
  fallbackSrc: string
  className?: string
}

const BlurredImage = ({ src, alt, fallbackSrc, className = '' }: BlurredImageProps) => {
  const imageSrc = src || fallbackSrc

  return (
    <>
      <Image src={imageSrc} alt={alt} fill className={`z-10 rounded-lg object-contain ${className}`} />
      <Image src={imageSrc} alt={alt} fill className={`scale-110 rounded-lg object-contain opacity-70 blur-md ${className}`} />
    </>
  )
}

export default BlurredImage
