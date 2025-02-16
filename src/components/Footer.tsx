'use client'

import { motion } from "framer-motion"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center gap-6 mb-8">
          {[
            { icon: "/telegram.png", url: "#", alt: "Telegram" },
            { icon: "/twitter.png", url: "#", alt: "Twitter" },
            { icon: "/youtube.png", url: "#", alt: "YouTube" }
          ].map((social, index) => (
            <motion.a
              key={social.alt}
              href={social.url}
              className={`
                w-12 
                h-12 
                relative 
                rounded-xl
                border-2
                border-white/20
                flex
                items-center
                justify-center
                bg-black/10
                backdrop-blur-sm
                group
                hover:bg-blue-500/20
                hover:border-white/40
              `}
              initial={{ rotate: index % 2 === 0 ? 6 : -6 }}
              whileHover={{ 
                scale: 1.1,
                rotate: 0
              }}
              animate={{ 
                rotate: index % 2 === 0 ? 6 : -6 
              }}
              transition={{
                duration: 0.3
              }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={{ rotate: index % 2 === 0 ? 6 : -6 }}
                whileHover={{ rotate: 0 }}
                animate={{ rotate: index % 2 === 0 ? 6 : -6 }}
                transition={{ duration: 0.3 }}
              >
                <Image
                  src={social.icon}
                  alt={social.alt}
                  width={24}
                  height={24}
                  className="
                    invert
                    brightness-200
                  "
                />
              </motion.div>
            </motion.a>
          ))}
        </div>
        <p className="text-gray-400">© {new Date().getFullYear()} EmptyLab. All rights reserved.</p>
      </div>
    </footer>
  )
} 