import React from "react";
import Nav from "@/components/basic/nav/resnav";
import Footer from "@/components/layout/footer/footer";
// import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Mail, Github, Linkedin, CheckCircle } from 'lucide-react';
import CertificateCarousel from '@/components/team/certificate-carousel';
import { notFound } from 'next/navigation';

import type { TeamMember } from '@/types/models/team';
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

interface TeamMemberPageProps {
    params: Promise<{ lang: string; slug: string }>;
}

export async function generateMetadata({ params }: TeamMemberPageProps) {
    const resolvedParams = await params;
    const { lang } = await params;
    const teamsData = await getTeamsData(lang);

    const member = teamsData.team.find((m: TeamMember) => m.id === resolvedParams.slug);

    if (!member) {
        return {
            title: 'Team Member Not Found | UPLIFT',
            description: 'The requested team member profile could not be found.',
        };
    }

    return {
        title: `${member.name} - ${member.position} | UPLIFT`,
        description: member.bio,
    };
}

const TeamMemberPage = async ({ params }: TeamMemberPageProps) => {
    const resolvedParams = await params;
    const { lang } = await params;
    const teamsData = await getTeamsData(lang);

    const member = teamsData.team.find((m: TeamMember) => m.id === resolvedParams.slug);

    if (!member) {
        notFound();
    }

    // Mock projects data for the member
    const projects = [
        {
            title: lang === 'th' ? 'ระบบ ERP สำหรับโรงงาน' : 'Factory ERP System',
            description: lang === 'th' ? 'พัฒนาระบบ ERP ครบวงจรสำหรับโรงงานผลิต' : 'Developed comprehensive ERP system for manufacturing',
            tech: ['React', 'Node.js', 'PostgreSQL'],
            status: lang === 'th' ? 'เสร็จสิ้น' : 'Completed'
        },
        {
            title: lang === 'th' ? 'แอป POS สำหรับร้านอาหาร' : 'Restaurant POS App',
            description: lang === 'th' ? 'สร้างแอปพลิเคชัน POS สำหรับร้านอาหาร' : 'Built POS application for restaurant chains',
            tech: ['Flutter', 'Firebase', 'Dart'],
            status: lang === 'th' ? 'กำลังดำเนินการ' : 'In Progress'
        }
    ];

    return (
        <>
            <Nav />
            <main className="relative w-full overflow-x-hidden">
                {/* Back Button */}
                <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <div className="max-w-6xl mx-auto px-4 py-4">
                        <Link href="/teams" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            {lang === 'th' ? 'กลับไปหน้าทีม' : 'Back to Team'}
                        </Link>
                    </div>
                </div>

                {/* Hero Section */}
                <section className="relative py-24 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                            {/* Profile Image */}
                            <div className="lg:col-span-1">
                                <div className="relative">
                                    <div className="w-80 h-80 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                                        <div className="w-48 h-48 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-6xl font-bold">
                                            {member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Info */}
                            <div className="lg:col-span-2">
                                <div className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
                                    {member.department}
                                </div>

                                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">
                                    {member.name}
                                </h1>

                                <p className="text-2xl text-blue-600 dark:text-blue-400 font-semibold mb-6">
                                    {member.position}
                                </p>

                                <p className="text-lg text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
                                    {member.bio}
                                </p>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {member.experience}
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-400">
                                            {lang === 'th' ? 'ประสบการณ์' : 'Experience'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {member.certifications.length}
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-400">
                                            {lang === 'th' ? 'ใบรับรอง' : 'Certifications'}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-2xl font-bold text-slate-900 dark:text-white">
                                            {member.languages.length}
                                        </div>
                                        <div className="text-slate-600 dark:text-slate-400">
                                            {lang === 'th' ? 'ภาษา' : 'Languages'}
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex space-x-4">
                                    {member.social.github && (
                                        <a href={member.social.github} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:bg-slate-800 dark:hover:bg-slate-600 transition-colors">
                                            <Github className="h-5 w-5 mr-2" />
                                            GitHub
                                        </a>
                                    )}
                                    {member.social.linkedin && (
                                        <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                                            <Linkedin className="h-5 w-5 mr-2" />
                                            LinkedIn
                                        </a>
                                    )}
                                    {member.social.email && (
                                        <a href={`mailto:${member.social.email}`}
                                            className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                            <Mail className="h-5 w-5 mr-2" />
                                            {lang === 'th' ? 'ติดต่อ' : 'Contact'}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Skills & Expertise */}
                <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            {/* Skills */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                                    {lang === 'th' ? 'ทักษะเฉพาะด้าน' : 'Technical Skills'}
                                </h2>
                                <div className="grid grid-cols-1 gap-3">
                                    {member.skills.map((skill: string, index: number) => (
                                        <div key={index} className="flex items-center space-x-3">
                                            <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                                            <span className="text-slate-700 dark:text-slate-300">{skill}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Specialties */}
                            <div>
                                <h2 className="text-2xl font-bold mb-6 text-slate-900 dark:text-white">
                                    {lang === 'th' ? 'ความเชี่ยวชาญ' : 'Specialties'}
                                </h2>
                                <div className="space-y-4">
                                    {member.specialties.map((specialty: string, index: number) => (
                                        <div key={index} className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                                            <span className="text-slate-800 dark:text-slate-200 font-medium">{specialty}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Certifications */}
                <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-blue-950/50" id="certifications">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                            {lang === 'th' ? 'ใบรับรองความสามารถ' : 'Professional Certifications'}
                        </h2>

                        <CertificateCarousel
                            certificates={member.certifications}
                            autoScrollInterval={4000}
                        />
                    </div>
                </section>

                {/* Projects */}
                <section className="py-16 bg-white dark:bg-slate-900">
                    <div className="max-w-6xl mx-auto px-4">
                        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
                            {lang === 'th' ? 'โปรเจกต์ที่เกี่ยวข้อง' : 'Recent Projects'}
                        </h2>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {projects.map((project, index) => (
                                <div key={index} className="bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-800 dark:to-blue-950/50 p-8 rounded-xl border border-slate-200 dark:border-slate-700">
                                    <div className="flex items-start justify-between mb-4">
                                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                            {project.title}
                                        </h3>
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${project.status === 'Completed' || project.status === 'เสร็จสิ้น'
                                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                                : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </div>

                                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                                        {project.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech, techIndex) => (
                                            <span key={techIndex} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm rounded-full">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Contact CTA */}
                <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="max-w-4xl mx-auto px-4 text-center text-white">
                        <h2 className="text-3xl font-bold mb-6">
                            {lang === 'th' ? `ต้องการติดต่อ ${member.name}?` : `Want to Connect with ${member.name}?`}
                        </h2>
                        <p className="text-xl opacity-90 mb-8">
                            {lang === 'th'
                                ? 'พร้อมให้คำปรึกษาและหารือเกี่ยวกับโปรเจกต์ของคุณ'
                                : 'Available for consultation and discussion about your projects'
                            }
                        </p>
                        {member.social.email && (
                            <a href={`mailto:${member.social.email}`}
                                className="inline-flex items-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                <Mail className="h-5 w-5 mr-2" />
                                {lang === 'th' ? 'ส่งอีเมล' : 'Send Email'}
                            </a>
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
};

export default TeamMemberPage;