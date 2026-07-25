import {
    UserPlus,
    FileQuestion,
    ShieldX,
    AlertTriangle,
    ClipboardList,
    ShieldCheck,
    Bell, ChevronDown,
} from "lucide-react";

import {Cookies} from "@/components/Cookies.jsx";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {FeaturesShowcase} from '@/components/FeaturesShowcase.jsx'
import { useRef } from "react";
import {Disclosure, Transition} from "@headlessui/react";
import {Footer} from "@/components/Footer.jsx";
import Hero from "@/components/Hero.jsx";
import {BuildersCarousel} from "@/components/BuildersCarousel.jsx";


gsap.registerPlugin(ScrollTrigger);

const LandingPage = () => {
    const container = useRef();

    useGSAP(
        () => {
            gsap.from(".welcome", {
                duration: 2,
                opacity: 0,
                y: 40,
                ease: "power2.out",
            });

            gsap.utils.toArray(".problem-card").forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        once: true,
                    },
                    duration: 0.7,
                    opacity: 0,
                    y: 30,
                    ease: "power2.out",
                });
            });

            gsap.utils.toArray(".feature-card").forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        once: true,
                    },
                    duration: 0.7,
                    opacity: 0,
                    scale: 0.9,
                    ease: "power2.out",
                });
            });

            gsap.utils.toArray(".step-number").forEach((number) => {
                gsap.from(number, {
                    scrollTrigger: {
                        trigger: number,
                        start: "top 90%",
                        once: true,
                    },
                    duration: 0.8,
                    opacity: 0,
                    scale: 0,
                    ease: "back.out",
                });
            });

            gsap.utils.toArray(".step-card-content").forEach((card) => {
                gsap.from(card, {
                    scrollTrigger: {
                        trigger: card,
                        start: "top 90%",
                        once: true,
                    },
                    duration: 0.7,
                    opacity: 0,
                    y: 30,
                    ease: "power2.out",
                });
            });

            gsap.utils.toArray(".faq-section").forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        once: true,
                    },
                    duration: 0.7,
                    opacity: 0,
                    y: 30,
                    ease: "power2.out",
                });
            });

            gsap.utils.toArray(".contact-item").forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 90%",
                        once: true,
                    },
                    duration: 0.7,
                    opacity: 0,
                    y: 30,
                    ease: "power2.out",
                });
            });
        },
        { scope: container }
    );

    const steps = [
        {
            number: "1",
            icon: <UserPlus className="w-6 h-6 text-blue-600" />,
            title: "Register and Select University",
            description:
                "Register and select your university. Your dashboard is instantly configured for your institution.",
        },
        {
            number: "2",
            icon: <ClipboardList className="w-6 h-6 text-blue-600" />,
            title: "Navigate Your Clearance",
            description:
                "Follow personalized clearance checklist step by step. Every completed stage is recorded permanently on the blockchain.",
        },
        {
            number: "3",
            icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
            title: "Verify and Stay Safe",
            description:
                "Track your academic levels and grades. Institution verifies your documents instantly via blockchain. Stay informed with campus alerts and report safety concerns anonymously to create a secure environment for every student.",
        },
    ];

    const features = [
        {
            icon: <ClipboardList className="w-7 h-7 text-blue-600" />,
            title: "Smart Clearance Guide",
            description:
                "Step-by-step clearance guidance for every level and faculty. Know exactly what documents to bring, where to go, and what fees are legitimate before you leave home.",
        },
        {
            icon: <ShieldCheck className="w-7 h-7 text-blue-600" />,
            title: "Blockchain Document Verification",
            description:
                "Certificates hashed and stored permanently on the blockchain. Any institution can verify authenticity in seconds - no more verification delays on certificates.",
        },
        {
            icon: <Bell className="w-7 h-7 text-blue-600" />,
            title: "Campus Safety and Alerts",
            description:
                "Report any suspicious activity anonymously. Every incident is recorded on the blockchain - permanently, transparently, and without manipulation.",
        },
    ];

    const problems = [
        {
            icon: <FileQuestion className="w-8 h-8 text-blue-600" />,
            title: "Complicated Clearance",
            description:
                "Students waste weeks navigating confusing clearance processes and unnecessary back-and-forth.",
        },
        {
            icon: <ShieldX className="w-8 h-8 text-blue-600" />,
            title: "Fake Documents",
            description:
                "Document forgery and verification delays cost institutions and employers time and trust.",
        },
        {
            icon: <AlertTriangle className="w-8 h-8 text-blue-600" />,
            title: "Unsafe Campus",
            description:
                "Safety issues and scams go unreported, putting students at risk on campus.",
        },
    ];

    const faqs=[
        {
            question: "What is CampusFlow?",
            answer: "CampusFlow is a smart Campus Assistant platform that helps students navigate Clearance processes, verify academic documents, See academic results, " +
                "and document viewing - all powered by BlockChain "
        },
        {
            question: "Is CampusFlow free for Students?",
            answer: "Yes. Students can access all core features - Clearance guidance, document viewing and SOS Features.",
        },
        {
            question: "How Does Document Verification Works?",
            answer: `When a university issues a certificate, they upload and hashes on the blockchain.` +
                `Any Institution can verify that certificate instantly by pasting the document hash into the CampusFlow verification - no account required`
        },
        {
            question: "Can a verified document be faked or tampered with?",
            answer: "NO. Once a document hash is recorded on the blockchain it can not be altered, deleted or duplicated." +
                "Any change to the document - even a single character - produces a completely different hash, making tampering immediately detectable"
        },
        {
            question: "How Do I register on CampusFlow?",
            answer: "Visit CampusFlow registration page and select your university and register with your matric number and password." +
                "Your Dashboard is instantly configured for your specific institution."
        },
    ]


    return (
        <div className="min-h-screen bg-white" ref={container}>
            <Cookies/>
            <Navbar />

         <Hero/>

            <section className="problems-section relative py-16 sm:py-20 px-4 sm:px-8">
                <div className="absolute inset-0"
                     style={{
                         backgroundImage: 'radial-gradient(circle, rgb(173, 216, 230) 1px, transparent 1px)',
                         backgroundSize: '28px 28px'
                     }}
                />
                <div className="relative z-10 max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
                        The Problems We Solve
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {problems.map((problem, index) => (
                            <div
                                key={index}
                                className="problem-card border border-gray-200 rounded-2xl p-7 hover:shadow-2xl transition-all duration-300 hover:border-blue-300 group bg-white hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100/50 relative overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5 group-hover:to-blue-600/10 transition-all duration-300 pointer-events-none" />
                                <div className="relative z-10">
                                    <div className="bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-100 group-hover:shadow-lg transition-all duration-300 group-hover:scale-110">
                                        {problem.icon}
                                    </div>
                                    <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-blue-900 transition-colors duration-300">
                                        {problem.title}
                                    </h3>
                                    <p className="text-gray-600 group-hover:text-gray-800 text-sm leading-relaxed transition-colors duration-300">
                                        {problem.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="features" className="features-section relative bg-gray-50 py-16 sm:py-20 px-4 sm:px-8">
                <div className="absolute inset-0"
                     style={{
                         backgroundImage: 'radial-gradient(circle, rgb(173, 216, 230) 1px, transparent 1px)',
                         backgroundSize: '28px 28px'
                     }}
                />
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="text-center mb-12 sm:mb-14">
                        <span className="text-blue-600 text-sm sm:text-lg font-semibold uppercase tracking-widest">
                            What We Offer
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900 leading-tight">
                            Everything You Need In One Place
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                            CampusFlow brings together the tools every Nigerian university
                            student needs to navigate campus life confidently, stress-free,
                            and securely.
                        </p>
                    </div>


                </div>
                <FeaturesShowcase/>
            </section>

            <section className="problems-section relative py-16 sm:py-20 px-4 sm:px-8">
                <div className="absolute inset-0"
                     style={{
                         backgroundImage: 'radial-gradient(circle, rgb(173, 216, 230) 1px, transparent 1px)',
                         backgroundSize: '28px 28px'
                     }}
                />
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="text-center mb-12 sm:mb-14">
                        <span className="text-blue-600 text-sm sm:text-lg tracking-widest font-semibold uppercase">
                            Simple Process
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900">
                            How CampusFlow Works
                        </h2>
                        <p className="text-gray-600 mt-4 max-w-2xl mx-auto text-sm leading-relaxed">
                            Get started in minutes, no confusion, no stress, no unnecessary
                            back-and-forth
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="step-card flex flex-col items-center text-center">
                                <div className="step-number w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-full flex items-center justify-center font-bold text-3xl mb-6 shadow-xl hover:shadow-2xl transition-all duration-300 group-hover:scale-110 relative">
                                    {step.number}
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-transparent" />
                                </div>
                                <div className="step-card-content bg-white rounded-2xl p-7 w-full hover:shadow-2xl border border-gray-200 transition-all duration-300 group hover:border-blue-300 hover:bg-gradient-to-br hover:from-blue-50/80
                                hover:to-blue-100/40 relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-blue-600/0 group-hover:from-blue-600/5
                                     group-hover:to-blue-600/10 transition-all duration-300 pointer-events-none" />
                                    <div className="relative z-10">
                                        <div className="bg-blue-50 w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center group-hover:bg-blue-100
                                         transition-all duration-300 group-hover:shadow-lg">
                                            {step.icon}
                                        </div>
                                        <h3 className="group-hover:text-blue-900 font-bold text-gray-900 text-lg mb-2 transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="problems-section relative py-16 sm:py-20 px-4 sm:px-8">
                <div className="absolute inset-0"
                     style={{
                         backgroundImage: 'radial-gradient(circle, rgb(173, 216, 230) 1px, transparent 1px)',
                         backgroundSize: '28px 28px'
                     }}
                />
                <div className="relative z-10 max-w-7xl mx-auto">
                    <div className="text-center mb-12 sm:mb-14">
                        <span className="text-blue-600 text-sm sm:text-lg tracking-widest font-semibold uppercase">
                            Common Questions
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900 mb-3">
                            Frequently Asked Questions
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Everything you need to know about CampusFlow</p>
                    </div>

                        {faqs.map((faq, idx) => (
                            <Disclosure key={faq.question}>
                                {({open})=>(
                                    <div className="faq-section">
                                        <Disclosure.Button className="flex justify-between items-center w-full py-5 font-semibold border border-gray-200 px-6 text-left
                                       text-gray-800 hover:text-blue-600 transition-all duration-300 mb-3 rounded-2xl hover:border-blue-300 hover:shadow-lg hover:bg-blue-50 group relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 to-blue-50/0 group-hover:from-blue-50 group-hover:to-blue-50/50 transition-all duration-300 pointer-events-none" />
                                            <span className="relative z-10 text-base">{faq.question}</span>
                                            <ChevronDown className={`w-5 h-5 text-gray-600 transition-all duration-500 group-hover:text-blue-600 flex-shrink-0 relative z-10 ${open ? "rotate-180 text-blue-600":''}`}/>
                                        </Disclosure.Button>
                                  <Transition
                                  enter="transition ease-out duration-300"
                                  enterFrom="transform opacity-0 translate-y-4 max-h-0"
                                  enterTo="transform opacity-100 translate-y-0 max-h-96"
                                  leave="transition ease-in duration-200"
                                  leaveFrom="transform opacity-100 translate-y-0 max-h-96"
                                  leaveTo="transform opacity-0 translate-y-4 max-h-0"
                                  >
                                      <Disclosure.Panel className="py-5 px-6 leading-relaxed text-gray-700 bg-gradient-to-r from-blue-50/50 to-blue-50/20 rounded-xl mb-3 border border-blue-100/50 relative overflow-hidden">
                                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/5 to-transparent pointer-events-none" />
                                          <p className="relative z-10">{faq.answer}</p>
                                      </Disclosure.Panel>
                                  </Transition>
                                    </div>
                                )}
                            </Disclosure>
                        ))}
                </div>
            </section>
            <section className="problems-section relative py-16 sm:py-20 px-4 sm:px-8">
                <div className="absolute inset-0"
                     style={{
                         backgroundImage: 'radial-gradient(circle, rgb(173, 216, 230) 1px, transparent 1px)',
                         backgroundSize: '28px 28px'
                     }}
                />
                <div className="relative z-10 max-w-7xl mx-auto">
                        <span className="text-blue-600 text-sm sm:text-lg tracking-widest font-semibold uppercase">
                           Builders
                        </span>
                       <h2 className="text-3xl sm:text-4xl font-bold mt-3 text-gray-900 mb-3">
                           Meet Our Builders
                       </h2>
                       <p className="text-gray-600 max-w-2xl mx-auto">Get to know the talented individuals behind CampusFlow</p>
                   </div>
               <BuildersCarousel/>
           </section>
            <Footer/>
        </div>
    );
};

export default LandingPage;