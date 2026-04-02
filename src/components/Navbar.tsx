import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'

const navLinks = [
  { name: 'Início', href: '#hero' },
  { name: 'Sobre', href: '#about' },
  { name: 'Projetos', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Contato', href: '#contact' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-dark-900/90 backdrop-blur-xl' : 'bg-transparent'
      }`}
    >
      <div className="layout-page-inner">
        <div className="flex items-center justify-between h-20">
          <motion.a
            href="#hero"
            className="text-xl font-bold bg-gradient-to-r from-accent-400 to-purple-400 bg-clip-text text-transparent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            &lt;GP /&gt;
          </motion.a>

          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors relative group text-sm"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-accent-400 to-purple-400 transition-all duration-300 group-hover:w-full" />
              </motion.a>
            ))}
          </div>

          <button
            className="md:hidden text-gray-400 hover:text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900/95 backdrop-blur-xl"
          >
            <div className="layout-page-inline-pad py-6 space-y-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-gray-400 hover:text-white px-4 py-3 rounded-xl hover:bg-white/[0.03] transition-all"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
