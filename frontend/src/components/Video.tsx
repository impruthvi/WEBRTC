import { forwardRef, useImperativeHandle, useRef } from "react";

export interface VideoProps {
  title: string;
  muted?: boolean;
}

export interface VideoHandle {
  setStream: (stream: MediaStream) => void;
}

const Video = forwardRef<VideoHandle, VideoProps>(
  ({ title, muted = true }, ref) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useImperativeHandle(ref, () => ({
      setStream: (stream: MediaStream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch((error) => {
            console.error("Error attempting to play video:", error);
          });
        }
      },
    }));

    return (
      <div>
        <h2>{title}</h2>
        <video
          ref={videoRef}
          muted={muted}
          style={{ width: "100%", height: "auto" }}
        ></video>
      </div>
    );
  }
);

export default Video;
