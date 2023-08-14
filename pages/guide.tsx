import React from 'react'
import styles from '../styles/Desktop.module.css'
import Card from '@components/Card'
import type { NextPage } from 'next'
import Paragraph from '@components/Typography/Paragraph'

const Guide: NextPage = () => {
  return (
    <Card title="HOW TO START!" className="flex h-screen">
      <Paragraph>2 Easy Steps to Kick Start</Paragraph>
      <div className="flex justify-center gap-4">
        <div className="relative h-96 w-96 rounded bg-neutral-50 shadow">
          <div className="absolute left-0 top-0 h-72 w-96 bg-white">
            <div className="absolute left-0 top-0 inline-flex h-14 w-14 flex-col items-center justify-center gap-2.5 rounded-br-lg bg-violet-200 p-2.5">
              <div className="text-center text-3xl font-semibold leading-10 text-blue-700">1</div>
            </div>
          </div>
          <div className="w-96 text-center text-3xl font-bold leading-10 text-neutral-800">Add new Instagram account in Creato LENS</div>
        </div>
        <div className="relative h-96 w-96 rounded bg-neutral-50 shadow">
          <div className="absolute left-0 top-0 h-72 w-96 bg-white">
            <div className="absolute left-0 top-0 inline-flex h-14 w-14 flex-col items-center justify-center gap-2.5 rounded-br-lg bg-violet-200 p-2.5">
              <div className="text-center text-3xl font-semibold leading-10 text-blue-700">2</div>
            </div>
          </div>
          <div className="w-96 text-center text-3xl font-bold leading-10 text-neutral-800">Add new Instagram account in Creato LENS</div>
        </div>
      </div>
    </Card>
  )
}
export default Guide
