import { useRef, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Cropper from "react-easy-crop";
import setCanvasPreview from "./setCanvasPreview";
import { motion } from "framer-motion";

const MIN_DIMENSION = 150;

const ImageCropper = ({ updateAvatar, closeModal, is9X16 }: { updateAvatar: (imgSrc: string) => void; closeModal: () => void; is9X16?: boolean }) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [error, setError] = useState<string>("");

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result?.toString() || "";
      const imageElement = new Image();
      imageElement.src = imageUrl;

      imageElement.onload = (e) => {
        const img = e.currentTarget as HTMLImageElement;
        const { naturalWidth, naturalHeight } = img;
        if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
          setError("Image must be at least 150 x 150 pixels.");
          return setImgSrc("");
        }
        imgRef.current = img; // Set the imgRef to the loaded image
        setImgSrc(imageUrl);
        setError("");
      };
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } });

  const onCropChange = (newCrop: { x: number; y: number }) => {
    setCrop(newCrop);
  };

  useEffect(() => {
    if (imgRef.current && previewCanvasRef.current) {
      const canvas = previewCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        canvas.width = imgRef.current.naturalWidth; // Set canvas width to image width
        canvas.height = imgRef.current.naturalHeight; // Set canvas height to image height
        ctx.drawImage(imgRef.current, 0, 0); // Draw the image on the canvas
      }
    }
  }, [imgSrc]); // Re-run this effect whenever imgSrc changes

  return (
    <div className="flex flex-col justify-evenly">
      <motion.div
        {...getRootProps({
          className: `dropzone mb-3 text-gray-900 border items-center justify-center flex rounded-xl border-gray-700`,
          style: { height: imgSrc ? "10vh" : "70vh" },
        })}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <input {...getInputProps({ className: "text-gray-900" })} />
        <span className="sr-only">Choose profile photo</span>
        <p className="text-gray-900">Drag 'n' drop some files here, or click to select files</p>
      </motion.div>
      {error && <p className="text-red-400 text-xs">{error}</p>}
      {imgSrc && (
        <div className="flex flex-col items-center">
          <div className="relative w-full h-96">
            <Cropper
              image={imgSrc}
              crop={crop}
              zoom={zoom}
              aspect={is9X16 ? 16 / 9 : 1}
              onCropChange={onCropChange}
              onZoomChange={setZoom}
            />
          </div>
          <button
            className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-[#5D87FF] hover:bg-[#5D87FF90]"
            onClick={(e) => {
              e.preventDefault();

              if (imgRef.current && previewCanvasRef.current) {
                console.log('Image cropped successfully');
                setCanvasPreview(
                  imgRef.current,
                  previewCanvasRef.current,
                  {
                    x: crop.x,
                    y: crop.y,
                    width: previewCanvasRef.current.width, // Use the canvas width
                    height: previewCanvasRef.current.height, // Use the canvas height
                  }
                );
                const dataUrl = previewCanvasRef.current.toDataURL();
                updateAvatar(dataUrl);
                closeModal();
              } else {
                console.error("Image or canvas reference is not set.");
              }
            }}
          >
            Crop Image
          </button>
        </div>
      )}
      <canvas
        ref={previewCanvasRef}
        className="mt-4"
        style={{
          display: "none",
          border: "1px solid black",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

export default ImageCropper;

// import { useRef, useState } from "react";
// import { useDropzone } from "react-dropzone";
// import ReactCrop, { Crop, centerCrop, convertToPixelCrop, makeAspectCrop } from "react-image-crop";
// import setCanvasPreview from "./setCanvasPreview";
// import { motion } from "framer-motion";

// const MIN_DIMENSION = 150;

// const ImageCropper = ({ updateAvatar, closeModal, is9X16 }: { updateAvatar: (imgSrc: string) => void; closeModal: () => void; is9X16?: boolean }) => {
//   const imgRef = useRef<HTMLImageElement | null>(null);
//   const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [imgSrc, setImgSrc] = useState<string>("");
//   const [crop, setCrop] = useState<Crop>();
//   const [error, setError] = useState<string>("");

//   const onDrop = (acceptedFiles: File[]) => {
//     const file = acceptedFiles[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = () => {
//       const imageElement = new Image();
//       const imageUrl = reader.result?.toString() || "";
//       imageElement.src = imageUrl;

//       imageElement.onload = (e) => {
//         const img = e.currentTarget as HTMLImageElement;
//         const { naturalWidth, naturalHeight } = img;
//         if (naturalWidth < MIN_DIMENSION || naturalHeight < MIN_DIMENSION) {
//           setError("Image must be at least 150 x 150 pixels.");
//           return setImgSrc("");
//         }
//         setImgSrc(imageUrl); // Set the image source after validating dimensions
//         setError(""); // Clear error if valid
//       };
//     };
//     reader.readAsDataURL(file);
//   };

//   const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: { "image/*": [] } });

//   const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
//     const { width, height } = e.currentTarget;
    
//     const aspectRatio = is9X16 ? 16 / 5 : 1; // Set aspect ratio based on is9X16 prop
//     const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

//     const crop = makeAspectCrop(
//       {
//         unit: "%",
//         width: cropWidthInPercent,
//       },
//       aspectRatio, // Use the determined aspect ratio here
//       width,
//       height
//     );
//     const centeredCrop = centerCrop(crop, width, height);
//     setCrop(centeredCrop);
//   };

//   return (
//     <div className="flex flex-col justify-evenly">
//       <motion.div
//         {...getRootProps({
//           className: `dropzone mb-3 text-gray-900 border items-center justify-center flex rounded-xl border-gray-700`,
//           style: { height: imgSrc ? "10vh" : "70vh" },
//         })}
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <input {...getInputProps({ className: "text-gray-900" })} />
//         <span className="sr-only">Choose profile photo</span>
//         <p className="text-gray-900">Drag 'n' drop some files here, or click to select files</p>
//       </motion.div>
//       {error && <p className="text-red-400 text-xs">{error}</p>}
//       {imgSrc && (
//         <div className="flex flex-col items-center">
//           <ReactCrop
//             crop={crop}
//             onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
//             keepSelection
//             aspect={is9X16 ? 16 / 5 : undefined} // Set aspect ratio for ReactCrop
//             minWidth={MIN_DIMENSION}
//           >
//             <img
//               ref={imgRef}
//               src={imgSrc}
//               alt="Upload"
//               style={{ maxHeight: "70vh" }}
//               onLoad={onImageLoad}
//             />
//           </ReactCrop>
//           <button
//             className="text-white font-mono text-xs py-2 px-4 rounded-2xl mt-4 bg-gold-500 hover:bg-gold-600"
//             onClick={(e) => {
//               e.preventDefault();
//               if (imgRef.current && previewCanvasRef.current && crop) {
//                 setCanvasPreview(
//                   imgRef.current, // HTMLImageElement
//                   previewCanvasRef.current, // HTMLCanvasElement
//                   convertToPixelCrop(
//                     crop,
//                     imgRef.current.width,
//                     imgRef.current.height
//                   )
//                 );
//                 const dataUrl = previewCanvasRef.current.toDataURL();
//                 updateAvatar(dataUrl);
//                 closeModal();
//               }
//             }}
//           >
//             Crop Image
//           </button>
//         </div>
//       )}
//       {crop && (
//         <canvas
//           ref={previewCanvasRef}
//           className="mt-4"
//           style={{
//             display: "none",
//             border: "1px solid black",
//             objectFit: "contain",
//             width: 150,
//             height: 150,
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default ImageCropper;