import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiArrowDown, HiMail } from 'react-icons/hi'
import profileImage from '../assets/profile.png'

const roles = [
  'Full-Stack Developer',
  'React & Next.js',
  'Aplicações com IA',
  'Python & RAG',
]

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const role = roles[currentRole]
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < role.length) {
          setDisplayText(role.slice(0, displayText.length + 1))
        } else {
          setTimeout(() => setIsDeleting(true), 2000)
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1))
        } else {
          setIsDeleting(false)
          setCurrentRole((prev) => (prev + 1) % roles.length)
        }
      }
    }, isDeleting ? 50 : 100)

    return () => clearTimeout(timeout)
  }, [displayText, isDeleting, currentRole])

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-x-clip pt-24">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent-500/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/8 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 flex flex-1 flex-col justify-center px-5 sm:px-10 lg:px-14 xl:px-20 py-16 sm:py-20 lg:py-24">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-20 xl:gap-24">
            {/* Área da foto com padding extra para badges/anim. não serem cortados */}
            <div className="relative shrink-0 w-full max-w-[22rem] flex justify-center px-6 sm:px-8 py-8 sm:py-10 overflow-visible">
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto overflow-visible"
              >
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-[17.5rem] lg:h-[17.5rem] mx-auto">
                  <motion.div
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-500 via-purple-500 to-cyan-500 opacity-80"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                  />
                  <div className="absolute inset-[3px] rounded-full bg-dark-900 overflow-hidden">
                    <img
                      src={profileImage}
                      alt="Gustavo Poffo"
                      className="absolute inset-0 w-full h-full rounded-full object-cover object-[center_28%]"
                    />
                  </div>
                </div>

                {/* Dentro da área útil — sem valores negativos que saem da viewport */}
                <motion.div
                  className="absolute right-0 sm:right-1 top-8 sm:top-10 backdrop-blur-md bg-dark-800/80 rounded-xl px-4 py-2.5 shadow-lg shadow-black/30 max-w-[9rem] ring-1 ring-white/[0.08]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity }}
                >
                  <span className="text-xs sm:text-sm font-medium text-accent-400 leading-tight block text-center">
                    USP/ICMC
                  </span>
                </motion.div>
                <motion.div
                  className="absolute left-0 sm:left-1 bottom-8 sm:bottom-10 backdrop-blur-md bg-dark-800/80 rounded-xl px-4 py-2.5 shadow-lg shadow-black/30 ring-1 ring-white/[0.08]"
                  animate={{ y: [0, 6, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, delay: 1.5 }}
                >
                  <span className="text-xs sm:text-sm font-medium text-purple-400 whitespace-nowrap">
                    Full-Stack
                  </span>
                </motion.div>
              </motion.div>
            </div>

            {/* Texto sempre centralizado no bloco */}
            <div className="flex flex-col items-center justify-center text-center w-full max-w-xl mx-auto lg:min-w-0">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-accent-400 font-mono mb-6 tracking-wide text-xs sm:text-sm"
              >
                Olá, eu sou
              </motion.p>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl sm:text-5xl font-bold text-white mb-7 leading-tight text-balance max-w-[18ch] sm:max-w-none mx-auto"
              >
                Gustavo Poffo
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-lg sm:text-xl text-gray-400 hero-subtitle-spacing min-h-[2rem] flex items-center justify-center gap-0.5"
              >
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-purple-400">
                  {displayText}
                </span>
                <span className="animate-pulse text-accent-400 inline-block w-0.5">|</span>
              </motion.div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 mb-0 leading-[1.85] text-base sm:text-[1.0625rem] max-w-md mx-auto px-2 text-balance"
              >
                Estudante de Ciência da Computação na USP, construindo soluções que unem
                <span className="text-gray-300"> Web Performance</span> e
                <span className="text-gray-300"> Inteligência Artificial</span>.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-20 sm:mt-24 lg:mt-32 w-full flex flex-wrap gap-4 sm:gap-5 justify-center"
              >
                <a
                  href="#projects"
                  className="group relative px-8 py-3.5 bg-gradient-to-r from-accent-500 to-purple-500 rounded-xl font-medium text-white text-sm sm:text-base overflow-hidden transition-all hover:shadow-lg hover:shadow-accent-500/25"
                >
                  <span className="relative z-10">Ver Projetos</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>

                <a
                  href="#contact"
                  className="px-8 py-3.5 rounded-xl font-medium text-gray-300 text-sm sm:text-base bg-white/[0.04] hover:bg-white/[0.08] transition-all hover:text-white ring-1 ring-white/10"
                >
                  Entrar em Contato
                </a>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex gap-7 sm:gap-8 hero-social-spacing justify-center"
              >
                <a
                  href="https://github.com/gustavopoffo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all ring-1 ring-white/10"
                >
                  <FaGithub size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/gustavo-poffo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-xl text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all ring-1 ring-white/10"
                >
                  <FaLinkedin size={22} />
                </a>
                <a
                  href="mailto:gustavopoffo022@gmail.com"
                  className="p-4 rounded-xl text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] transition-all ring-1 ring-white/10"
                >
                  <HiMail size={22} />
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 shrink-0 flex justify-center pb-14 sm:pb-16 pt-6">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <motion.a
            href="#about"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className="flex flex-col items-center gap-3 text-gray-500 hover:text-accent-400 transition-colors"
          >
            <span className="text-sm tracking-widest uppercase">Rolar</span>
            <HiArrowDown size={24} className="opacity-70" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
