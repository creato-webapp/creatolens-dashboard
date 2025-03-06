import React from 'react'

const AptosPage = () => {
  return (
    <div className="h-screen w-full">
      <iframe
        src={`${process.env.NEXT_PUBLIC_CHATBOT_URL}`}
        className="h-full w-full border-0"
        title="LangChain NextJS Template"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default AptosPage
