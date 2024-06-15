import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { getAuthToken } from '@/lib/auth';
import { fetchQuery } from 'convex/nextjs';

export default async function ProjectDetails({
  params,
}: {
  params: { projectId: Id<'projects'> };
}) {
  const token = await getAuthToken();
  const projectDetails = await fetchQuery(
    api.project.projectDetails,
    {
      id: params.projectId,
    },
    { token }
  );

  return <div>{JSON.stringify(projectDetails, null, 2)}</div>;
}
