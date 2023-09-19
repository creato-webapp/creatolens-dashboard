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
              <a href="https://live.creatogether.app/pages/about-us">
                <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                  <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Our Story</div>
                </div>
              </a>
              <a href="https://www.creatogether.app/zh/blogs">
                <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                  <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Blog</div>
                </div>
              </a>
            </div>
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-center justify-start">
            <div className="flex flex-col items-start justify-start">
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-lg font-bold leading-loose text-zinc-400">Support</div>
              </div>
              <a href="https://www.notion.so/ffd8e5bab4b04ac1b8dd1b9988dbd10f?v=d25dc72cdc9d44cf9dc492e74acf6855">
                <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                  <div className="text-sm font-normal leading-none tracking-tight text-slate-600">FAQ</div>
                </div>
              </a>
              <a href="https://live.creatogether.app/pages/privacy-terms">
                <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                  <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Terms & Conditions</div>
                </div>
              </a>
              <a href="https://live.creatogether.app/pages/privacy-policy">
                <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                  <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Privacy Policy</div>
                </div>
              </a>
              <a href="https://live.creatogether.app/pages/contact">
                <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                  <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Contact Us</div>
                </div>
              </a>
            </div>
          </div>
          <div className="inline-flex shrink grow basis-0 flex-col items-center justify-start">
            <div className="flex flex-col items-start justify-start">
              <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                <div className="text-lg font-bold leading-loose text-zinc-400">Discover</div>
              </div>
              <a href="https://live.creatogether.app/pages/join-as-creator">
                <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                  <div className="text-sm font-normal leading-none tracking-tight text-slate-600">Join As Creator</div>
                </div>
              </a>
              <a href="https://live.creatogether.app/pages/ole-%E5%85%B6%E4%BB%96%E5%AD%B8%E7%BF%92%E7%B6%93%E6%AD%B7">
                <div className="inline-flex items-start justify-start gap-2.5 self-stretch p-3">
                  <div className="text-sm font-normal leading-none tracking-tight text-slate-600">School Resources</div>
                </div>
              </a>
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
