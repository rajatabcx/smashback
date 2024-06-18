import { RequestStatus } from './enums';

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
    title: 'Dark Mode Support',
    description:
      'Implement a dark mode theme for improved visibility in low-light environments and reduced eye strain.',
    authorName: 'James',
    createdAt: 1622559600000,
    upvotes: 150,
    status: RequestStatus.new,
    pledgeAmount: 2000,
    comments: 20,
  },
  {
    title: 'Introduce New UI Design with Animations',
    description:
      'Revamp the user interface with modern design elements and subtle animations to enhance user experience and engagement.',
    authorName: 'Rony',
    createdAt: 1622646000000,
    upvotes: 100,
    status: RequestStatus.roadmap,
    pledgeAmount: 800,
    comments: 15,
  },
  {
    title: 'Offline Mode Functionality',
    description:
      'Enable users to access core features of the app even without an internet connection, ensuring uninterrupted usage in areas with poor connectivity.',
    authorName: 'Chris',
    createdAt: 1622732400000,
    upvotes: 120,
    status: RequestStatus.wip,
    pledgeAmount: 500,
    comments: 10,
  },
  {
    title: 'Multi-language Support',
    description:
      'Add support for multiple languages to make the app accessible to a wider audience and enhance user inclusivity.',
    authorName: 'Emma',
    createdAt: 1622905200000,
    upvotes: 300,
    status: RequestStatus.shipped,
    pledgeAmount: 4000,
    comments: 35,
  },
  {
    title: 'Enhanced Security Features',
    description:
      'Implement additional security measures such as two-factor authentication to safeguard user data and prevent unauthorized access.',
    authorName: 'Michael',
    createdAt: 1622818800000,
    upvotes: 30,
    status: RequestStatus.cancelled,
    pledgeAmount: 20,
    comments: 50,
  },
  {
    title: 'Performance Optimization',
    description:
      'Optimize app performance to reduce loading times, minimize resource consumption, and provide a smoother overall experience for users.',
    authorName: 'Sarah',
    createdAt: 1622991600000,
    upvotes: 90,
    status: RequestStatus.new,
    pledgeAmount: 700,
    comments: 12,
  },
];
