import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript, SiTailwindcss,
  SiNodedotjs, SiPython, SiPostgresql, SiMongodb, SiSupabase,
  SiDocker, SiGit, SiGithub, SiVercel, SiFigma,
  SiOpenai, SiPhp, SiMysql, SiHtml5
} from 'react-icons/si'
import { TbBrandFramerMotion, TbBrandCss3 } from 'react-icons/tb'

const categories = [
  {
    name: 'Frontend',
    skills: [
      { name: 'React', icon: SiReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'Tailwind CSS', icon: SiTailwindcss, color: '#06B6D4' },
      { name: 'Framer Motion', icon: TbBrandFramerMotion, color: '#FF0055' },
      { name: 'HTML5', icon: SiHtml5, color: '#E34F26' },
      { name: 'CSS3', icon: TbBrandCss3, color: '#1572B6' },
    ],
  },
  {
    name: 'Backend',
    skills: [
      { name: 'Node.js', icon: SiNodedotjs, color: '#339933' },
      { name: 'Python', icon: SiPython, color: '#3776AB' },
      { name: 'PHP', icon: SiPhp, color: '#777BB4' },
    ],
  },
  {
    name: 'IA & Dados',
    skills: [
      { name: 'OpenAI', icon: SiOpenai, color: '#412991' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'MySQL', icon: SiMysql, color: '#4479A1' },
      { name: 'Supabase', icon: SiSupabase, color: '#3FCF8E' },
    ],
  },
  {
    name: 'Ferramentas',
    skills: [
      { name: 'Git', icon: SiGit, color: '#F05032' },
      { name: 'GitHub', icon: SiGithub, color: '#ffffff' },
      { name: 'Docker', icon: SiDocker, color: '#2496ED' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'Figma', icon: SiFigma, color: '#F24E1E' },
    ],
  },
]

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredCategories =
    activeCategory === 'all'
      ? categories
      : categories.filter((cat) => cat.name === activeCategory)

  return (
    <section id="skills" className="layout-section">
      <div className="layout-page-inner">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="layout-heading-block flex flex-col gap-10">
            <div className="space-y-4">
              <motion.span
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : {}}
                transition={{ delay: 0.2 }}
                className="block text-accent-400 font-mono text-xs sm:text-sm tracking-widest uppercase"
              >
                Tecnologias
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 }}
                className="text-3xl sm:text-4xl font-semibold text-white leading-tight"
              >
                Skills e ferramentas
              </motion.h2>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center gap-2.5"
            >
              <button
                onClick={() => setActiveCategory('all')}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === 'all'
                    ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25'
                    : 'text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.07]'
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat.name
                      ? 'bg-accent-500 text-white shadow-lg shadow-accent-500/25'
                      : 'text-gray-400 hover:text-white bg-white/[0.04] hover:bg-white/[0.07]'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="skills-category-stack layout-skills-grid-offset">
            {filteredCategories.map((category, catIndex) => (
              <motion.div
                key={category.name}
                className="skills-category-block"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + catIndex * 0.1 }}
              >
                {activeCategory === 'all' && (
                  <h3 className="skills-category-title text-base font-medium text-gray-400 flex items-center gap-4">
                    <span className="w-8 h-px bg-gradient-to-r from-accent-500/50 to-transparent" />
                    {category.name}
                  </h3>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-5">
                  {category.skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 0.6 + index * 0.03 }}
                      whileHover={{ scale: 1.06, y: -5 }}
                      className="group relative p-6 rounded-2xl bg-white/[0.025] hover:bg-white/[0.05] shadow-lg shadow-black/20 transition-all duration-300 cursor-default"
                    >
                      <div className="flex flex-col items-center gap-4">
                        <skill.icon
                          className="w-9 h-9 transition-transform duration-300 group-hover:scale-110"
                          style={{ color: skill.color }}
                        />
                        <span className="text-xs sm:text-sm text-gray-400 font-medium text-center leading-snug">
                          {skill.name}
                        </span>
                      </div>

                      <div
                        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-[0.12] transition-opacity duration-300 blur-xl pointer-events-none"
                        style={{ backgroundColor: skill.color }}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-20 pt-12"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-5">
              Complementares
            </p>
            <p className="text-gray-400 text-base sm:text-lg leading-relaxed max-w-3xl">
              Também trabalho com{' '}
              <span className="text-gray-300">
                LangChain, LangGraph, embeddings, pgvector, n8n, Zod, Zustand, Socket.IO,
                REST APIs, WhatsApp Business API e Shopify Storefront API
              </span>
              .
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
