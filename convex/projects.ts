import { paginationOptsValidator } from 'convex/server';
import { query } from './_generated/server';

export const myProjects = query({
  handler: async (ctx) => {
    const owner = await ctx.auth.getUserIdentity();
    if (!owner) throw new Error('Unauthorized');

    const projects = await ctx.db
      .query('projects')
      .withIndex('by_owner', (q) => q.eq('ownerId', owner.subject))
      .collect();

    return projects;
  },
});

export const allProjects = query({
  args: {
    paginationOpts: paginationOptsValidator,
  },
  handler: async (ctx, args) => {
    const projects = await ctx.db
      .query('projects')
      .order('desc')
      .paginate(args.paginationOpts);
    return projects;
  },
});
