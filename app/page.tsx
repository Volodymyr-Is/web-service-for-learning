import { Jumbotron } from "@/components/jumbotron";
export default function Home() {
  return (
    <div className="">
      <Jumbotron title="Welcome to Our Amazing App" description="Discover the power of innovation and creativity" buttonText="Get Started" buttonLink="/login" />
    </div>
  );
}
