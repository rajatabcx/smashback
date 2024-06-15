import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  projects: defineTable({
    name: v.string(),
    ownerName: v.string(),
    ownerImageURL: v.optional(v.string()),
    ownerId: v.string(),
    slug: v.string(),
  })
    .index('by_owner', ['ownerId'])
    .index('by_owner_slug', ['ownerId', 'slug'])
    .searchIndex('by_project_name', {
      searchField: 'name',
    }),
  feedbacks: defineTable({
    title: v.string(),
    description: v.string(),
    authorId: v.string(),
    authorName: v.string(),
    authorImageURL: v.optional(v.string()),
    projectId: v.id('projects'),
    upvotes: v.number(),
    comments: v.number(),
    status: v.union(
      v.literal('New'),
      v.literal('Work In Progress'),
      v.literal('Added to Roadmap'),
      v.literal('Shipped'),
      v.literal('Cancelled')
    ),
  })
    .index('by_author_id', ['authorId'])
    .index('by_project_id', ['projectId'])
    .searchIndex('by_feedback_title', {
      searchField: 'title',
      filterFields: ['projectId'],
    }),
  upvotes: defineTable({
    feedbackId: v.string(),
    projectId: v.string(),
    authorId: v.string(),
  }).index('by_project_feedback_author', [
    'projectId',
    'feedbackId',
    'authorId',
  ]),
  comments: defineTable({
    comment: v.string(),
    authorName: v.string(),
    authorId: v.string(),
    authorImageURL: v.optional(v.string()),
    feedbackId: v.id('feedbacks'),
  })
    .index('by_author_id', ['authorId'])
    .index('by_feedback_id', ['feedbackId']),
});
