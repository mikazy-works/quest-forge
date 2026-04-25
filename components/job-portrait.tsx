import Image from "next/image";
import { getPortraitSpec } from "@/lib/job-portrait";

type JobPortraitProps = {
  jobName: string;
  element: string;
};

export function JobPortrait({ jobName, element }: JobPortraitProps) {
  const { palette, title, imagePath } = getPortraitSpec(jobName, element);

  return (
    <div
      className="job-portrait-frame"
      style={{
        background: `radial-gradient(circle at 50% 35%, ${palette.glow}, rgba(8, 16, 31, 0) 58%)`
      }}
    >
      <Image
        src={imagePath}
        alt={title}
        width={342}
        height={768}
        className="job-portrait-svg"
        sizes="(max-width: 920px) 100vw, 320px"
        priority={false}
      />
    </div>
  );
}
