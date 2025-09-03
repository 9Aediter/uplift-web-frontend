import React from "react";
import Nav from "@/components/nav/resnav";
import Footer from "@/components/footer/footer";
import { headers } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Mail, Github, Linkedin, Award, Globe, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react';



// Dynamic import of team data
const getTeamsData = async (locale: string) => {
    try {
        const teamsData = await import(`@/data/teams/${locale}.json`);
        return teamsData.default;
    } catch {
        // Fallback to English if locale file doesn't exist
        const teamsData = await import(`@/data/teams/en.json`);
        return teamsData.default;
    }
};

export async function generateMetadata() {
    const headersList = await headers();
    const locale = headersList.get('x-next-locale') || 'en';
    const teamsData = await getTeamsData(locale);

    return {
        title: teamsData.title,
        description: teamsData.description,
    };
}

const TeamsPage = async () => {
    const headersList = await headers();
    const locale = headersList.get('x-next-locale') || 'en';
    const teamsData = await getTeamsData(locale);
    

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-x-hidden">
                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
                    <div className="max-w-6xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center justify-center p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-8">
                            <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            {teamsData.hero.title}
                        </h1>

                        <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
                            {teamsData.hero.subtitle}
                        </p>

                        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-3xl mx-auto">
                            {teamsData.hero.description}
                        </p>
                    </div>
                </section>

                {/* Stats Section */}
                {/* <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                            {teamsData.stats.map((stat, index) => (
                                <div key={index} className="text-center">
                                    <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                                        {stat.label}
                                    </div>
                                    <div className="text-sm text-slate-500 dark:text-slate-400">
                                        {stat.description}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Team Members */}
                {/* <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/50">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900 dark:text-white">
                                {locale === 'th' ? 'ทีมงานของเรา' : 'Our Team'}
                            </h2>
                            <p className="text-lg text-slate-600 dark:text-slate-300">
                                {locale === 'th'
                                    ? 'พบกับผู้เชี่ยวชาญที่มีประสบการณ์และความหลงใหลในการสร้างนวัตกรรม'
                                    : 'Meet the experts who are experienced and passionate about creating innovations'
                                }
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                            {teamsData.team.map((member, index) => (
                                <div key={member.id} className="group bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                                    
                                    <div className="relative h-64 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                                                {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                                            </div>
                                        </div>

                                        
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1 bg-white/90 dark:bg-slate-800/90 rounded-full text-xs font-medium text-slate-700 dark:text-slate-300">
                                                {member.department}
                                            </span>
                                        </div>
                                    </div>

                                    
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                                            {member.name}
                                        </h3>
                                        <p className="text-blue-600 dark:text-blue-400 font-medium mb-3">
                                            {member.position}
                                        </p>
                                        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
                                            {member.bio}
                                        </p>

                                        
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {member.skills.slice(0, 3).map((skill, idx) => (
                                                <span key={idx} className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded text-slate-600 dark:text-slate-400">
                                                    {skill}
                                                </span>
                                            ))}
                                            {member.skills.length > 3 && (
                                                <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-xs rounded text-slate-600 dark:text-slate-400">
                                                    +{member.skills.length - 3}
                                                </span>
                                            )}
                                        </div>

                                        
                                        <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                                            <Clock className="h-4 w-4 mr-2" />
                                            {member.experience}
                                        </div>

                                        
                                        <div className="flex items-center justify-between">
                                            <div className="flex space-x-2">
                                                {member.social.github && (
                                                    <a href={member.social.github} target="_blank" rel="noopener noreferrer"
                                                        className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                                        <Github className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                                    </a>
                                                )}
                                                {member.social.linkedin && (
                                                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                                                        className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                                        <Linkedin className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                                    </a>
                                                )}
                                                {member.social.email && (
                                                    <a href={`mailto:${member.social.email}`}
                                                        className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
                                                        <Mail className="h-4 w-4 text-slate-600 dark:text-slate-400" />
                                                    </a>
                                                )}
                                            </div>

                                            <Link href={`/teams/${member.id}`}
                                                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium group-hover:translate-x-1 transition-transform">
                                                {locale === 'th' ? 'ดูรายละเอียด' : 'View Profile'}
                                                <ArrowRight className="h-4 w-4 ml-1" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section> */}

                {/* Join Our Team CTA - Enhanced from home page */}
                <section className="relative py-24 bg-background overflow-hidden">
                    {/* Animated background patterns */}
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted to-background"></div>

                        {/* Glowing tech lines */}
                        <div className="absolute inset-0 opacity-30">
                            <div className="absolute top-1/4 left-1/4 w-48 sm:w-72 md:w-96 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent rotate-45 animate-pulse"></div>
                            <div className="absolute top-3/4 right-1/4 w-40 sm:w-64 md:w-80 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent -rotate-45 animate-pulse delay-1000"></div>
                            <div className="absolute top-1/2 left-1/2 w-32 sm:w-48 md:w-64 h-0.5 bg-gradient-to-r from-transparent via-cyan-500 to-transparent rotate-90 animate-pulse delay-2000"></div>
                        </div>

                        {/* Abstract geometric shapes */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-16 sm:w-24 md:w-32 h-16 sm:h-24 md:h-32 border border-blue-500 rounded-full animate-spin-slow"></div>
                            <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-12 sm:w-18 md:w-24 h-12 sm:h-18 md:h-24 border border-purple-500 rounded-lg rotate-45 animate-bounce-slow"></div>
                            <div className="absolute top-1/2 right-10 sm:right-20 md:right-40 w-8 sm:w-12 md:w-16 h-8 sm:h-12 md:h-16 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-full animate-pulse"></div>
                        </div>
                    </div>

                    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6">
                        {/* Main CTA Card */}
                        <div className="relative bg-gray-900 dark:bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 lg:p-16 shadow-2xl shadow-black/20 mx-auto max-w-5xl overflow-hidden">
                            {/* Metallic sheen overlay */}
                            <div className="absolute inset-0 dark:hidden pointer-events-none rounded-2xl sm:rounded-3xl" />

                            <div className="relative z-10 text-center space-y-6 sm:space-y-8">
                                {/* Headline */}
                                <div className="space-y-3 sm:space-y-4">
                                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white dark:text-gray-900 leading-tight px-2 sm:px-0">
                                        {locale === 'th' ? 'ร่วมสร้าง' : 'Join Us to Build'}{" "}
                                        <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 dark:from-blue-600 dark:via-purple-600 dark:to-cyan-600 bg-clip-text text-transparent">
                                            {locale === 'th' ? 'นวัตกรรม' : 'Innovation'}
                                        </span>
                                        <br />
                                        {locale === 'th' ? 'ไปด้วยกัน' : 'Together'}
                                    </h2>

                                    <p className="text-base sm:text-lg md:text-xl text-neutral-300 dark:text-gray-700 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0">
                                        {locale === 'th'
                                            ? 'เรามองหาคนเก่งที่พร้อมสร้างนวัตกรรมและเติบโตไปด้วยกัน ร่วมเป็นส่วนหนึ่งของทีมที่กำลังเปลี่ยนแปลงโลกเทคโนโลยี'
                                            : 'We\'re looking for talented individuals ready to innovate and grow with us. Join a team that\'s changing the world of technology'
                                        }
                                    </p>
                                </div>

                                {/* CTA Buttons */}
                                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 sm:px-0">
                                    <a
                                        href="mailto:careers@uplifttechbiz.com"
                                        className="w-full sm:w-auto bg-white dark:bg-gray-900 text-gray-900 dark:text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg flex items-center justify-center space-x-2 sm:space-x-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl group min-w-0"
                                    >
                                        <Mail className="text-gray-900 dark:text-white group-hover:animate-bounce flex-shrink-0 h-5 w-5" />
                                        <span className="truncate">{locale === 'th' ? 'ส่งใบสมัคร' : 'Send Application'}</span>
                                        <ArrowRight className="group-hover:translate-x-1 transition-transform flex-shrink-0 h-5 w-5" />
                                    </a>

                                    <a
                                        href="mailto:uplifttechbiz@gmail.com"
                                        className="w-full sm:w-auto border-2 border-neutral-600 dark:border-gray-700 text-white dark:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg hover:border-white dark:hover:border-gray-900 hover:bg-white/10 dark:hover:bg-gray-900/10 transition-all duration-300 min-w-0"
                                    >
                                        <span className="truncate">{locale === 'th' ? 'สอบถามข้อมูลเพิ่มเติม' : 'Ask for More Info'}</span>
                                    </a>
                                </div>

                                {/* Trust indicators */}
                                <div className="pt-6 sm:pt-8 border-t border-neutral-700 dark:border-gray-300">
                                    <p className="text-sm text-neutral-400 dark:text-gray-600 mb-3 sm:mb-4 px-2 sm:px-0">
                                        {locale === 'th' ? 'เติบโตไปกับบริษัทเทคโนโลยีอันดับต้นของประเทศ' : 'Grow with Thailand\'s leading technology company'}
                                    </p>
                                    <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8">
                                        <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-neutral-500 dark:text-gray-500">REMOTE</div>
                                        <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-neutral-500 dark:text-gray-500">FLEXIBLE</div>
                                        <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-neutral-500 dark:text-gray-500">GROWTH</div>
                                        <div className="text-sm sm:text-base md:text-xl lg:text-2xl font-bold text-neutral-500 dark:text-gray-500">INNOVATION</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default TeamsPage;