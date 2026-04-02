import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiBriefcase, HiAcademicCap } from 'react-icons/hi'

const experiences = [
  {
    type: 'work',
    title: 'Desenvolvedor de IA Conversacional (RAG & WhatsApp)',
    company: 'EUTBEM',
    period: 'Dez/2025 - Presente',
    description: [
      'Desenvolvimento de sistema de IA conversacional com pipeline de RAG, simulando atuação de consultor de vendas via WhatsApp',
      'Implementação de sistema de recuperação com ~220 chunks indexados em pgvector (Supabase)',
      'Pipeline de ingestão com processamento de PDFs + web scraping (~54 mil tokens)',
      'Memória persistente em PostgreSQL e handoff inteligente com geração automática de resumo',
      'Orquestração via n8n integrando pipeline de IA, banco de dados e WhatsApp Business API',
    ],
    tags: ['Python', 'LangChain', 'RAG', 'pgvector', 'n8n', 'WhatsApp API'],
  },
  {
    type: 'work',
    title: 'Desenvolvedor Front-end | Freelancer',
    company: 'The Mome',
    period: 'Dez/2025 - Presente',
    description: [
      'Desenvolvimento do front-end com Next.js (App Router), React e TypeScript, integrado à Shopify Storefront API',
      'Implementação de rate limiting por endpoint (200 req/min produtos | 30 req/min carrinho)',
      'Sistema de resiliência com retry + exponential backoff (3 tentativas, timeout de 10s)',
      'Otimização com cache client-side (TTL de 2 minutos) e prefetch de variantes',
      'Validação de 6 ações críticas com Zod e configuração de 5 headers de segurança HTTP',
    ],
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Zustand', 'Shopify API'],
  },
  {
    type: 'work',
    title: 'Membro da Equipe de Vendas',
    company: 'ICMC Júnior',
    period: 'Abr/2022 - Set/2022',
    description: [
      'Atuação na venda e desenvolvimento de soluções tecnológicas',
      'Ponte entre a equipe técnica e os clientes',
      'Desenvolvimento de competências em negociação e análise de requisitos',
    ],
    tags: ['Vendas', 'Negociação', 'Requisitos'],
  },
]

const education = [
  {
    type: 'education',
    title: 'Bacharelado em Ciência da Computação',
    company: 'USP - ICMC | São Carlos, SP',
    period: 'Fev/2022 - Presente',
    description: ['9º período em andamento'],
    tags: [],
  },
  {
    type: 'education',
    title: 'Ensino Médio e Técnico em Informática',
    company: 'COTIL - Unicamp | Limeira, SP',
    period: 'Fev/2018 - Dez/2020',
    description: ['Formação técnica completa em Informática'],
    tags: [],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="experience"
      className="relative scroll-mt-20 border-t border-dark-700/50 bg-dark-800/30 pt-24 sm:pt-32 pb-28 sm:pb-36"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20 max-w-2xl mx-auto">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-accent-400 font-mono text-sm tracking-wide"
            >
              Minha trajetória
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-bold text-white mt-4 mb-4"
            >
              Experiência e formação
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="text-gray-400 text-base sm:text-lg leading-relaxed"
            >
              Experiências recentes em IA e front-end, formação na USP e certificações.
            </motion.p>
          </div>

          <div className="grid lg:grid-cols-2 gap-14 lg:gap-16 xl:gap-20">
            {/* Work Experience */}
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 text-xl font-semibold text-white mb-10"
              >
                <div className="p-2.5 bg-accent-500/20 rounded-xl">
                  <HiBriefcase className="w-5 h-5 text-accent-400" />
                </div>
                Experiência profissional
              </motion.h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-accent-500 via-purple-500 to-dark-600" />

                <div className="space-y-10 sm:space-y-12">
                  {experiences.map((exp, index) => (
                    <motion.div
                      key={exp.title}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + index * 0.15 }}
                      className="relative pl-8"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-dark-800 border-2 border-accent-500 z-10" />
                      
                      <div className="bg-dark-800 border border-dark-600 rounded-xl p-6 sm:p-7 hover:border-dark-500 transition-all">
                        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                          <span className="text-accent-400 font-mono text-sm">
                            {exp.period}
                          </span>
                          <span className="text-gray-500 text-sm">
                            {exp.company}
                          </span>
                        </div>
                        
                        <h4 className="text-lg sm:text-xl font-semibold text-white mb-5 leading-snug">
                          {exp.title}
                        </h4>
                        
                        <ul className="space-y-3 mb-6">
                          {exp.description.map((item, i) => (
                            <li key={i} className="text-gray-400 text-sm sm:text-[15px] flex items-start gap-3 leading-relaxed">
                              <span className="text-accent-400 mt-2 shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {exp.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 sm:gap-2.5">
                            {exp.tags.map((tag) => (
                              <span
                                key={tag}
                                className="px-3 py-1.5 bg-dark-700 border border-dark-600 rounded-lg text-xs text-gray-300"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Education */}
            <div>
              <motion.h3
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 }}
                className="flex items-center gap-3 text-xl font-semibold text-white mb-10"
              >
                <div className="p-2.5 bg-purple-500/20 rounded-xl">
                  <HiAcademicCap className="w-5 h-5 text-purple-400" />
                </div>
                Formação acadêmica
              </motion.h3>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-purple-500 via-cyan-500 to-dark-600" />

                <div className="space-y-10 sm:space-y-12">
                  {education.map((edu, index) => (
                    <motion.div
                      key={edu.title}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + index * 0.15 }}
                      className="relative pl-8"
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-0 top-2 w-4 h-4 rounded-full bg-dark-800 border-2 border-purple-500 z-10" />
                      
                      <div className="bg-dark-800 border border-dark-600 rounded-xl p-6 sm:p-7 hover:border-dark-500 transition-all">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                          <span className="text-purple-400 font-mono text-sm">
                            {edu.period}
                          </span>
                        </div>
                        
                        <h4 className="text-lg sm:text-xl font-semibold text-white mb-3 leading-snug">
                          {edu.title}
                        </h4>
                        
                        <p className="text-gray-500 text-sm mb-3 leading-relaxed">
                          {edu.company}
                        </p>
                        
                        {edu.description.map((item, i) => (
                          <p key={i} className="text-gray-400 text-sm sm:text-[15px] leading-relaxed">
                            {item}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.9 }}
                className="mt-14 sm:mt-16"
              >
                <h4 className="text-lg font-semibold text-white mb-5">
                  Certificações
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 sm:p-5 bg-dark-800 border border-dark-600 rounded-xl">
                    <span className="text-2xl">☁️</span>
                    <div>
                      <p className="text-white text-sm font-medium">Google Cloud Skill Badge</p>
                      <p className="text-gray-500 text-xs mt-1">Load Balancing & App Dev Environment</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 sm:p-5 bg-dark-800 border border-dark-600 rounded-xl">
                    <span className="text-2xl">🐘</span>
                    <div>
                      <p className="text-white text-sm font-medium">Curso de PostgreSQL</p>
                      <p className="text-gray-500 text-xs mt-1">DATA - ICMC/USP</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
