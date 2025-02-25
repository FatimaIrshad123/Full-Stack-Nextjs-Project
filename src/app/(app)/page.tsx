'use client'

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import messages from '../../messages.json'
import Autoplay from "embla-carousel-autoplay"
import Link from "next/link"


export default function Home() {
  
  return (
    <>
    <main className="flex flex-grow flex-col items-center justify-center px-4 py-12 md:px-24 rounded-md m-2 bg-cyan-700">
      <section className="text-center mb-8 md:mb-12 text-white">
        <h1 className="text-3xl md:text-5xl font-bold">Dive into the world of Anonymus</h1>
        <p className="mt-3 md:mt-4 text-base md:text-lg">Explore mystery message - Where your identity remain a secret</p>
        <p>Click to visit <Link href='/dashboard'>Dashboard</Link></p>
      </section>
      <Carousel 
      plugins={[Autoplay({delay: 2000})]}
      className="w-full max-w-xs">
      <CarouselContent>
        {
          messages.map((message,index) => (
              <CarouselItem key={index}>
              <div className="p-1">
                <Card className="text-white bg-cyan-300">
                  <CardHeader>
                    {message.title}
                  </CardHeader>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-lg font-semibold">{message.content}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        }
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
    </main>
    <footer className="text-center p-4 md:p-6 bg-cyan-500 m-2 rounded-md text-white">2025 Mystery Message. All rights reserved</footer>
    </>
  );
}
