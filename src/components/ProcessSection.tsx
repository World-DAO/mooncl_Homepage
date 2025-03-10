'use client'

import { motion, useScroll, useTransform, useMotionValue, useMotionValueEvent } from "framer-motion"
import { useRef, useState, useEffect } from "react"

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  
  // 检测设备是否为移动设备
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1358)
    }
    
    // 初始检查
    checkIfMobile()
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkIfMobile)
    
    // 清理监听器
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  })

  const cards = [
    { 
      title: "Connect Wallet", 
      desc: "Connect your Sui or OKX wallet to start your journey in the Mooncl bar" 
    },
    { 
      title: "Share Story", 
      desc: "Tell your story to our AI bartender, who will help craft it into an engaging narrative" 
    },
    { 
      title: "Chat & Connect", 
      desc: "Engage in meaningful conversations with others who resonate with your story" 
    },
    { 
      title: "Earn NFT", 
      desc: "Receive unique NFTs from our AI bartender for your memorable stories and interactions" 
    }
  ]

  // 无论是否为移动端，都定义动画函数和所有hooks
  const getCardAnimation = (index: number) => {
    const cardStart = index * 0.2
    const cardEnd = Math.min(cardStart + 0.3, 0.9)
    const nextCardStart = (index + 1) * 0.2
    const nextCardMid = nextCardStart + 0.15  // 下一个卡片移动到中间位置
    const nextCardEnd = nextCardStart + 0.3

    // 调整卡片移动位置，增加最终位置的值
    const x = useTransform(
      scrollYProgress, 
      [cardStart, cardEnd], 
      [800, 100 + index * 20]  // 增加最终位置的值
    )
    
    // 修改初始透明度控制
    const visibility = useTransform(
      scrollYProgress,
      [cardStart - 0.1, cardStart, cardEnd],
      [0, 0, 1]
    )
    
    // 调整模糊效果的时间点，从下一个卡片中间位置开始
    const blur = useTransform(
      scrollYProgress, 
      [nextCardMid, nextCardEnd], 
      [0, 5], 
      { clamp: false }
    )
    
    const scale = useTransform(
      scrollYProgress, 
      [cardStart, cardEnd], 
      [0.95, 1]
    )
    
    // 修改 zIndex 逻辑，使后面的卡片始终在上层
    const zIndex = index  // 直接使用索引作为固定的 z-index 值，后面的卡片索引更大
    
    // 调整背景透明度变化，从下一个卡片中间位置开始
    const bgOpacity = useTransform(
      scrollYProgress,
      [
        nextCardMid,          // 从下一个卡片移动到中间位置开始变化
        nextCardMid + 0.1,    // 轻微变暗
        nextCardEnd - 0.05,   // 开始快速变暗
        nextCardEnd           // 完全变暗
      ],
      [1, 0.95, 0.8, 0.3],
      { clamp: true }
    )

    const finalOpacity = useMotionValue(1)

    useMotionValueEvent(visibility, "change", (latest) => {
      const bgValue = bgOpacity.get()
      finalOpacity.set(latest * bgValue)
    })

    useMotionValueEvent(bgOpacity, "change", (latest) => {
      const visValue = visibility.get()
      finalOpacity.set(visValue * latest)
    })

    return {
      x,
      scale,
      blur,
      zIndex,  // 现在后面的卡片会始终在前面的卡片上层
      finalOpacity
    }
  }

  // 为所有卡片预先计算动画属性，即使在移动端不使用
  const cardAnimations = cards.map((_, index) => getCardAnimation(index))

  // 在所有hooks调用之后，根据isMobile渲染不同的UI
  return (
    <>
      {isMobile ? (
        // 移动端版本的组件
        <section 
          id="process"
          className="relative bg-black text-white py-16"
        >
          <div className="w-full mx-auto px-6">
            {/* 标题部分 */}
            <div className="mb-12 text-center">
              <h2 className="text-4xl font-bold mb-4">
                How It Works
              </h2>
              <p className="text-gray-400 text-lg">
                Four steps to start your journey at Mooncl
              </p>
            </div>

            {/* 卡片部分 - 使用flex布局垂直排列 */}
            <div className="flex flex-col gap-6">
              {cards.map((card, index) => (
                <div
                  key={index}
                  className="p-6 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-200 bg-white"
                >
                  <div className="text-[#8361A0] text-5xl mb-4">0{index + 1}</div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">{card.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        // 桌面版本的组件（原有的滚动效果）
        <section 
          ref={containerRef}
          id="process"
          className="relative h-[400vh] bg-black text-white"
        >
          <div className="sticky top-0 h-screen flex items-center justify-center">
            <div className="w-full mx-auto px-20 grid grid-cols-[1fr_2fr] gap-8">
              {/* 左侧标题 */}
              <div className="pr-12 flex flex-col justify-center pl-20">
                <h2 className="text-6xl md:text-8xl font-bold mb-10">
                  How It
                  <br />
                  Works
                </h2>
                <p className="text-gray-400 text-xl">
                  Four steps to start your journey at Mooncl
                </p>
              </div>

              {/* 右侧卡片容器 */}
              <div className="relative h-[90vh] overflow-hidden flex items-center pl-40">
                {cards.map((card, index) => {
                  const { x, scale, blur, zIndex, finalOpacity } = cardAnimations[index]
                  
                  return (
                    <motion.div
                      key={index}
                      style={{
                        x,
                        scale,
                        filter: `blur(${blur}px)`,
                        zIndex,
                        backgroundColor: 'rgb(255, 255, 255)',
                        opacity: finalOpacity,
                        position: 'absolute',
                        width: '100%',
                        maxWidth: '32rem',
                        height: '420px',
                        left: '10%'
                      }}
                      className="p-12 rounded-2xl shadow-xl backdrop-blur-sm border border-gray-200 "
                    >
                      <motion.div>
                        <div className="text-[#8361A0] text-7xl mb-8">0{index + 1}</div>
                        <h3 className="text-4xl font-bold mb-6 text-gray-900">{card.title}</h3>
                        <p className="text-gray-600 text-xl leading-relaxed">{card.desc}</p>
                      </motion.div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
} 