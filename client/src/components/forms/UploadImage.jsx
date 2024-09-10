import React, { useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { Alert } from "../Alert";
import PropTypes from "prop-types";
import "./UploadImage.css";

export const UploadImage = ({ setValue, defaultImage }) => {
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [successMsg, setSuccessMsg] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isChangeImage, setIsChangeImage] = useState(false);

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      //  (10 MB = 10 * 1024 * 1024 bayt)
      if (file.size > 10 * 1024 * 1024) {
        setErrMsg("File size exceeds 10 MB limit.");
        setSelectedFile(null);
        setPreviewSource("");
        return;
      }

      previewFile(file);
      setSelectedFile(file);
      setFileInputState(e.target.value);
      setErrMsg("");
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleSubmitFile = (e) => {
    e.preventDefault();
    if (!selectedFile) {
      setErrMsg("Please upload an image");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onloadend = () => {
      uploadImage(reader.result);
    };
    reader.onerror = () => {
      setErrMsg("Something went wrong!");
    };
  };

  const handleCancel = () => {
    setPreviewSource("");
    setIsChangeImage(false);
    setFileInputState("");
  };

  useEffect(() => {
    return () => cancelFetch();
  }, [cancelFetch]);

  const onReceived = (data) => {
    setUploadedImage(data?.data?.url);
  };
  const { error, performFetch, cancelFetch } = useFetch("/upload", onReceived);

  const uploadImage = async (base64EncodedImage) => {
    try {
      performFetch({
        method: "POST",
        body: JSON.stringify({ data: base64EncodedImage }),
        headers: { "Content-Type": "application/json" },
      });
      setFileInputState("");
      setPreviewSource("");
      setSuccessMsg("Image uploaded successfully");
    } catch (err) {
      setErrMsg("Something went wrong!");
    }
  };

  useEffect(() => {
    if (uploadedImage) {
      setValue("profile_picture", uploadedImage);
      setIsChangeImage(false);
      setUploadedImage(null);
    }
  }, [uploadedImage]);

  const imageUrl =
    defaultImage && !isChangeImage
      ? defaultImage
      : previewSource
        ? previewSource
        : defaultImage;

  return (
    <div className="upload-image">
      {errMsg && <div className="error-message">{errMsg}</div>}
      {error && <Alert msg={error?.toString()} type="danger" />}
      {successMsg && <Alert msg={successMsg} type="success" />}
      <img
        className="pro-img avatar"
        src={imageUrl}
        alt="chosen"
        style={{ height: "300px" }}
      />
      {isChangeImage ? (
        <>
          <input
            id="fileInput"
            type="file"
            name="image"
            onChange={handleFileInputChange}
            value={fileInputState}
            className="form-input"
          />
          <div className="button-group">
            <button
              disabled={!selectedFile || !previewSource}
              className="btn upload-image-btn"
              onClick={handleSubmitFile}
            >
              Upload Image
            </button>
            <button className="btn" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </>
      ) : (
        <button className="btn" onClick={() => setIsChangeImage(true)}>
          Change Image
        </button>
      )}
    </div>
  );
};

UploadImage.propTypes = {
  setValue: PropTypes.func.isRequired,
  defaultImage: PropTypes.string,
};
