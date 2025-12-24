"use server";

import { revalidateTag } from "next/cache";

export async function refreshResumeData() {
  revalidateTag("resume-data", { expire: 3600 });
}
