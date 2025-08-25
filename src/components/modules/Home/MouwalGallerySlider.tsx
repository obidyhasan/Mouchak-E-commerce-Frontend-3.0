/* eslint-disable react-hooks/exhaustive-deps */
import { setLoading } from "@/redux/features/loadingSlice";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetMouwalImagesQuery } from "@/redux/features/mouwalGallery/mouwalGallery.api";
import { useAppDispatch } from "@/redux/hook";

type GalleryItem = {
  _id: string;
  image: string;
};

const MouwalGallerySlider = () => {
  const { data = [], isLoading } = useGetMouwalImagesQuery(undefined);
  const dispatch = useAppDispatch();

  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  // Repeat items if less than 6, then duplicate for smooth loop
  const base = useMemo<GalleryItem[]>(() => {
    if (!data.length) return [];
    if (data.length >= 6) return data;
    const repeat = Math.ceil(6 / data.length);
    return Array.from({ length: repeat })
      .flatMap(() => data)
      .slice(0, Math.max(6, data.length * repeat));
  }, [data]);

  const marqueeItems = useMemo(() => [...base, ...base], [base]);

  const slideWidth = 320 + 8; // width + gap

  // --- Auto Scroll ---
  const startAutoScroll = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev === base.length ? 0 : prev + 1));
    }, 2000); // 2s
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if (base.length > 1) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [base]);

  const handlePrev = () => {
    stopAutoScroll();
    setCurrentIndex((prev) => (prev === 0 ? base.length : prev - 1));
    startAutoScroll();
  };

  const handleNext = () => {
    stopAutoScroll();
    setCurrentIndex((prev) => (prev === base.length ? 0 : prev + 1));
    startAutoScroll();
  };

  return (
    <div>
      <div className="relative my-10 overflow-hidden w-full">
        {/* Slider Track */}
        <div
          className="flex transition-transform duration-700 ease-linear gap-2 "
          style={{
            transform: `translateX(-${currentIndex * slideWidth}px)`,
          }}
        >
          {marqueeItems.map((gallery: GalleryItem, idx: number) => (
            <div
              key={`${gallery._id}-${idx}`}
              className="shrink-0"
              style={{
                width: "320px",
                height: "384px",
              }}
            >
              <img
                src={gallery.image}
                alt="gallery"
                className="w-full h-full object-cover rounded-md"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-2 my-4">
          {/* Prev Button */}
          <Button
            size={"icon"}
            onClick={handlePrev}
            className="hover:scale-110 transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          {/* Next Button */}
          <Button
            size={"icon"}
            onClick={handleNext}
            className=" hover:scale-110 transition"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MouwalGallerySlider;
