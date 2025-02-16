'use client'

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8)
      
      // 改进检测逻辑
      const sections = [
        { id: 'home', offset: 0 },
        { id: 'about', offset: -100 },  // 提前触发
        { id: 'process', offset: -100 }
      ]

      // 找到当前可见的 section
      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // 调整检测范围，考虑 offset
          return rect.top <= (100 + section.offset) && rect.bottom >= 0
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 添加调试信息
  useEffect(() => {
    console.log('Current active section:', activeSection)
  }, [activeSection])

  const links = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'How to earn', href: '#process' }
  ]

  return (
    <motion.nav 
      className={`fixed w-full top-0 z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-gradient-to-r from-[#2C4696]/40 to-[#8361A0]/40 backdrop-blur-[2px] shadow-sm' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-extrabold tracking-wider">
            <span className={`
              ${isScrolled ? 'text-[#8361A0]' : 'text-white'}
              transition-colors 
              duration-300
            `}>
              Moon
              <span className={`
                text-[#8361A0]
                transition-colors 
                duration-300
              `}>
                cl
              </span>
            </span>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-12 pl-24">
            {links.map((link) => (
              <motion.div
                key={link.name}
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={`
                    text-lg 
                    font-semibold 
                    tracking-wide
                    transition-all
                    duration-300
                    ${isScrolled 
                      ? 'text-white/90 hover:text-white' 
                      : 'text-white hover:text-blue-200'
                    }
                    ${activeSection === link.href.substring(1) && `
                      text-[#8361A0] 
                      font-bold
                      scale-105
                      text-xl
                    `}
                  `}
                >
                  {link.name}
                </Link>
                {/* 活动指示器 */}
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8361A0]"
                    initial={false}
                    transition={{ 
                      type: "spring", 
                      stiffness: 380, 
                      damping: 30 
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  )
} 