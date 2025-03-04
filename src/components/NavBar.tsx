'use client'

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Menu, X, Home, Info, Award } from "lucide-react"

export function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isManualNavigation, setIsManualNavigation] = useState(false)
  const [targetSectionId, setTargetSectionId] = useState<string | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // 检测设备是否为移动设备
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    // 初始检查
    checkIfMobile()
    
    // 检查URL中的hash并设置初始activeSection
    const hash = window.location.hash
    if (hash) {
      const sectionId = hash.substring(1) // 移除#符号
      const validSections = ['home', 'about', 'process']
      if (validSections.includes(sectionId)) {
        setActiveSection(sectionId)
      }
    }
    
    // 监听窗口大小变化
    window.addEventListener('resize', checkIfMobile)
    
    // 滚动停止检测
    let scrollEndTimer: NodeJS.Timeout | null = null;
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.8)
      
      // 如果是手动导航，不更新activeSection
      if (isManualNavigation) {
        // 重置滚动停止检测计时器
        if (scrollEndTimer) clearTimeout(scrollEndTimer);
        
        // 设置新的计时器，检测滚动停止
        scrollEndTimer = setTimeout(() => {
          // 如果有目标section，检查是否已经到达
          if (targetSectionId) {
            const targetElement = document.getElementById(targetSectionId);
            if (targetElement) {
              const rect = targetElement.getBoundingClientRect();
              // 检查是否已经滚动到目标位置附近
              if (rect.top <= 150 && rect.bottom >= 100) {
                // 已经到达目标位置，解除锁定
                setIsManualNavigation(false);
                setTargetSectionId(null);
              } else {
                // 还没到达目标位置，继续等待
                // 这种情况通常不会发生，除非滚动被中断
                setTimeout(() => {
                  setIsManualNavigation(false);
                  setTargetSectionId(null);
                }, 1000);
              }
            }
          } else {
            // 没有目标section，直接解除锁定
            setIsManualNavigation(false);
          }
        }, 100); // 滚动停止后100ms解除锁定
        
        return;
      }
      
      // Only update active section if not manually navigating
      const sections = [
        { id: 'home', offset: 0 },
        { id: 'about', offset: -100 },
        { id: 'process', offset: -100 }
      ]

      const currentSection = sections.find(section => {
        const element = document.getElementById(section.id)
        if (element) {
          const rect = element.getBoundingClientRect()
          // Make the detection area larger to avoid flickering
          return rect.top <= (150 + section.offset) && rect.bottom >= 100
        }
        return false
      })

      if (currentSection) {
        setActiveSection(currentSection.id)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', checkIfMobile)
      if (scrollEndTimer) clearTimeout(scrollEndTimer);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    }
  }, [isManualNavigation, targetSectionId])

  const links = [
    { name: 'Home', href: '#home', icon: <Home size={20} /> },
    { name: 'About', href: '#about', icon: <Info size={20} /> },
    { name: 'How to earn', href: '#process', icon: <Award size={20} /> }
  ]

  // 关闭菜单并滚动到指定部分
  const handleLinkClick = (href: string, event?: React.MouseEvent) => {
    setIsMenuOpen(false)
    
    // 清除之前的超时
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Get the target element
    const targetId = href.substring(1)
    
    // 设置目标section ID
    setTargetSectionId(targetId)
    
    // 设置手动导航标志
    setIsManualNavigation(true)
    
    // 立即更新activeSection状态，确保UI立即响应
    setActiveSection(targetId)
    
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      // Prevent default anchor behavior if event exists
      if (event) {
        event.preventDefault()
      }
      
      // Manually scroll to the element with smooth behavior
      targetElement.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
      
      // Update URL hash without scrolling (for bookmarking)
      window.history.pushState(null, '', href)
      
      // 设置安全超时，确保最终解除锁定
      // 即使滚动事件没有正确触发也能解除锁定
      scrollTimeoutRef.current = setTimeout(() => {
        setIsManualNavigation(false);
        setTargetSectionId(null);
      }, 3000); // 3秒后强制解除锁定
    }
  }

  return (
    <motion.nav 
      className={`
        fixed 
        w-full 
        top-0 
        z-50 
        transition-all 
        duration-300
        ${isScrolled 
          ? 'bg-gradient-to-r from-[#2C4696]/40 to-[#8361A0]/40 backdrop-blur-[2px] shadow-sm' 
          : 'bg-transparent'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between md:justify-start items-center h-16">
          {/* Logo */}
          <div className="text-2xl font-extrabold tracking-wider">
            <span className={`
              ${isScrolled ? 'text-[#8361A0]' : 'text-white'}
              transition-colors 
              duration-300
            `}>
              Moon
              <span className="text-[#8361A0]">cl</span>
            </span>
          </div>

          {/* 桌面端导航链接 */}
          <div className="hidden md:flex gap-12 pl-24">
            {links.map((link) => (
              <motion.div
                key={link.name}
                className="relative"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
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
                {activeSection === link.href.substring(1) && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#8361A0]"
                    initial={false}
                    transition={{ 
                      type: "spring", 
                      stiffness: 500, 
                      damping: 30,
                      duration: 0.1 
                    }}
                  />
                )}
              </motion.div>
            ))}
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white p-2 focus:outline-none"
            >
              {isMenuOpen ? (
                <X size={24} className="text-white" />
              ) : (
                <Menu size={24} className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-gradient-to-r from-[#2C4696]/90 to-[#8361A0]/90 backdrop-blur-md"
          >
            <div className="px-6 py-4 space-y-2">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault()
                    handleLinkClick(link.href)
                  }}
                  className={`
                    flex items-center gap-3
                    py-3 px-4 rounded-lg
                    text-lg font-medium
                    transition-all duration-200
                    ${activeSection === link.href.substring(1)
                      ? 'bg-white/10 text-white'
                      : 'text-white/80 hover:bg-white/5 hover:text-white'
                    }
                  `}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
} 