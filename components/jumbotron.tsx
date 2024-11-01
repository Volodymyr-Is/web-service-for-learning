import { WebGLAnimation } from './webgl-animation'
import { Button } from "@/components/ui/button"
import Link from 'next/link'
interface JumbotronProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export function Jumbotron({ title, description, buttonText, buttonLink }: JumbotronProps) {
  return (
    <div className="relative py-20 rounded-lg flex items-center justify-center overflow-hidden">
      <WebGLAnimation />
      <div className="relative z-10 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-black drop-shadow-lg">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-black drop-shadow-md">
          {description}
        </p>
        <Link href={buttonLink}>
        <Button size="lg"  className="bg-black text-white hover:bg-gray-800">
          {buttonText}
        </Button>
        </Link>
      </div>
    </div>
  )
}