import { Navbar } from '../dashboard/_components/Navbar';
import { Projects } from './_components/Projects';

export default function Page() {
  return (
    <div>
      <Navbar />
      {/* TODO: add search bar here */}
      <div className='container mx-auto px-4 py-12 lg:px-6 xl:px-8'>
        <h1 className='text-xl md:text-3xl font-semibold mb-6'>All projects</h1>
        <Projects />
      </div>
    </div>
  );
}
