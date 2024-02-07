/**
 * This file defines a React component 'HotelPhotoGallery' that represents a gallery
 * of hotel room photos. It displays a main photo with thumbnails and controls for
 * navigating through the photos, and supports opening a modal to view the photos in
 * full screen. It uses useState hook to manage state for current photo index and modal visibility.
 */

"use client";

import { FC, useState } from "react";
import Image from "next/image";

import { Image as ImageType } from "@/models/room";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const HotelPhotoGallery: FC<{ photos: ImageType[] }> = ({ photos }) => {
  // State to manage the index of the current photo being displayed
  const [currenPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // State to manage the visibility of the modal for full-screen photo view
  const [showModal, setShowModal] = useState(false);

  // Function to open the modal and set the current photo index
  const openModal = (index: number) => {
    setCurrentPhotoIndex(index);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => setShowModal(false);

  // Function to handle navigation to the previous photo
  const handlePrevious = () => {
    setCurrentPhotoIndex(prevIndex => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };

  // Function to handle navigation to the next photo
  const handleNext = () => {
    setCurrentPhotoIndex(prevIndex => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };

  // Constants for managing photo display
  const maximumVisiblePhotos = 4; // Maximum number of visible photos in the grid
  const totalPhotos = photos.length; // Total number of photos
  const displayPhotos = photos.slice(1, maximumVisiblePhotos - 1); // Photos to display in the grid
  const remainingPhotosCount = totalPhotos - maximumVisiblePhotos; // Count of remaining photos

  return (
    <div className="container mx-auto">
      <div className="grid md:grid-cols-2 relative gap-5 px-3">
        {/* Main photo display */}
        <div className="h-[540px] relative rounded-2xl overflow-hidden">
          <div className="hidden md:flex justify-center items-center w-full h-full">
            {/* Main photo displayed with click handler to open modal */}
            <Image src={photos[0].url} alt={`Room Photo ${currenPhotoIndex + 1}`} className="img scale-animation cursor-pointer" width={150} height={150} onClick={openModal.bind(this, 0)} />
          </div>
          <div className="md:hidden flex justify-center items-center w-full h-full">
            {/* Main photo displayed in smaller screens with click handler to open modal */}
            <Image src={photos[currenPhotoIndex].url} alt={`Room Photo ${currenPhotoIndex + 1}`} className="img" width={150} height={150} onClick={openModal.bind(this, 0)} />
          </div>
        </div>
        {/* Navigation controls for smaller screens */}
        <div className="md:hidden flex justify-between items-center">
          <div className="flex space-x-2">
            <FaArrowLeft className="cursor-pointer" onClick={handlePrevious} />
            <FaArrowRight className="cursor-pointer" onClick={handleNext} />
          </div>
          {/* Display current photo index */}
          <span>
            {currenPhotoIndex + 1} / {photos.length}
          </span>
        </div>

        {/* Thumbnail grid display for larger screens */}
        <div className="hidden md:grid grid-cols-2 h-full gap-5">
          {/* Thumbnails for displayed photos */}
          {displayPhotos.map((photo, index) => (
            <div key={index} className="cursor-pointer h-64 rounded-2xl overflow-hidden">
              <Image width={150} height={150} src={photo.url} alt={`Room Photo ${index + 2}`} className="img scale-animation" />
            </div>
          ))}
          {/* Thumbnail for remaining photos */}
          {remainingPhotosCount > 0 && (
            <div className="cursor-pointer relative h-64 rounded-2xl overflow-hidden" onClick={openModal.bind(this, maximumVisiblePhotos)}>
              {/* Thumbnail with overlay indicating remaining photos */}
              <Image width={150} height={150} src={photos[maximumVisiblePhotos - 1].url} alt={`Room Photo ${maximumVisiblePhotos}`} className="img" />
              <div className="absolute cursor-pointer text-white inset-0 flex justify-center bg-[rgba(0,0,0,0.5)] items-center text-2xl">+ {remainingPhotosCount}</div>
            </div>
          )}
        </div>

        {/* Modal for full-screen photo view */}
        {showModal && (
          <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-90 z-[55]">
            <div className="h-[75vh] w-[320px] md:w-[700px] relative">
              {/* Current photo displayed in modal */}
              <Image src={photos[currenPhotoIndex].url} alt={`Room Photo ${currenPhotoIndex + 1}`} width={150} height={150} className="img" />
              <div className="flex justify-between items-center py-3">
                {/* Navigation controls in modal */}
                <div className="flex space-x-2 items-center text-white">
                  <FaArrowLeft className="cursor-pointer" onClick={handlePrevious} />
                  <FaArrowRight className="cursor-pointer" onClick={handleNext} />
                </div>
                {/* Display current photo index in modal */}
                <span className="text-white text-sm">
                  {currenPhotoIndex + 1} / {photos.length}
                </span>
              </div>
              {/* Close button for modal */}
              <button className="absolute top-2 right-2 text-white text-lg" onClick={closeModal}>
                <MdCancel className="font-medium text-2xl text-tertiary-dark" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelPhotoGallery;
