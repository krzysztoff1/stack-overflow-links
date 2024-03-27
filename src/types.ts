import { z } from "zod";
import { tagSchema } from "./schemas/stack-overflow-tags.schema";

export type Tag = z.infer<typeof tagSchema>;
