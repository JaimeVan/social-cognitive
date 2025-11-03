import { useState } from "react";
import { Button } from "@/components/ui/button";

const wordclouds = ["/images/wordcloud_1.png", "/images/wordcloud_2.png", "/images/wordcloud_3.png"];

export function WordCloudSlider() {
  const [index, setIndex] = useState(0);
  return (
    <div className="flex flex-col items-center gap-4">
      <img src={wordclouds[index]} alt="词云" className="w-96 h-96 object-contain rounded-xl shadow" />
      <div className="flex gap-2">
        <Button onClick={() => setIndex((index - 1 + wordclouds.length) % wordclouds.length)}>上一个</Button>
        <Button onClick={() => setIndex((index + 1) % wordclouds.length)}>下一个</Button>
      </div>
    </div>
  );
}