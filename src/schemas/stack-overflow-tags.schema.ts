import { z } from "zod";

export const tagSchema = z.object({
  has_synonyms: z.boolean(),
  is_moderator_only: z.boolean(),
  is_required: z.boolean(),
  count: z.number(),
  name: z.string(),
});

export const tagsResponeSchema = z.object({
  items: z.array(tagSchema),
  has_more: z.boolean(),
  quota_max: z.number(),
  quota_remaining: z.number(),
});
