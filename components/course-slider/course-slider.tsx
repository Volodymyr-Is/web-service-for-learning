'use client'

import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/course-card/course-card";


export default function CourseCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [cardsPerView, setCardsPerView] = useState(1)
    const courses = Array.from({ length: 16 }, (_, i) => i + 1)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setCardsPerView(3)
            } else if (window.innerWidth >= 768) {
                setCardsPerView(2)
            } else {
                setCardsPerView(1)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleNextClick = () => {
        setCurrentIndex((prevIndex) => (prevIndex + cardsPerView) % courses.length)
    }

    return (
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Popular</h1>
                <Button variant="ghost" size="icon" onClick={handleNextClick}>
                    <ArrowRight className="h-6 w-6" />
                </Button>
            </div>

            <div className="overflow-hidden">
                <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentIndex * (100 / cardsPerView)}%)` }}
                >
                    {courses.map((course) => (
                        <div key={course} className={`w-full flex-none px-2 ${
                            cardsPerView === 3 ? 'md:w-1/3' :
                                cardsPerView === 2 ? 'md:w-1/2' :
                                    'md:w-full'
                        }`}>
                            <CourseCard />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}