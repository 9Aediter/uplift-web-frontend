"use client"
import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaBriefcase, FaFacebook, FaInstagram } from 'react-icons/fa'
import Link from 'next/link'

const Footer = () => {
  const socialLinks = [
    { href: "#", icon: FaGithub, label: "GitHub" },
    { href: "#", icon: FaTwitter, label: "Twitter" },
    { href: "#", icon: FaLinkedin, label: "LinkedIn" },
    { href: "#", icon: FaFacebook, label: "Facebook" },
    { href: "#", icon: FaInstagram, label: "Instagram" },
    { href: "https://www.fastwork.co/user/uplifttech", icon: FaBriefcase, label: "Fastwork" },
    { href: "mailto:uplifttechbiz@gmail.com", icon: FaEnvelope, label: "Email" },
  ];

  const companyLinks = [
    { name: "Story", href: "/story" },
    { name: "Service", href: "/service" },
    { name: "Innovation", href: "/innovation" },
    { name: "Solutions", href: "/solutions" },
    { name: "Vision", href: "/vision" },
    { name: "Consult", href: "/consult" },
  ];

  const legalLinks = [
    { name: "Privacy", href: "/legal/privacy" },
    { name: "Terms", href: "/legal/terms" },
    { name: "Cookies", href: "/legal/cookies" },
  ];

  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* Main Content - Single Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">

          {/* Brand + Contact */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">UPLIFT</h3>
            <p className="text-sm text-muted-foreground">
              Transform your business with cutting-edge technology solutions.
            </p>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>uplifttechbiz@gmail.com</p>
              <p>+66 (093) 130-4223</p>
              <p>Chonburi, Thailand</p>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {companyLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social + Legal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-sm">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-border hover:border-foreground rounded-lg flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 pt-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} UPLIFT TECHNOLOGY CO., LTD. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
