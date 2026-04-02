import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiAcademicCap, HiCode, HiLightningBolt, HiSparkles } from 'react-icons/hi'

const highlights = [
  {
    icon: HiAcademicCap,
    title: 'USP/ICMC',
    description: 'Ciência da Computação — 9º período',
  },
  {
    icon: HiCode,
    title: 'Full-Stack',
    description: 'React, Next.js, Node.js, Python',
  },
  {
    icon: HiLightningBolt,
    title: 'IA & RAG',
    description: 'LangChain, Embeddings, pgvector',
  },
  {
    icon: HiSparkles,
    title: 'Integrações',
    description: 'APIs, WhatsApp, Shopify',
  },
]

const certifications = [
  { emoji: '🎓', title: 'Técnico em Informática', subtitle: 'COTIL/Unicamp' },
  { emoji: '☁️', title: 'Google Cloud Skill Badge', subtitle: 'Load Balancing & App Dev' },
  { emoji: '🐘', title: 'PostgreSQL', subtitle: 'DATA — ICMC/USP' },
]

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" className="layout-section">
      <div className="layout-page-inner">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="text-left layout-heading-block">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-accent-400 font-mono text-xs sm:text-sm tracking-widest uppercase"
            >
              Quem sou eu
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-semibold text-white mt-4"
            >
              Sobre mim
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-5 gap-20 lg:gap-28 items-start">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="lg:col-span-3 layout-prose-stack"
            >
              <p className="text-gray-200 leading-[2.1] text-lg sm:text-xl">
                Sou um desenvolvedor focado em construir soluções que unem{' '}
                <span className="text-accent-400">Web Performance</span> e{' '}
                <span className="text-purple-400">Inteligência Artificial</span>.
              </p>

              <p className="text-gray-400 leading-[2] text-base sm:text-lg">
                Atualmente, dedico meu tempo ao desenvolvimento de sistemas RAG e
                e-commerces escaláveis, sempre priorizando código limpo e arquitetura
                resiliente. Tenho experiência prática no consumo de APIs, integrações
                e construção de sistemas robustos.
              </p>

              <p className="text-gray-400 leading-[2] text-base sm:text-lg">
                Busco oportunidades para atuar na construção de aplicações escaláveis
                e orientadas a produto, onde posso aplicar meus conhecimentos em
                desenvolvimento full-stack e inteligência artificial.
              </p>

              <div className="layout-certifications">
                <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-10">
                  Certificações
                </p>
                <div className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {certifications.slice(0, 2).map((cert) => (
                      <div
                        key={cert.title}
                        className="flex items-start gap-5 py-2 sm:py-3"
                      >
                        <span className="text-3xl leading-none shrink-0" aria-hidden>
                          {cert.emoji}
                        </span>
                        <div className="space-y-2 min-w-0 flex-1">
                          <p className="text-white text-sm sm:text-base font-semibold leading-snug">
                            {cert.title}
                          </p>
                          <p className="text-gray-500 text-sm leading-relaxed">{cert.subtitle}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="sm:max-w-[calc(50%-0.5rem)]">
                    <div className="flex items-start gap-5 py-2 sm:py-3">
                      <span className="text-3xl leading-none shrink-0" aria-hidden>
                        {certifications[2].emoji}
                      </span>
                      <div className="space-y-2 min-w-0 flex-1">
                        <p className="text-white text-sm sm:text-base font-semibold leading-snug">
                          {certifications[2].title}
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed">
                          {certifications[2].subtitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5 }}
              className="lg:col-span-2 grid grid-cols-2 gap-5 sm:gap-6"
            >
              {highlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="group p-7 sm:p-8 rounded-2xl bg-white/[0.025] shadow-xl shadow-black/30 hover:bg-white/[0.04] transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-500/20 to-purple-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <item.icon className="w-5 h-5 text-accent-400" />
                  </div>
                  <h3 className="text-white font-semibold mb-3">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed tracking-wide">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
