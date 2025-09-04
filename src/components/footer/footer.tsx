"use client"
import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaRocket, FaCode, FaMobile, FaCloud, FaPhone, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { href: "#", icon: FaGithub, label: "GitHub" },
    { href: "#", icon: FaTwitter, label: "Twitter" },
    { href: "#", icon: FaLinkedin, label: "LinkedIn" },
    { href: "https://www.fastwork.co/user/uplifttech", icon: FaBriefcase, label: "Fastwork" },
    { href: "mailto:uplifttechbiz@gmail.com", icon: FaEnvelope, label: "Email" },
  ];

  const services = [
    { name: "Web Development", icon: FaCode, href: "#" },
    { name: "Mobile Apps", icon: FaMobile, href: "#" },
    { name: "Cloud Solutions", icon: FaCloud, href: "#" },
    { name: "Custom Software", icon: FaRocket, href: "#" },
  ];

  const companyLinks = [
    { name: "About Us", href: "/story" },
    { name: "Company", href: "/company" },
    { name: "Team", href: "/teams" },
    { name: "Contact", href: "/consult" },
  ];

  const innovationLinks = [
    { name: "ERP Systems", href: "/innovation/erp-management" },
    { name: "POS Solutions", href: "/innovation/pos-restaurant" },
    { name: "Laundry Management", href: "/innovation/laundry-system" },
    { name: "Hotel Booking", href: "/innovation/hotel-booking" },
    { name: "Gym Management", href: "/innovation/gym-system" },
    { name: "WMS & Logistics", href: "/innovation/wms-logistics" },
  ];

  const resourceLinks = [
    { name: "Services", href: "/services" },
    { name: "Consultation", href: "/consult" },
    { name: "Support", href: "/support" },
    { name: "Blog", href: "/blogs" },
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "/legal/terms" },
    { name: "Privacy Policy", href: "/legal/privacy" },
    { name: "Cookie Policy", href: "/legal/cookies" },
    { name: "Data Protection", href: "/legal/data-protection" },
  ];

  return (
    <footer className="bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-t border-slate-200/50 dark:border-slate-800/50 text-slate-900 dark:text-slate-100 relative overflow-hidden">
      {/* Modern Gradient Background */}
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 dark:from-blue-950/20 dark:via-transparent dark:to-purple-950/20"></div>
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-16">
          {/* Company Info - Modern Redesign */}
          <div className="lg:col-span-3 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Company Brand */}
              <div className="mb-8">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                    <FaRocket className="text-white text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">UPLIFT</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Technology Company</p>
                  </div>
                </div>
                
                <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-8">
                  Transform your business with cutting-edge technology solutions. We specialize in building scalable, innovative systems that drive growth and efficiency.
                </p>
              </div>

              {/* Contact Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider">Contact</h4>
                  <div className="space-y-3">
                    <a href="mailto:uplifttechbiz@gmail.com" className="flex items-center space-x-3 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group">
                      <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                        <FaEnvelope className="text-blue-600 dark:text-blue-400 group-hover:text-white text-sm" />
                      </div>
                      <span className="text-sm">uplifttechbiz@gmail.com</span>
                    </a>
                    <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                      <div className="w-8 h-8 bg-green-100 dark:bg-green-900/20 rounded-lg flex items-center justify-center">
                        <FaPhone className="text-green-600 dark:text-green-400 text-sm" />
                      </div>
                      <span className="text-sm">+66 (093) 130-4223</span>
                    </div>
                    <div className="flex items-center space-x-3 text-slate-600 dark:text-slate-400">
                      <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center">
                        <FaMapMarkerAlt className="text-purple-600 dark:text-purple-400 text-sm" />
                      </div>
                      <span className="text-sm">Chonburi, Thailand</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider">Connect</h4>
                  <div className="grid grid-cols-3 gap-3">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-slate-100 dark:bg-slate-800/50 hover:bg-gradient-to-br hover:from-blue-500 hover:to-purple-600 rounded-xl flex items-center justify-center transition-all duration-300 group border border-slate-200 dark:border-slate-700"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 + index * 0.05 }}
                      >
                        <social.icon className="text-slate-600 dark:text-slate-400 group-hover:text-white transition-colors text-base" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Quick Links Grid */}
          <div className="lg:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Services */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider mb-6">
                Services
              </h4>
              <div className="space-y-3">
                {services.map((service) => (
                  <Link
                    key={service.name}
                    href={service.href}
                    className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors group text-sm"
                  >
                    <div className="w-5 h-5 bg-slate-200 dark:bg-slate-700 rounded-md flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                      <service.icon className="text-xs text-slate-500 dark:text-slate-400 group-hover:text-white" />
                    </div>
                    <span>{service.name}</span>
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Company */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider mb-6">Company</h4>
              <div className="space-y-3">
                {companyLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Innovation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider mb-6">Innovation</h4>
              <div className="space-y-3">
                {innovationLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>

            {/* Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-4"
            >
              <h4 className="font-semibold text-slate-900 dark:text-slate-100 text-sm uppercase tracking-wider mb-6">Resources</h4>
              <div className="space-y-3">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Legal Links Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-slate-200/60 dark:border-slate-700/60 pt-8 mb-8"
        >
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {legalLinks.map((link, index) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Bottom Bar - Modern Design */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="border-t border-slate-200/60 dark:border-slate-700/60 pt-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0 gap-6">
            <div className="flex flex-col sm:flex-row items-center gap-4 text-center lg:text-left">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                © {new Date().getFullYear()} UPLIFT TECHNOLOGY CO., LTD. All rights reserved.
              </p>
              <div className="hidden sm:block w-px h-4 bg-slate-300 dark:bg-slate-600"></div>
              <p className="text-sm">
                <span className="text-slate-500 dark:text-slate-400">Made with</span>
                <span className="mx-1 text-red-500">❤️</span>
                <span className="text-slate-500 dark:text-slate-400">in</span>
                <span className="ml-1 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent font-semibold">Thailand</span>
              </p>
            </div>

            {/* Modern Terminal Style */}
            <div className="bg-slate-900 dark:bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 font-mono text-sm shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
                <span className="text-green-400 ml-2">~$</span>
                <span className="text-blue-400">pnpm</span>
                <span className="text-white">create</span>
                <span className="text-purple-400">@uplift/project</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
export default Footer
