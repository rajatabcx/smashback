import Image from 'next/image';
import Link from 'next/link';
import { Header } from './_components/Header';
import { RequestCard } from '@/components/requests/RequestCard';
import { requests } from '@/lib/constants';
import { auth } from '@clerk/nextjs/server';

export default function Landing() {
  const { sessionId } = auth();
  return (
    <div className='flex flex-col min-h-[100dvh]'>
      <Header />
      <main className='flex-1'>
        <section className='w-full h-[calc(100vh-72px)] flex justify-center items-center'>
          <div className='container px-4 md:px-6 flex flex-col items-center justify-center space-y-6'>
            <div className='gap-4 text-center flex flex-col items-center'>
              <h1 className='text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
                Bring Your Product Ideas to Life
              </h1>
              <p className='max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400'>
                Smashback is a SaaS platform that allows you to collect and
                manage feature requests from your users, and get them funded
                through a crowd sourcing model.
              </p>
            </div>
            <div className='flex flex-col gap-2 min-[400px]:flex-row'>
              <Link
                href={sessionId ? '/projects' : '/auth/sign-up'}
                className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                prefetch={false}
              >
                {sessionId ? 'All Projects' : 'Get Started'}
              </Link>
            </div>
          </div>
        </section>
        <section
          id='features'
          className='w-full py-12 md:py-24 lg:py-20 bg-secondary dark:bg-background'
        >
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Crowdsource Your Product Roadmap
                </h2>
                <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Empower your users to shape your product roadmap by submitting
                  and funding the features they need most.
                </p>
              </div>
            </div>
            <div className='mx-auto grid gap-6 py-12 lg:grid-cols-2 lg:gap-12'>
              {requests.map((request, index) => (
                <RequestCard
                  key={index}
                  title={request.title}
                  description={request.description}
                  upvotes={request.upvotes}
                  authorName={request.authorName}
                  pledgeAmount={request.pledgeAmount}
                  status={request.status}
                  createdAt={request.createdAt}
                  comments={request.comments}
                  link='#'
                  disabled
                />
              ))}
            </div>
            <div className='flex justify-center'>
              <Link
                href='/projects'
                className='inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300'
                prefetch={false}
              >
                All Projects
              </Link>
            </div>
          </div>
        </section>
        <section id='howitworks' className='w-full py-12 md:py-16 lg:py-20'>
          <div className='container px-4 md:px-6'>
            <div className='flex flex-col items-center justify-center space-y-4 text-center'>
              <div className='space-y-2'>
                <h2 className='text-3xl font-bold tracking-tighter sm:text-5xl'>
                  Unlock the Power of User-Driven Development
                </h2>
                <p className='max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400'>
                  Smashback helps you build the features your users actually
                  want, while keeping them engaged and invested in your
                  product&apos;s success.
                </p>
              </div>
            </div>
            <div className='mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 md:gap-12'>
              <div className='flex flex-col justify-center space-y-4'>
                <ul className='grid gap-6'>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>
                        Increased User Engagement
                      </h3>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Empower users to shape the product roadmap and feel
                        invested in its success.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>
                        Faster Time to Market
                      </h3>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Focus your development efforts on the features that
                        matter most to your users.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className='grid gap-1'>
                      <h3 className='text-xl font-bold'>
                        Improved Customer Satisfaction
                      </h3>
                      <p className='text-gray-500 dark:text-gray-400'>
                        Build the features your users want, leading to higher
                        adoption and retention.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                src='/benefits.png'
                width={550}
                height={310}
                alt='Benefits'
                className='-mt-20 select-none hidden md:block'
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
