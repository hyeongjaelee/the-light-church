import { LightOn } from "@/components/home/light-on";
import {
  Bulletins,
  Location,
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
      <ThisWeek sermon={sermon} />
      <Welcome />
      <LightOn />
      <Worship times={times} />
      {/* <Pastor /> */}
      {/* <NextGeneration departments={departments} /> */}
      {/* <Bulletins bulletins={bulletins} /> */}
      <Location />
    </>
  );
}
