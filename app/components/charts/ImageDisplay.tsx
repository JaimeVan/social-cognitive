type ImageDisplayProps = {
  src: string;
  alt?: string;
  className?: string; // 新增
};

export function ImageDisplay({ src, alt, className }: ImageDisplayProps) {
  return (
    <div className="flex justify-center items-center h-full">
      <img
        src={src}
        alt={alt || "图片展示"}
        className={`w-full max-w-3xl rounded-xl shadow object-contain ${className || ''}`}
      />
    </div>
  );
}