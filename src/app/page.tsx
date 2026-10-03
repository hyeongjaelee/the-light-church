import {
  Bulletins,
  Location,
  MobileHero,
  Pastor,
  NextGeneration,
  ThisWeek,
  Welcome,
  Worship,
} from "@/components/home/sections";
import {
  getBulletins,
  getDepartments,
  getLatestSermon,
  getWorshipTimes,
} from "@/lib/data";

export const revalidate = 60;

export default async function HomePage() {
  const [sermon, times, departments, bulletins] = await Promise.all([
    getLatestSermon(),
    getWorshipTimes(),
    getDepartments(),
    getBulletins(undefined, 5),
  ]);

  return (
    <>
      <MobileHero />
      <ThisWeek sermon={sermon} />
      <Welcome />
      <Worship times={times} />
      <Pastor />
      <NextGeneration departments={departments} />
      <Bulletins bulletins={bulletins} />
      <Location />
    </>
  );
}
