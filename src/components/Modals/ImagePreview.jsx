import Image from "next/image";
import { IoMdClose } from "react-icons/io";

const ImagePreview = ({ image, setImagePreview }) => {
  return (
    <div
      className="position-fixed top-0 left-0 "
      style={{
        zIndex: 1000,
        minWidth: "100vw",
        minHeight: "100vh",
        inset: 0,
        backgroundColor: "rgba(0, 0, 0, 0.91)",
      }}
    >
      <div
        className="position-absolute top-0  end-0 p-3"
        style={{ cursor: "pointer" }}
        onClick={() => setImagePreview(false)}
      >
        <IoMdClose color="white" size={30} />
      </div>
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <Image src={image || ""} alt="banner" width={600} height={400} />
      </div>
    </div>
  );
};

export default ImagePreview;
