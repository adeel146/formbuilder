const toBase64 = (file: File) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const res = (reader?.result as any).replace(/^data:.+;base64,/, "");
      resolve(res);
    };
    reader.onerror = (error) => reject(error);
  });

export default toBase64;
