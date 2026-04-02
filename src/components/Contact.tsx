import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { HiMail, HiPhone, HiLocationMarker, HiExternalLink } from 'react-icons/hi'

const contactInfo = [
  {
    icon: HiMail,
    label: 'Email',
    value: 'gustavopoffo022@gmail.com',
    href: 'mailto:gustavopoffo022@gmail.com',
  },
  {
    icon: HiPhone,
    label: 'WhatsApp',
    value: '(19) 98218-0232',
    href: 'https://wa.me/5519982180232',
  },
  {
    icon: HiLocationMarker,
    label: 'Localização',
    value: 'São Carlos, SP',
    href: null,
  },
]

export default function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="contact" className="layout-section layout-section--contact">
      <div className="layout-page-inner">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <div className="layout-heading-block max-w-xl space-y-5">
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.2 }}
              className="block text-accent-400 font-mono text-xs sm:text-sm tracking-widest uppercase"
            >
              Vamos conversar
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-4xl font-semibold text-white"
            >
              Entre em contato
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-sm sm:text-base leading-relaxed"
            >
              Estou aberto a novas oportunidades. Use o e-mail ou o WhatsApp abaixo — respondo o quanto
              antes.
            </motion.p>
          </div>

          {/* Disponibilidade */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="mb-20 sm:mb-24 lg:mb-28"
          >
            <div className="flex items-start gap-4 sm:gap-5">
              <span className="relative flex h-2.5 w-2.5 shrink-0 mt-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
              </span>
              <div className="space-y-2">
                <p className="text-emerald-400 font-medium text-sm sm:text-base">
                  Disponível para oportunidades
                </p>
                <p className="text-gray-500 text-sm sm:text-base leading-relaxed">
                  Buscando estágio em desenvolvimento de software para atuar na construção de
                  aplicações escaláveis e orientadas a produto.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Canais diretos — grade */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55 }}
            className="pt-2"
          >
            <p className="text-xs font-mono uppercase tracking-widest text-gray-600 mb-9 sm:mb-10">
              Canais diretos
            </p>
            <div className="grid gap-10 sm:gap-12 sm:grid-cols-3">
              {contactInfo.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.06 }}
                  className="flex flex-col gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-500/15 to-purple-500/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-5 h-5 text-accent-400" />
                  </div>
                  <div className="space-y-2 min-w-0">
                    <p className="text-xs font-mono uppercase tracking-wider text-gray-600">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        {...(item.href.startsWith('http')
                          ? { target: '_blank', rel: 'noopener noreferrer' }
                          : {})}
                        className="text-white hover:text-accent-400 transition-colors text-sm sm:text-[0.9375rem] font-medium break-words leading-snug inline-flex items-start gap-1.5 group"
                      >
                        <span>{item.value}</span>
                        <HiExternalLink className="w-3.5 h-3.5 shrink-0 mt-0.5 opacity-50 group-hover:opacity-100" />
                      </a>
                    ) : (
                      <p className="text-white text-sm sm:text-[0.9375rem] font-medium leading-snug">
                        {item.value}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
