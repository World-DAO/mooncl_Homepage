'use client'

import { motion } from "framer-motion"
import Image from "next/image"

export function ContentSection() {
  const features = [
    {
      title: "AI-Assisted Story Creation",
      description: "Our AI helps you craft and uncover engaging narratives by mining your ideas and experiences, turning everyday moments into compelling stories.",
      icon: "/story.png",  // 需要添加相应的图标
    },
    {
      title: "Anonymous Random Chatting",
      description: "Connect with other users through spontaneous, anonymous conversations, allowing you to share and discover diverse perspectives without revealing your identity.",
      icon: "/chat.png",   // 需要添加相应的图标
    },
    {
      title: "AI Story Evaluation & NFT Minting",
      description: "Let our AI assess your stories, and if they stand out, mint them as NFTs—transforming your creative narratives into unique, tradable digital assets.",
      icon: "/nft.png",    // 需要添加相应的图标
    }
  ]

  return (
    <section id="about" className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        {/* 主标题 */}
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Craft Your Narrative
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Step into a space where every conversation sparks creativity and every story can earn rewards. 
            Enjoy AI-powered storytelling, anonymous chats, and the opportunity to mint your narratives as NFTs.
          </motion.p>
        </div>

        {/* 特点列表 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative"
            >
              <div className="
                bg-gray-800 
                rounded-2xl 
                p-8 
                h-full 
                border 
                border-gray-700
                hover:border-[#8361A0]
                transition-colors
                duration-300
                group
              ">
                {/* <div className="mb-6">
                  <Image
                    src={feature.icon}
                    alt={feature.title}
                    width={48}
                    height={48}
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                </div> */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-[#8361A0] transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 