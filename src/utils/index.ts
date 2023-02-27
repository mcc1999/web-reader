export async function file2blob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(evt: ProgressEvent<FileReader>) {
      const blob = new Blob([evt.target!.result!], {type: file.type});
      resolve(blob)
    };
    reader.onerror = function() {
      reject(new Error('file2blob failed!'))
    };
  })
}

export function blob2file(blob: Blob, fileName: string): File {
  return new File([blob], fileName, {type: blob.type})
}

export async function blob2ArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  return await blob.arrayBuffer()
}

export async function file2ArrayBuffer(file: File) {
  return await file.arrayBuffer()
} 