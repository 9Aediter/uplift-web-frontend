import React from "react";
import { ArrowRight, Mail, Smartphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const ContactSection = () => {
    return (
        <section className="bg-background py-16 md:py-24 text-white" id="contact">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center mb-16 reveal">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        See <span className="text-[#007AFF]">Repp</span> in Action — Book
                        Your Free Demo
                    </h2>
                    <p className="text-xl text-gray-300">
                        No commitment. We&apos;ll walk you through everything.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-12">
                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 md:p-10 reveal">
                        <form className="space-y-6">
                            <div>
                                <label
                                    htmlFor="gym-name"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                    Gym Name
                                </label>
                                <Input
                                    type="text"
                                    id="gym-name"
                                    placeholder="Your gym's name"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="contact-person"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                    Contact Person
                                </label>
                                <Input
                                    type="text"
                                    id="contact-person"
                                    placeholder="Your name"
                                />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-gray-300 mb-1"
                                    >
                                        Phone Number
                                    </label>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        placeholder="Your phone number"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="line-id"
                                        className="block text-sm font-medium text-gray-300 mb-1"
                                    >
                                        LINE ID (optional)
                                    </label>
                                    <Input
                                        type="text"
                                        id="line-id"
                                        placeholder="Your LINE ID"
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="preferred-time"
                                    className="block text-sm font-medium text-gray-300 mb-1"
                                >
                                    Preferred Time to Contact
                                </label>
                                <Select>
                                    <SelectTrigger id="preferred-time">
                                        <SelectValue placeholder="Select a time range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="morning">Morning (9AM - 12PM)</SelectItem>
                                        <SelectItem value="afternoon">Afternoon (12PM - 5PM)</SelectItem>
                                        <SelectItem value="evening">Evening (5PM - 8PM)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    className="w-full"
                                >
                                    Book Your Free Demo
                                    <ArrowRight size={18} className="ml-2" />
                                </Button>
                            </div>
                        </form>
                    </div>
                    <div className="flex flex-col justify-center reveal">
                        <div className="mb-8">
                            <h3 className="text-2xl font-semibold mb-4">
                                Ready to transform your gym?
                            </h3>
                            <p className="text-gray-300 mb-6">
                                Our team is ready to show you how Repp can streamline your
                                operations, enhance member experience, and boost your revenue.
                            </p>
                            <div className="space-y-4">
                                <div className="flex items-center">
                                    <div className="bg-[#007AFF]/20 p-3 rounded-full mr-4">
                                        <Smartphone size={24} className="text-[#007AFF]" />
                                    </div>
                                    <span>+66 (093) 130-4223</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="bg-[#007AFF]/20 p-3 rounded-full mr-4">
                                        <Mail size={24} className="text-[#007AFF]" />
                                    </div>
                                    <span>contact@uplifttech.dev</span>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white/10 p-6 rounded-xl backdrop-blur-md">
                            <h4 className="font-semibold mb-3">Scan to chat on LINE</h4>
                            <div className="bg-white p-4 rounded-lg inline-block">
                                <div className="w-32 h-32 bg-gray-200">
                                    {/* Placeholder for QR code - in a real implementation, this would be an actual QR code image */}
                                    <div className="w-full h-full flex items-center justify-center bg-[#007AFF]/10">
                                        <span className="text-[#1F1F1F] text-xs text-center">
                                            LINE QR Code
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-3 text-sm text-gray-300">
                                Scan with your LINE app to start a conversation with our team
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};


export default ContactSection;