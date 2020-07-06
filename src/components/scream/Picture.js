import React, { useState } from "react";
import Viewer from "react-viewer";
import "./Picture.css";

const Picture = ({ images }) => {
  if (!images) {
    return <></>;
  }

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState([]);
  const [newImages, setNewImages] = useState([]);

  const openModal = (e) => {
    setActiveIndex(images.indexOf(e.target.src));
    getNewList();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getNewList = () => {
    let k = [];
    images.forEach((e) => {
      k.push({ src: e });
    });
    setNewImages(k);
  };

  const V = (
    <Viewer
      zIndex={9999}
      activeIndex={activeIndex}
      minScale={1}
      onMaskClick={handleClose}
      visible={open}
      rotatable={false}
      zoomSpeed={1}
      scalable={false}
      images={newImages}
      onClose={handleClose}
    />
  );

  switch (images.length) {
    case 1:
      return (
        <>
          <div className="one-picture" onClick={openModal}>
            <img alt="image1" src={images[0]}></img>
          </div>
          {V}
        </>
      );

    case 2:
      return (
        <>
          <div className="two-picture" onClick={openModal}>
            <img alt="image1" src={images[0]}></img>
            <img alt="image2" src={images[1]}></img>
          </div>
          {V}
        </>
      );
    case 3:
      return (
        <>
          <div className="three-picture" onClick={openModal}>
            <div>
              <img alt="image1" src={images[0]}></img>
            </div>
            <div>
              <img alt="image2" src={images[1]}></img>
              <img alt="image3" src={images[2]}></img>
            </div>
          </div>
          {V}
        </>
      );
    case 4:
      return (
        <>
          <div className="four-picture" onClick={openModal}>
            <div>
              <img alt="image1" src={images[0]}></img>
              <img alt="image2" src={images[1]}></img>
            </div>
            <div>
              <img alt="image3" src={images[2]}></img>
              <img alt="image4" src={images[3]}></img>
            </div>
          </div>
          {V}
        </>
      );
  }
};

export default Picture;
