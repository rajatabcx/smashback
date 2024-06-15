import { v } from 'convex/values';
import { mutation } from './_generated/server';

export const create = mutation({
  args: {
    comment: v.string(),
    feedbackId: v.id('feedbacks'),
  },
  handler: async (ctx, args) => {
    const author = await ctx.auth.getUserIdentity();
    if (!author) throw new Error('Unauthorized');
    await ctx.db.insert('comments', {
      comment: args.comment,
      authorId: author.subject,
      authorName: author.name || 'User',
      authorImageURL: author.pictureUrl,
      feedbackId: args.feedbackId,
    });
  },
});
