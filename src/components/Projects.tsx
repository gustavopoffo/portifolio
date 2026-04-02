import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { HiExternalLink, HiX, HiChevronRight } from 'react-icons/hi'
import { FaGithub } from 'react-icons/fa'

function hostnameFromUrl(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return url
  }
}

type Project = {
  id: string
  title: string
  tagline: string
  description: string
  details: string[]
  role?: string
  period?: string
  tags: string[]
  liveUrl: string | null
  githubUrl: string | null
  gradient: string
  featured: boolean
  /** Caminho em /public/projects — null usa placeholder com gradiente */
  coverImage: string | null
}

const projects: Project[] = [
  {
    id: 'themome',
    title: 'The Mome',
    tagline: 'E-commerce de snack proteico com Shopify Storefront API',
    description:
      'Front-end completo para e-commerce de alimentos, integrado à Shopify com foco em performance e resiliência.',
    details: [
      'Desenvolvimento do front-end com Next.js (App Router), React e TypeScript',
      'Integração completa com Shopify Storefront API para catálogo e checkout',
      'Rate limiting diferenciado por endpoint (200 req/min produtos | 30 req/min carrinho)',
      'Sistema de resiliência com retry + exponential backoff (3 tentativas, timeout de 10s)',
      'Cache client-side com TTL de 2 minutos e prefetch de variantes de produto',
      'Persistência de carrinho por 30 dias para continuidade da experiência',
      'Validação de 6 ações críticas com Zod (discriminated union)',
      'Configuração de 5 headers de segurança HTTP',
    ],
    role: 'Desenvolvedor Front-end | Freelancer',
    period: 'Dez/2025 — Presente',
    tags: ['Next.js', 'TypeScript', 'Tailwind', 'Zustand', 'Zod', 'Shopify API'],
    liveUrl: 'https://themome.vercel.app/',
    githubUrl: null,
    gradient: 'from-emerald-500 to-green-600',
    featured: true,
    coverImage: '/projects/themome.png',
  },
  {
    id: 'eutbem',
    title: 'Agente IA — EUTBEM',
    tagline: 'Consultor de vendas via WhatsApp com RAG e base vetorial',
    description:
      'Sistema de IA conversacional que simula um consultor de vendas de consórcios, com recuperação de contexto e memória persistente.',
    details: [
      'Pipeline de RAG com ~220 chunks indexados em pgvector (Supabase)',
      'Ingestão de dados via Docling: processamento de PDFs + web scraping (~54 mil tokens)',
      'Embeddings OpenAI com chunking estratégico para aumentar relevância',
      'Estruturação de recuperação contextual para redução de alucinações',
      'Memória persistente em PostgreSQL para continuidade de contexto',
      'Handoff inteligente com geração automática de resumo (IA → humano)',
      'Orquestração via n8n integrando pipeline de IA, banco de dados e WhatsApp Business API',
    ],
    role: 'Desenvolvedor de IA Conversacional',
    period: 'Dez/2025 — Presente',
    tags: ['Python', 'LangChain', 'PostgreSQL', 'pgvector', 'Supabase', 'n8n'],
    liveUrl: null,
    githubUrl: 'https://github.com/gustavopoffo/RAG_vectorstore',
    gradient: 'from-violet-500 to-purple-600',
    featured: true,
    coverImage: null,
  },
  {
    id: 'rcei',
    title: 'RCEI — ORCID Project',
    tagline: 'Plataforma de integração com API ORCID',
    description:
      'Aplicação web para melhorar a usabilidade do ecossistema ORCID, facilitando consulta a dados de pesquisadores.',
    details: [
      'Login via OAuth com a plataforma ORCID',
      'Consulta a dados de publicações, financiamentos e revisões de pares',
      'Projeto acadêmico com entrevistas e levantamento de requisitos com professores',
      'Front-end em React com TypeScript e back-end Node.js',
    ],
    tags: ['TypeScript', 'React', 'Node.js', 'API ORCID'],
    liveUrl: 'https://orcid-project-iquimic-kappa.vercel.app/',
    githubUrl: 'https://github.com/gustavopoffo/orcid-project-iquimic',
    gradient: 'from-cyan-500 to-blue-600',
    featured: false,
    coverImage: '/projects/rcei.png',
  },
  {
    id: 'espacoazul',
    title: 'Espaço Azul',
    tagline: 'Site institucional para ONG de apoio a crianças com TEA',
    description:
      'Website completo para ONG de São Carlos com páginas de missão, doação, equipe e transparência.',
    details: [
      'Site institucional com múltiplas páginas (missão, doação, equipe, transparência)',
      'Recursos de acessibilidade: alto contraste e ajuste de tamanho de fonte',
      'Back-end Node.js/Express com banco de dados SQLite',
      'Sistema de login para administradores',
    ],
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Node.js', 'Express', 'SQLite'],
    liveUrl: 'https://espaco-azul-1s.onrender.com',
    githubUrl: 'https://github.com/gustavopoffo/espaco-azul',
    gradient: 'from-sky-500 to-blue-600',
    featured: false,
    coverImage: '/projects/espaco-azul.png',
  },
  {
    id: 'foundyou',
    title: 'FoundYou',
    tagline: 'Mapa de localização em tempo real',
    description:
      'Aplicação web para visualizar localização própria e de outros usuários conectados em tempo real.',
    details: [
      'Mapa interativo com Leaflet mostrando localização em tempo real',
      'Sistema de amizades e visualização de concentração de usuários',
      'Comunicação em tempo real via Socket.IO',
      'Persistência de dados no MongoDB Atlas',
      'Deploy: Render (backend) e Vercel (frontend)',
    ],
    tags: ['React', 'Leaflet', 'Node.js', 'Socket.IO', 'MongoDB'],
    liveUrl: 'https://found-you.vercel.app',
    githubUrl: 'https://github.com/gustavopoffo/FoundYou',
    gradient: 'from-orange-500 to-red-600',
    featured: false,
    coverImage: '/projects/foundyou.png',
  },
  {
    id: 'apolo',
    title: 'Apolo Evento',
    tagline: 'Sistema de venda de ingressos (TCC técnico)',
    description:
      'Sistema web de venda de ingressos e gestão de eventos, desenvolvido como TCC do curso técnico.',
    details: [
      'Cadastro de usuários, eventos e espaços',
      'Fluxo completo de compra de ingressos simulado',
      'Painel administrativo para gestão de eventos',
      'Stack PHP com MySQL',
      'TCC do curso técnico em Informática — COTIL/Unicamp',
    ],
    tags: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    liveUrl: 'https://apoloevento.great-site.net/apolo/public',
    githubUrl: null,
    gradient: 'from-amber-500 to-yellow-600',
    featured: false,
    coverImage: '/projects/apolo.png',
  },
]

const CARD_W = 'w-[300px] sm:w-[328px]'
const CARD_H = 'h-[472px]'

function ProjectCard({
  project,
  onExpand,
}: {
  project: Project
  onExpand: () => void
}) {
  return (
    <motion.article
      onClick={onExpand}
      className={`group relative cursor-pointer snap-start shrink-0 ${CARD_W} ${CARD_H} rounded-2xl overflow-hidden shadow-2xl shadow-black/40 hover:shadow-black/55 transition-shadow duration-300`}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      {/* Capa — imagem ou placeholder com mesmo tamanho */}
      <div className="relative h-[180px] w-full shrink-0 overflow-hidden bg-dark-800">
        {project.coverImage ? (
          <img
            src={project.coverImage}
            alt={`Capa do projeto ${project.title}`}
            className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-[1.04]"
            loading="lazy"
          />
        ) : (
          <div
            className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-[0.35]`}
            aria-hidden
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Corpo: título → descrição → tags → rodapé */}
      <div className="relative flex min-h-0 h-[calc(100%-180px)] flex-col bg-white/[0.03] px-5 pt-8 pb-4 sm:pt-9">
        {project.featured && (
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-400/80 mb-3">
            ★ Destaque
          </span>
        )}

        <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 tracking-tight">
          {project.title}
        </h3>
        <br></br>
        <p className="mt-3 text-sm text-gray-400 leading-[1.65] line-clamp-3">
          {project.tagline}
        </p>

        <div className="mt-7 flex flex-wrap gap-2 shrink-0 items-start">
          {project.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full text-[10px] text-gray-400 bg-white/[0.03] ring-1 ring-white/15"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Ocupa o espaço livre para manter ícones colados na base do card */}
        <div className="min-h-0 flex-1 shrink-0" aria-hidden />

        <div className="flex shrink-0 items-center justify-between gap-3 pt-5">
          <div className="flex items-center gap-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Abrir site do projeto"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-gray-300 hover:bg-accent-500/25 hover:text-accent-300 transition-all"
              >
                <HiExternalLink className="w-5 h-5" />
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                aria-label="Ver código no GitHub"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/[0.07] text-gray-300 hover:bg-white/[0.14] hover:text-white transition-all"
              >
                <FaGithub className="w-5 h-5" />
              </a>
            )}
          </div>
          <button
            type="button"
            className="flex items-center gap-1 text-xs text-gray-500 group-hover:text-accent-400 transition-colors shrink-0 pr-0.5"
          >
            Detalhes
            <HiChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </motion.article>
  )
}

function ProjectModal({
  project,
  onClose,
}: {
  project: Project
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-10 bg-black/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-dark-900 shadow-2xl overscroll-contain"
      >
        {project.coverImage ? (
          <div className="relative h-40 sm:h-48 w-full overflow-hidden rounded-t-3xl shrink-0">
            <img
              src={project.coverImage}
              alt={`Capa do projeto ${project.title}`}
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent" />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 rounded-xl text-white hover:bg-white/15 bg-black/40 backdrop-blur-sm transition-all"
              aria-label="Fechar"
            >
              <HiX className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="relative rounded-t-3xl overflow-hidden">
            <div className={`h-1.5 w-full bg-gradient-to-r ${project.gradient}`} />
            <div className="flex justify-end px-6 pt-4 pb-1">
              <button
                onClick={onClose}
                className="p-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/[0.08] transition-all"
                aria-label="Fechar"
              >
                <HiX className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        <div className="px-7 sm:px-11 pb-12 sm:pb-16 pt-2">
          {project.role && (
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="text-xs font-mono uppercase tracking-wider text-gray-500">
                {project.role}
              </span>
              {project.period && (
                <span className="text-xs font-mono text-accent-400/80">{project.period}</span>
              )}
            </div>
          )}

          <h2 className="text-2xl sm:text-3xl font-semibold text-white mb-3">{project.title}</h2>
          <p className="text-base sm:text-lg text-gray-300 mb-8 leading-relaxed">{project.tagline}</p>

          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              Sobre o projeto
            </h3>
            <p className="text-gray-400 leading-[1.9] text-base">{project.description}</p>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              Destaques técnicos
            </h3>
            <ul className="space-y-3.5">
              {project.details.map((detail, i) => (
                <li key={i} className="flex items-start gap-3.5 text-gray-400 leading-relaxed">
                  <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-accent-500 mt-2" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-4">
              Stack
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 rounded-full text-sm text-gray-400 bg-white/[0.04]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-white/[0.06] space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-1">
              Acesso rápido
            </h3>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[4.5rem] flex-1 min-w-[min(100%,16rem)] items-center gap-4 rounded-2xl bg-white/[0.06] px-5 py-4 transition-all hover:bg-accent-500/15 hover:ring-2 hover:ring-accent-400/40"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-accent-500/20 text-accent-300 group-hover:bg-accent-500/30 group-hover:scale-105 transition-transform">
                    <HiExternalLink className="h-7 w-7" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-base font-semibold text-white">
                      Abrir domínio
                    </span>
                    <span className="mt-1 block truncate text-sm text-gray-400 group-hover:text-gray-300">
                      {hostnameFromUrl(project.liveUrl)}
                    </span>
                  </span>
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-[4.5rem] flex-1 min-w-[min(100%,16rem)] items-center gap-4 rounded-2xl bg-white/[0.06] px-5 py-4 transition-all hover:bg-white/[0.1] hover:ring-2 hover:ring-white/20"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/[0.08] text-gray-200 group-hover:bg-white/[0.14] group-hover:scale-105 transition-transform">
                    <FaGithub className="h-7 w-7" />
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-base font-semibold text-white">
                      Repositório
                    </span>
                    <span className="mt-1 block truncate text-sm text-gray-400 group-hover:text-gray-300">
                      {hostnameFromUrl(project.githubUrl)}
                    </span>
                  </span>
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <>
      <section id="projects" className="layout-section">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <div className="layout-page-inner layout-heading-block--tight">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="text-accent-400 font-mono text-xs sm:text-sm tracking-widest uppercase"
            >
              Meu trabalho
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-semibold text-white mt-4 mb-4"
            >
              Projetos
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35 }}
              className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl mb-3"
            >
              Clique em qualquer card para ver detalhes técnicos, stack completa e links.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500"
            >
              <span className="text-accent-400/90" aria-hidden>
                ↔{' '}
              </span>
              Deslize horizontalmente para ver mais projetos.
            </motion.p>
          </div>

          <div className="relative">
            <div className="absolute right-0 top-0 bottom-6 w-16 sm:w-24 bg-gradient-to-l from-dark-900 to-transparent z-10 pointer-events-none" />

            <div
              className="projects-scroll flex gap-6 overflow-x-auto pb-3 pt-1 pl-6 sm:pl-10 lg:pl-14 pr-6 sm:pr-10 lg:pr-14 snap-x snap-mandatory"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.07 }}
                >
                  <ProjectCard
                    project={project}
                    onExpand={() => setSelectedProject(project)}
                  />
                </motion.div>
              ))}
              <div className="shrink-0 w-10" aria-hidden />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.85 }}
            className="layout-page-inner mt-14 sm:mt-16"
          >
            <a
              href="https://github.com/gustavopoffo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm text-gray-400 hover:text-white bg-white/[0.03] hover:bg-white/[0.06] transition-all"
            >
              <FaGithub size={18} />
              Ver perfil completo no GitHub
            </a>
          </motion.div>
        </motion.div>
      </section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </>
  )
}
