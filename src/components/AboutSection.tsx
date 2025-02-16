'use client'

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-6">关于我们</h2>
          <p className="text-gray-600 leading-relaxed">
            我们是一家专注于数字化转型的技术公司，拥有十年行业经验...
          </p>
        </motion.div>

        <div className="grid grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: item * 0.1 }}
              className="p-6 bg-white rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">核心优势 {item}</h3>
              <p className="text-gray-500">详细说明内容...</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 