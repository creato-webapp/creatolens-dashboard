import React, { useState, ChangeEvent } from 'react'
import { uploadImage, Labels, ImageRecord, ImageResponse } from '@services/Object/ImageBlob'
import Card from '@components/Card'
import CrossIcon from '@components/Icon/CrossIcon'
import Tag from '@components/Tag'

const ImageUpload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [imageRes, setImageRes] = useState<ImageResponse>({ labels: [], data: [] })

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
    }
  }

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('No file selected.')
        return
      }

      const res = await uploadImage(file, {
        headers: {
          processData: false,
          'Content-Type': false,
          cache: false,
        },
        maxBodyLength: 8000,
        maxContentLength: 8000,
      })
      console.log(res)
      setImageRes(res)
      return res
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <h1>Image Upload</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <button onClick={handleUpload}>Upload</button>
      {file ? <img width="200" height="200" src={URL.createObjectURL(file)}></img> : null}
      <div className="flex flex-row">
        {imageRes.labels.map((e) => (
          <>{e.description} &#8203; </>
        ))}
      </div>
      <div className="m-6 flex flex-wrap gap-6">
        <Card
          className="mr-6 "
          title={'New Title'}
          coverImage="/landing-page.svg"
          subExtra={<Tag label="active"></Tag>}
          description="Doodle characters doing some online shopping! An illustration system based on all things eCommerce."
          onClick={() => console.log('clicked')}
        ></Card>
        <Card
          className="mr-6 "
          title={'New Title 2'}
          coverImage="/landing-page.svg"
          description="Doodle characters doing some online shopping! An illustration system based on all things eCommerce."
          onClick={() => console.log('clicked')}
        ></Card>
        <Card
          className="mr-6 "
          title={'New Title'}
          extra={<CrossIcon />}
          coverImage="/landing-page.svg"
          description="Doodle characters doing some online shopping! An illustration system based on all things eCommerce."
        ></Card>
        <Card
          className="mr-6 "
          title={'New Title'}
          extra={<CrossIcon />}
          description="Doodle characters doing some online shopping! An illustration system based on all things eCommerce."
          onClick={() => console.log('clicked')}
        ></Card>
        <Card
          className="mr-6 "
          title={'New Title'}
          subExtra={<Tag label="active"></Tag>}
          description="Doodle characters doing some online shopping! An illustration system based on all things eCommerce."
          onClick={() => console.log('clicked')}
        ></Card>
        <p className={`font-paragraph-extralight md:text-desktop-paragraph`}>Mobile Extra Small Light 12</p>
        <p className="font-paragraph-regular">Mobile Extra Small Regular 12</p>
        <p className="font-paragraph-semibold">Mobile Extra Small SemiBold 12</p>
        <br></br>
        <h1 className="font-heading-01 md:text-desktop-heading">Desktop H1 Headings Regular 34</h1>
        <h1 className="text-4xl font-semibold">Desktop H1 Headings SemiBold 34</h1>
        <h1 className="text-4xl font-bold">Desktop H1 Headings Bold 34</h1>
        <h1 className="text-4xl font-extrabold">Desktop H1 Headings Extra Bold 34</h1>
        {/* <h1>Desktop H3 Headings Bold 34</h1>
        <h1>Desktop H4 Headings Extra Bold 34</h1> */}

        {/* <b className="text-xs-light">Mobile Extra Small Light 12</b>
        <b className="text-xs-regular">Mobile Extra Small Regular 12</b>
        <b className="text-xs-bold">Mobile Extra Small SemiBold 12</b> */}
        {imageRes.data.map((e, index) => (
          <div className="flex-row">
            {/* <div>
              {e.labels.map((e) => (
                <div className="ml-4">{e}</div>
              ))}
            </div> */}
            <div className="ml-4">
              {index}
              {e.target.map((e) => (
                <div>{e}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageUpload
