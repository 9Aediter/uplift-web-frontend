"use client"
import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaRocket, FaCode, FaMobile, FaCloud, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'
import Link from 'next/link'
import { motion } from 'framer-motion';

const Footer = () => {
  const socialLinks = [
    { href: "#", icon: FaGithub, label: "GitHub" },
    { href: "#", icon: FaTwitter, label: "Twitter" },
    { href: "#", icon: FaLinkedin, label: "LinkedIn" },
    { href: "#", icon: FaEnvelope, label: "Email" },
  ];

  const services = [
    { name: "Web Development", icon: FaCode, href: "#" },
    { name: "Mobile Apps", icon: FaMobile, href: "#" },
    { name: "Cloud Solutions", icon: FaCloud, href: "#" },
    { name: "Custom Software", icon: FaRocket, href: "#" },
  ];

  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Team", href: "#" },
    { name: "Blog", href: "#" },
  ];

  const projectLinks = [
    { name: "Portfolio", href: "#" },
    { name: "Case Studies", href: "#" },
    { name: "Testimonials", href: "#" },
    { name: "Success Stories", href: "#" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "#" },
    { name: "Support", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Guides", href: "#" },
  ];

  const legalLinks = [
    { name: "Terms of Service", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Cookie Policy", href: "#" },
    { name: "Data Protection", href: "#" },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-12"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent -rotate-12"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center space-x-2 mb-4">
                
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-500 bg-clip-text text-transparent">
                  UPLIFT TECHNOLOGY CO., LTD.
                </span>
              </div>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Building the future, one line of code at a time. We transform ideas into innovative digital solutions that empower businesses worldwide.
              </p>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <FaEnvelope className="text-blue-500" />
                  <span>uplifttechbiz@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <FaPhone className="text-blue-500" />
                  <span>+66 (093) 130-4223</span>
                </div>
                <div className="flex items-center space-x-3 text-muted-foreground">
                  <FaMapMarkerAlt className="text-blue-500" />
                  <span>Bangkok, Thailand</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4 pt-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-muted hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 group"
                    whileHover={{ scale: 1.1 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <social.icon className="text-muted-foreground group-hover:text-white transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-foreground font-bold text-lg mb-6 flex items-center">
              <FaCode className="mr-2 text-blue-500" />
              Services
            </h3>
            <div className="space-y-3">
              {services.map((service) => (
                <Link
                  key={service.name}
                  href={service.href}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-blue-500 transition-colors group"
                >
                  <service.icon className="text-sm group-hover:text-blue-500" />
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
            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Company</h3>
            <div className="space-y-3">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Projects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Projects</h3>
            <div className="space-y-3">
              {projectLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Resources & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Resources</h3>
              <div className="space-y-3">
                {resourceLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-gray-900 dark:text-white font-bold text-lg mb-6">Legal</h3>
              <div className="space-y-3">
                {legalLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="block text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="border-t border-gray-200 dark:border-gray-800 pt-8 mt-12"
        >
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-600 dark:text-gray-400 text-center md:text-left">
              © {new Date().getFullYear()} Uplift Technology. All rights reserved.
              <span className="mx-2">•</span>
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Crafted with ❤️ in Thailand
              </span>
            </p>

            {/* Terminal Command */}
            <div className="bg-gray-100 dark:bg-gray-900/50 border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 font-mono text-sm">
              <span className="text-green-600 dark:text-green-400">$</span>
              <span className="text-blue-600 dark:text-blue-400 ml-2">npm install</span>
              <span className="text-purple-600 dark:text-purple-400 ml-1">@uplift/innovation</span>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
export default Footer
