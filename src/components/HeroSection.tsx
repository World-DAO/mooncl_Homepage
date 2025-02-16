'use client'

import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useEffect } from "react"

export function HeroSection() {
  const [currentText, setCurrentText] = useState(0)
  const animatedTexts = ["Unwind yourself", "Share your day", "Earn rewards"]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % animatedTexts.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="home" className="relative h-screen flex items-center justify-center">
      <div className="absolute inset-0 z-0">
        <Image
          src="/hero-bg.png"
          alt="背景图"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center text-white px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold mb-25 relative">
          Welcome to{" "}
          <motion.span
            className="relative inline-block text-[#8361A0]"
            animate={{
              scale: [1, 1.02, 1],
              textShadow: [
                "0 0 7px #8361A0",
                "0 0 10px #8361A0",
                "0 0 21px #8361A0",
                "0 0 42px #8361A0",
                "0 0 82px #8361A0",
                "0 0 92px #8361A0",
                "0 0 102px #8361A0",
                "0 0 151px #8361A0",
                "0 0 182px #8361A0",
                "0 0 200px #8361A0",
                "0 0 220px #8361A0",
              ],
              opacity: [0.9, 1, 0.9],
              filter: [
                "brightness(1)",
                "brightness(1.2)",
                "brightness(1)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
              times: [0, 0.5, 1]
            }}
            style={{
              WebkitTextStroke: "1px #8361A0"
            }}
          >
            <motion.span
              className="absolute inset-0 blur-[2px]"
              style={{
                color: "#8361A0",
                WebkitTextStroke: "2px #8361A0"
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              Mooncl
            </motion.span>
            Mooncl
          </motion.span>
        </h1>

        <div className="h-32 mt-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -60 }}
              transition={{ 
                duration: 0.8,
                type: "spring",
                stiffness: 150,
                damping: 15
              }}
              className="text-3xl md:text-5xl font-bold text-white tracking-wider"
            >
              {animatedTexts[currentText]}
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ 
            scale: 1.05,
            textShadow: "0 0 8px rgb(131, 97, 160)",
            boxShadow: "0 0 15px rgba(131, 97, 160, 0.5)",
          }}
          className="
            relative 
            overflow-hidden 
            bg-transparent 
            text-white 
            px-10 
            py-4 
            rounded-lg 
            text-lg 
            font-bold 
            border-2 
            border-[#8361A0] 
            transition-all
            duration-300
            before:absolute
            before:inset-0
            before:bg-[#8361A0]
            before:translate-x-[-100%]
            before:hover:translate-x-0
            before:transition-transform
            before:duration-300
            before:z-[-1]
            hover:border-transparent
            group
          "
        >
          <span className="
            relative 
            z-10 
            bg-gradient-to-r 
            from-white 
            to-white 
            bg-clip-text
            group-hover:from-white
            group-hover:to-purple-200
            transition-all
            duration-300
          ">
            Enter Mooncl
          </span>
          <motion.div
            className="absolute inset-0 opacity-50"
            animate={{
              background: [
                "linear-gradient(0deg, transparent, #8361A0, transparent)",
                "linear-gradient(180deg, transparent, #8361A0, transparent)",
                "linear-gradient(360deg, transparent, #8361A0, transparent)",
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </motion.button>
      </motion.div>

      {/* 社交媒体图标容器 */}
      <div className="absolute bottom-14 left-14 flex gap-6">
        {[
          { icon: "/telegram.png", url: "#", alt: "Telegram" },
          { icon: "/twitter.png", url: "#", alt: "Twitter" },
          { icon: "/youtube.png", url: "#", alt: "YouTube" }
        ].map((social, index) => (
          <motion.a
            key={social.alt}
            href={social.url}
            className={`
              w-16 
              h-16 
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
                width={32}
                height={32}
                className="
                  invert
                  brightness-200
                "
              />
            </motion.div>
          </motion.a>
        ))}
      </div>

    </section>
  )
} 