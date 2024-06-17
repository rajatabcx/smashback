import { paginationOptsValidator, PaginationResult } from 'convex/server';
import { query } from './_generated/server';
import { ConvexError, v } from 'convex/values';
import { Id } from './_generated/dataModel';

export const myProjects = query({
  handler: async (ctx) => {
    const owner = await ctx.auth.getUserIdentity();
    if (!owner) throw new ConvexError({ message: 'Unauthorized' });

    const projects = await ctx.db
      .query('projects')
      .withIndex('by_owner', (q) => q.eq('ownerId', owner.subject))
      .order('desc')
      .collect();

    return projects;
  },
});

export const allProjects = query({
  args: {
    paginationOpts: paginationOptsValidator,
    name: v.string(),
  },
  handler: async (ctx, args) => {
    let projects: PaginationResult<{
      _id: Id<'projects'>;
      _creationTime: number;
      ownerImageURL?: string | undefined;
      name: string;
      ownerName: string;
      ownerId: string;
      slug: string;
    }>;
    if (args.name) {
      projects = await ctx.db
        .query('projects')
        .withSearchIndex('by_project_name', (q) => q.search('name', args.name))
        .paginate(args.paginationOpts);
    } else {
      projects = await ctx.db
        .query('projects')
        .order('desc')
        .paginate(args.paginationOpts);
    }
    return projects;
  },
});
