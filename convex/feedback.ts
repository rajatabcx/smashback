import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export enum RequestStatus {
  new = 'New',
  wip = 'Work In Progress',
  roadmap = 'Added to Roadmap',
  shipped = 'Shipped',
  cancelled = 'Cancelled',
}

export const create = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const author = await ctx.auth.getUserIdentity();
    if (!author) throw new Error('Unauthorized');
    const feedback = await ctx.db.insert('feedbacks', {
      title: args.title,
      description: args.description,
      projectId: args.projectId,
      status: RequestStatus.new,
      authorId: author.subject,
      authorName: author.name || 'User',
      authorImageURL: author.pictureUrl,
      comments: 0,
      upvotes: 1,
    });

    await ctx.db.insert('upvotes', {
      authorId: author.subject,
      feedbackId: feedback,
      projectId: args.projectId,
    });

    return feedback;
  },
});

export const get = query({
  args: {
    id: v.id('feedbacks'),
  },
  handler: async (ctx, args) => {
    const author = await ctx.auth.getUserIdentity();
    if (!author) throw new Error('Unauthorized');

    const feedback = await ctx.db.get(args.id);

    if (!feedback) throw new Error('Feedback not found');

    const comments = await ctx.db
      .query('comments')
      .withIndex('by_feedback_id', (q) => q.eq('feedbackId', feedback._id))
      .collect();
    return comments;
  },
});

export const upvote = mutation({
  args: {
    feedbackId: v.id('feedbacks'),
    projectId: v.id('feedbacks'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error('Unauthorized');

    const feedback = await ctx.db.get(args.feedbackId);

    if (!feedback) throw new Error('Feedback not found');

    const existingUpvote = await ctx.db
      .query('upvotes')
      .withIndex('by_project_feedback_author', (q) =>
        q
          .eq('projectId', args.projectId)
          .eq('feedbackId', args.feedbackId)
          .eq('authorId', identity.subject)
      )
      .unique();

    if (existingUpvote) {
      await ctx.db.delete(existingUpvote._id);
      const updatedFeedback = await ctx.db.patch(feedback._id, {
        upvotes: feedback.upvotes - 1,
      });
      return updatedFeedback;
    }
    await ctx.db.insert('upvotes', {
      authorId: identity.subject,
      feedbackId: args.feedbackId,
      projectId: args.projectId,
    });
    const updatedFeedback = await ctx.db.patch(feedback._id, {
      upvotes: feedback.upvotes + 1,
    });
    return updatedFeedback;
  },
});
