import { cloudinary } from "../util/cloudinary.js";

export const populatePhoto = async (req, res) => {
  try {
    const fileStr = req.body.data;
    const fileSizeInBytes = Buffer.byteLength(fileStr, "base64");
    const fileSizeInMB = fileSizeInBytes / (1024 * 1024);

    if (fileSizeInMB > 10) {
      // 10 MB limit
      return res
        .status(400)
        .json({ success: false, msg: "File size exceeds 10 MB limit." });
    }

    const uploadResponse = await cloudinary.uploader.upload(fileStr, {
      upload_preset: "dev_setups",
    });

    res
      .status(201)
      .json({ success: true, msg: "Upload successful", data: uploadResponse });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
