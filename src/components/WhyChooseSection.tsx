'use client'

import { motion } from "framer-motion"

export function WhyChooseSection() {
  const benefits = [
    {
      title: "Genuine Connections",
      description: "Forge real friendships through creation in a welcoming virtual space.",
      gradient: "from-purple-400 to-blue-500"
    },
    {
      title: "Empowerment",
      description: "Share your experiences and get rewarded for your creativity.",
      gradient: "from-blue-400 to-purple-500"
    },
    {
      title: "AI-Driven Community",
      description: "Lisa manages the bar, ensuring users have control over their interactions.",
      gradient: "from-[#8361A0] to-blue-500"
    },
    {
      title: "Community Spirit",
      description: "Be part of a supportive network that values your voice.",
      gradient: "from-blue-500 to-[#8361A0]"
    }
  ]

  return (
    <section className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center text-white mb-20"
        >
          Why Choose Mooncl
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="relative group"
            >
              <div className={`
                absolute inset-0 
                bg-gradient-to-r 
                ${benefit.gradient} 
                opacity-0 
                group-hover:opacity-10 
                rounded-2xl 
                transition-opacity 
                duration-300
              `} />
              <div className="
                relative 
                bg-gray-800/50 
                backdrop-blur-sm 
                p-8 
                rounded-2xl 
                border 
                border-gray-700
                group-hover:border-[#8361A0]
                transition-colors
                duration-300
              ">
                <h3 className="
                  text-2xl 
                  font-bold 
                  text-white 
                  mb-4 
                  group-hover:text-[#8361A0] 
                  transition-colors 
                  duration-300
                ">
                  {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 