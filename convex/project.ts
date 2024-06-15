import { ConvexError, v } from 'convex/values';
import { query, mutation } from './_generated/server';

export const create = mutation({
  args: {
    name: v.string(),
    slug: v.string(),
  },
  handler: async (ctx, args) => {
    const owner = await ctx.auth.getUserIdentity();
    if (!owner) throw new Error('Unauthorized');
    const availableProject = await ctx.db
      .query('projects')
      .withIndex('by_owner_slug', (q) =>
        q.eq('ownerId', owner.subject).eq('slug', args.slug)
      )
      .unique();

    if (availableProject) {
      throw new ConvexError({
        message:
          'project with same slug already available, try with different name',
      });
    }
    const project = await ctx.db.insert('projects', {
      name: args.name,
      slug: args.slug,
      ownerId: owner.subject,
      ownerName: owner.name || 'User',
      ownerImageURL: owner.pictureUrl,
    });
    return project;
  },
});

export const update = mutation({
  args: {
    name: v.string(),
    id: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const owner = await ctx.auth.getUserIdentity();
    if (!owner) throw new Error('Unauthorized');
    await ctx.db.patch(args.id, {
      name: args.name,
    });
  },
});

export const projectDetails = query({
  args: {
    id: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const owner = await ctx.auth.getUserIdentity();
    if (!owner) throw new Error('Unauthorized');

    const project = await ctx.db.get(args.id);

    if (!project) throw new Error('Project not found');

    const feedbacks = await ctx.db
      .query('feedbacks')
      .withIndex('by_project_id', (q) => q.eq('projectId', project._id))
      .collect();

    const isMine = project.ownerId === owner.subject;

    return { project, feedbacks, isMine };
  },
});
