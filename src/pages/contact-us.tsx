import Image from 'next/image'

const ContactUs = () => {
  return (
    <div className="flex w-full items-center justify-center md:mb-40">
      <div className="flex w-full flex-col md:max-w-screen-xl">
        <h1 className="px-4 py-6 text-2xl font-bold md:pl-16">Contact Us</h1>
        <hr className="my-4 w-full border-t border-neutral-300" />
        <div className="flex flex-col px-6 md:flex-row">
          <div className="relative h-96 w-full">
            <Image src={'/contact-us.png'} style={{ objectFit: 'contain' }} fill alt={'Contact Us'} />
          </div>
          <div className="flex w-full flex-col justify-center gap-6 text-neutral-500">
            <div className="flex flex-col gap-2">
              <div className="text-heading text-neutral-800">Contact Us</div>
              <div className="text-subheading text-neutral-500">Let&apos;s talk</div>
            </div>
            <div>Have a question? Looking for assistance? We are here to help and answer any inquires!</div>
            <div>Reach us directly at:</div>
            <a href="mailto:hello@creatogether.app">
              E-mail:
              <div className="text-blue-600 underline">hello@creatogether.app</div>
            </a>
            <a href="https://wa.me/85268215494">
              Whatsapp:
              <div className="text-blue-600 underline"> +852 6821 5494</div>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
