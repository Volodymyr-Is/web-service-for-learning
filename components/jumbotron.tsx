import { WebGLAnimation } from './webgl-animation'
import { Button } from "@/components/ui/button"

export function Jumbotron() {
  return (
    <div className="relative py-20 rounded-lg flex items-center justify-center overflow-hidden">
      <WebGLAnimation />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black drop-shadow-lg">
          Welcome to Our Amazing App
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-black drop-shadow-md">
          Discover the power of innovation and creativity
        </p>
        <Button size="lg" className="bg-black text-white hover:bg-gray-800">
          Get Started
        </Button>
      </div>
    </div>
  )
}