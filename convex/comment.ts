import { ConvexError, v } from 'convex/values';
import { mutation } from './_generated/server';

export const create = mutation({
  args: {
    comment: v.string(),
    feedbackId: v.id('feedbacks'),
  },
  handler: async (ctx, args) => {
    const author = await ctx.auth.getUserIdentity();
    if (!author) throw new ConvexError({ message: 'Unauthorized' });

    const feedback = await ctx.db.get(args.feedbackId);

    if (!feedback)
      throw new ConvexError({
        message: 'Feedback not found',
      });

    const comment = await ctx.db.insert('comments', {
      comment: args.comment,
      authorId: author.subject,
      authorName: author.givenName || author.name || 'User',
      authorImageURL: author.pictureUrl,
      feedbackId: args.feedbackId,
    });

    await ctx.db.patch(args.feedbackId, {
      comments: feedback.comments + 1,
    });
    return comment;
  },
});
