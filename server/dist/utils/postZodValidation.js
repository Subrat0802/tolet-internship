import { z } from "zod";
export const postZodValidation = z.object({
    title: z.string().min(5).max(120),
    content: z.string().min(50),
    image: z.string()
});
//# sourceMappingURL=postZodValidation.js.map