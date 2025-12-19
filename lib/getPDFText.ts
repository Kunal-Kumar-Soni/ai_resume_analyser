import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";

const PDF_WORKER_URL = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/build/pdf.worker.min.mjs`;

export const getPDFText = async (file: File): Promise<string> => {
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
    throw new Error("Parsing Failed Try Again!");
  }
};
