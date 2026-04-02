import { motion } from 'framer-motion'
import { FaGithub, FaLinkedin, FaHeart } from 'react-icons/fa'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="layout-footer">
      <div className="layout-page-inner">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 text-gray-500 text-sm"
          >
            <span>Feito com</span>
            <FaHeart className="text-red-500/80" size={14} />
            <span>por</span>
            <span className="text-gray-300 font-medium">Gustavo Poffo</span>
            <span className="text-gray-600">• {currentYear}</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-5"
          >
            <a
              href="https://github.com/gustavopoffo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/gustavo-poffo"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-white transition-colors"
            >
              <FaLinkedin size={20} />
            </a>
          </motion.div>
        </div>
      </div>
    </footer>
  )
}
