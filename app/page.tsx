
import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";

export default function Home() {
  return (
    <div className="w-[100vw]">
      <Hero />
      <PopularCityList />
    </div>
  )
}
