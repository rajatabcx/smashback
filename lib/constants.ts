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
    title: 'Install toilet Sear',
    description: "Install my toilet seat, it's been more than few weeks now.",
    authorName: 'Binod',
    createdAt: 1622559600000,
    upvotes: 150,
    status: RequestStatus.wip,
    pledgeAmount: 2000,
    comments: 20,
  },
  {
    title: 'Street Light Repair',
    description:
      'Repair the broken street lights in the main market area to improve safety at night.',
    authorName: 'Master-ji',
    createdAt: 1622646000000,
    upvotes: 100,
    status: RequestStatus.roadmap,
    pledgeAmount: 800,
    comments: 15,
  },
  {
    title: 'New Library Books',
    description:
      'Purchase new books for the village library to encourage reading among the children.',
    authorName: 'Prahlad',
    createdAt: 1622732400000,
    upvotes: 120,
    status: RequestStatus.new,
    pledgeAmount: 500,
    comments: 10,
  },
  {
    title: 'Road Construction',
    description:
      'Construct a new road to connect the village to the nearby town for better accessibility.',
    authorName: 'Manju Devi',
    createdAt: 1622905200000,
    upvotes: 300,
    status: RequestStatus.shipped,
    pledgeAmount: 4000,
    comments: 35,
  },
  {
    title: 'Golden Statue of Bhushan',
    description:
      'Erect a golden statue of Bhushan in the village square to commemorate his contributions.',
    authorName: 'Bhushan',
    createdAt: 1622818800000,
    upvotes: 30,
    status: RequestStatus.cancelled,
    pledgeAmount: 5000,
    comments: 50,
  },
  {
    title: 'Clean the Pond',
    description:
      'Clean and maintain the village pond to prevent waterborne diseases and improve aesthetics.',
    authorName: 'Rinki',
    createdAt: 1622991600000,
    upvotes: 90,
    status: RequestStatus.new,
    pledgeAmount: 700,
    comments: 12,
  },
];
