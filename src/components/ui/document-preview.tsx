import Image from "next/image";

type DocumentPreviewProps = {
  title: string;
  imageSrc: string;
  isZoomed: boolean;
  setIsZoomed: (value: boolean) => void;
};

export const DocumentPreview = ({
  title,
  imageSrc,
  isZoomed,
  setIsZoomed,
}: DocumentPreviewProps) => {
  return (
    <div>
      <h4 className="text-sm text-gray-600 mb-2">{title}</h4>

      {/* Clickable preview box */}
      <div
        className="w-full h-50 rounded-md border border-gray-200 bg-gray-50 overflow-hidden cursor-pointer hover:opacity-90 transition"
        onClick={() => setIsZoomed(true)}
      >
        <Image
          src={imageSrc}
          alt={title}
          width={600}
          height={300}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Zoomed-in overlay */}
      {isZoomed && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
          onClick={() => setIsZoomed(false)}
        >
          <div className="relative max-w-3xl w-full mx-4">
            <Image
              src={imageSrc}
              alt={`Zoomed ${title}`}
              width={1200}
              height={800}
              className="object-contain w-full h-auto rounded-lg shadow-lg"
            />
            <button
              onClick={() => setIsZoomed(false)}
              className="absolute top-3 right-3 bg-white/80 hover:bg-white text-gray-800 rounded-full px-2 py-1 text-xs font-medium shadow"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
