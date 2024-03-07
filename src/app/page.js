import Navbar from '@/components/navbar/Navbar';
import ProjectList from '@/components/projectList/ProjectList';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="w-full flex items-center justify-center p-10">
        <ProjectList />
      </main>
    </>
  );
}
