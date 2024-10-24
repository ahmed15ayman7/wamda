// "use server";
// import { initUploadThing } from "@uploadthing/server";
// import { Readable } from "stream";

// // Initialize uploadthing with your credentials
// const { uploadFiles } = initUploadThing({
//   apiKey: process.env.UPLOADTHING_API_KEY || "",
//   secret: process.env.UPLOADTHING_SECRET || "",
// });

// // Function to upload files using uploadthing
// export const uploadToUploadThing = async (fileBuffer: Buffer, fileName: string) => {
//   const file = new File([fileBuffer], fileName);
//   const response = await uploadFiles([file]);

//   if (response && response.length > 0) {
//     const { url } = response[0];
//     return { viewLink: url, success: true };
//   }

//   throw new Error("Upload failed");
// };

// export const uploadToGoogleDrive = async (
//     fileBuffer: Buffer,
//     fileName: string 
// ): Promise<{ viewLink: string; success: boolean }> => {
//   try {
//     const response = await uploadToUploadThing(fileBuffer, fileName);
//     return response;
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     throw new Error("Upload failed");
//   }
// };
