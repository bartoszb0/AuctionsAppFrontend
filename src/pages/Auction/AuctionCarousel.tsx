import { Carousel } from "@mantine/carousel";
import { Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import type { Image } from "../../types/types";

type CarouselProps = {
  images: Image[];
};

export default function AuctionCarousel({ images }: CarouselProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedPhoto, setOpenedPhoto] = useState<string | null>(null);

  function openPhoto(img: Image) {
    setOpenedPhoto(img.image);
    open();
  }

  function closePhoto() {
    setOpenedPhoto(null);
    close();
  }

  const carouselSlides = images.map((img) => {
    return (
      <Carousel.Slide key={img.id}>
        <img
          src={img.image}
          style={{
            width: "300px",
            minHeight: "300px",
            objectFit: "contain",
          }}
          onClick={() => openPhoto(img)}
        />
      </Carousel.Slide>
    );
  });

  return (
    <>
      <Carousel
        withIndicators={images.length > 1}
        withControls={images.length > 1}
        styles={{
          control: {
            backgroundColor: "rgba(144, 46, 148, 0.5)",
            color: "white",
            border: "none",
          },
          indicator: {
            backgroundColor: "rgba(144, 46, 148, 0.5)",
            width: 10,
            height: 10,
          },
        }}
        controlSize={40}
        w={300}
      >
        {carouselSlides}
      </Carousel>
      <Modal opened={opened} onClose={closePhoto} size="xl" centered>
        {openedPhoto && (
          <img
            src={openedPhoto}
            style={{
              width: "100%",
              minHeight: "100%",
              objectFit: "contain",
            }}
          ></img>
        )}
      </Modal>
    </>
  );
}
