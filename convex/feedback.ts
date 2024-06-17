import { ConvexError, v } from 'convex/values';
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
    pledgeAmount: v.optional(v.number()),
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const author = await ctx.auth.getUserIdentity();
    if (!author) throw new ConvexError({ message: 'Unauthorized' });

    const project = await ctx.db.get(args.projectId);

    const feedback = await ctx.db.insert('feedbacks', {
      title: args.title,
      description: args.description,
      projectId: args.projectId,
      status: RequestStatus.new,
      authorId: author.subject,
      authorName: author.givenName || author.name || 'User',
      authorImageURL: author.pictureUrl,
      comments: 0,
      upvotes: 1,
      pledgeAmount: args.pledgeAmount || 0,
      byOwner: author.subject === project?.ownerId,
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

    const feedback = await ctx.db.get(args.id);

    if (!feedback) throw new ConvexError({ message: 'Feedback not found' });

    const comments = await ctx.db
      .query('comments')
      .withIndex('by_feedback_id', (q) => q.eq('feedbackId', feedback._id))
      .order('desc')
      .collect();

    const upvote = await ctx.db
      .query('upvotes')
      .withIndex('by_project_feedback_author', (q) =>
        q
          .eq('projectId', feedback.projectId)
          .eq('feedbackId', feedback._id)
          .eq('authorId', author?.subject || '')
      )
      .unique();

    const isMine = feedback.authorId === author?.subject;
    return { feedback, comments, isMine, author, upvoted: !!upvote };
  },
});

export const upvote = mutation({
  args: {
    feedbackId: v.id('feedbacks'),
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: 'Unauthorized' });

    const feedback = await ctx.db.get(args.feedbackId);

    if (!feedback) throw new ConvexError({ message: 'Feedback not found' });

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
      const upvote = await ctx.db.delete(existingUpvote._id);
      await ctx.db.patch(feedback._id, {
        upvotes: feedback.upvotes - 1,
      });
      return upvote;
    }
    const upvote = await ctx.db.insert('upvotes', {
      authorId: identity.subject,
      feedbackId: args.feedbackId,
      projectId: args.projectId,
    });
    await ctx.db.patch(feedback._id, {
      upvotes: feedback.upvotes + 1,
    });
    return upvote;
  },
});

export const updateStatus = mutation({
  args: {
    feedbackId: v.id('feedbacks'),
    status: v.union(
      v.literal('New'),
      v.literal('Work In Progress'),
      v.literal('Added to Roadmap'),
      v.literal('Shipped'),
      v.literal('Cancelled')
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new ConvexError({ message: 'Unauthorized' });

    const feedback = await ctx.db.get(args.feedbackId);

    if (!feedback) throw new ConvexError({ message: 'Feedback not found' });

    const project = await ctx.db.get(feedback.projectId);

    if (!project) throw new ConvexError({ message: 'Project not found' });

    if (project.ownerId !== identity.subject) {
      throw new ConvexError({
        message: "You can't update status",
      });
    }

    const updatedFeedback = await ctx.db.patch(feedback._id, {
      status: args.status,
    });

    return updatedFeedback;
  },
});
