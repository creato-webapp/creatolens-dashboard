import React from 'react'
import styles from '../../styles/Home.module.css'
function Footer() {
  return (
    <footer className={`${styles.footer} bg-neutral-100`}>
      <div className="inline-flex w-screen flex-col items-center justify-start gap-14 pt-14 pb-11">
        <div className="inline-flex items-start justify-center self-stretch">
          <div className="inline-flex shrink grow basis-0 flex-col items-center justify-start">
            <div className="flex flex-col items-start justify-start">
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-lg font-bold leading-loose text-zinc-400">About Creato</div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Our Story</div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Blog</div>
              </div>
            </div>
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-center justify-start">
            <div className="flex flex-col items-start justify-start">
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-lg font-bold leading-loose text-zinc-400">Support</div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-sm font-normal leading-none tracking-tight text-slate-600">FAQ</div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Terms & Conditions</div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Privacy Policy</div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Contact Us</div>
              </div>
            </div>
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-center justify-start">
            <div className="flex flex-col items-start justify-start">
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-lg font-bold leading-loose text-zinc-400">Discover</div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Join As Creator</div>
              </div>
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-sm font-normal leading-none tracking-tight text-slate-600">School Resources</div>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex h-3.5 w-96 flex-col items-center justify-start">
          <div className="text-xs font-semibold leading-none text-slate-600">©2023 ESSAA Limited All Rights Reserved</div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
