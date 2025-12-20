import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { toast } from "sonner";

const PDF_WORKER_URL = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const getPDFText = async (file: File): Promise<string> => {
  if (!file) {
    const toastId = toast.error("No File found.", {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(toastId),
      },
    });
  }
  try {
    const arrayBuffer = await file.arrayBuffer();

    pdfjsLib.GlobalWorkerOptions.workerSrc = PDF_WORKER_URL;

    const loadingTask = pdfjsLib.getDocument({
      data: arrayBuffer,
      useSystemFonts: true,
    });

    const pdf = await loadingTask.promise;
    let fullText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item: any) => item.str).join(" ");

      fullText += pageText + "\n";
    }

    return fullText;
  } catch (error) {
    const toastId = toast.error("Parsing Failed Try Again!", {
      action: {
        label: "Cancel",
        onClick: () => toast.dismiss(toastId),
      },
    });
    return "";
  }
};
