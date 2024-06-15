import { RequestStatus } from './enums';

// create the tasks of abishek tripathi from panchayat
export const requests: {
  title: string;
  description: string;
  authorName: string;
  createdAt: number;
  upvotes: number;
  status: RequestStatus;
  pledgeAmount: number;
  comments: number;
}[] = [
  {
    authorName: 'Rajat',
    createdAt: 1718397341502,
    pledgeAmount: 2500,
    status: RequestStatus.wip,
    title: 'Dark Mode Toggle',
    description:
      'Add a dark mode toggle to the app to provide a better user experience for those who prefer a darker interface.',
    upvotes: 250,
    comments: 24,
  },
  {
    authorName: 'Srijita',
    createdAt: 1718397301502,
    pledgeAmount: 550,
    status: RequestStatus.roadmap,
    title: 'Improved Analytics',
    description:
      'Enhance the analytics dashboard to provide more detailed insights and reporting for our users.',
    upvotes: 125,
    comments: 82,
  },
  {
    authorName: 'Abhishek',
    createdAt: 1711397341502,
    pledgeAmount: 950,
    status: RequestStatus.new,
    title: 'Improved Onboarding',
    description:
      'Create a more intuitive and engaging onboarding experience to help new users get started quickly.',
    upvotes: 175,
    comments: 65,
  },
  {
    authorName: 'Rajkumar',
    createdAt: 1718395341502,
    pledgeAmount: 5000,
    status: RequestStatus.cancelled,
    title: 'New Dashboard',
    description:
      'Update the dashboard with shadcn ui and interesting animations, lorem ipsum dolor sit amet',
    upvotes: 300,
    comments: 112,
  },
  {
    authorName: 'Rohit',
    createdAt: 1518397341502,
    pledgeAmount: 2750,
    status: RequestStatus.shipped,
    title: 'Mobile App',
    description:
      'Add a dark mode toggle to the app to provide a better user experience for those who prefer a darker interface.',
    upvotes: 250,
    comments: 39,
  },
  {
    authorName: 'Aaarav',
    createdAt: 1716397341502,
    pledgeAmount: 150,
    status: RequestStatus.new,
    title: 'Some useless stuff',
    description:
      'Another feature that nobody asked for, really not needed, lorem ipsum dolor sit amet something',
    upvotes: 250,
    comments: 91,
  },
];
