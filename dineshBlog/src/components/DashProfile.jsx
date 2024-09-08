import { Alert, Button, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import { useRef } from "react";
import { useSelector } from "react-redux";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import {
  getDownloadURL,
  getStorage,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { ref } from "firebase/storage";
import {
  updateStart,
  updateSuccess,
  updateFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const [imageFileUploadProgress, setimageFileUploadProgress] = useState(null);
  const [imageFileUploadErr, setimageFileUploadErr] = useState(null);
  const [formData, setFromData] = useState({});
  const [imgFileUpload, setImgFileUpload] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserErr, setUpdateUserErr] = useState(null);

  const dispatch = useDispatch();

  const filePickerRef = useRef();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);

  const uploadImage = () => {
    setImgFileUpload(true);
    setimageFileUploadErr(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setimageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setimageFileUploadErr(
          "Could not upload image (File must be less than 2MB)"
        );
        setimageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImgFileUpload(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFromData({ ...formData, profilePicture: downloadURL });
          setImgFileUpload(false);
        });
      }
    );
  };

  const handleChange = (e) => {
    setFromData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateUserErr(null)
    setUpdateUserSuccess(null)
    if (Object.keys(formData).length === 0) {
      setUpdateUserErr("No changes made");
      return;
    }
    if (imgFileUpload) {
      setUpdateUserErr("Please wait for image to upload")
      return;
    }
    try {
      dispatch(updateStart());
      console.log(currentUser._id);
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      if (!res.ok) {

        dispatch(updateFailure(data.message));
        setUpdateUserErr(data.message)
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User's profile updated successfully");
      }
    } catch (error) {
      dispatch(updateFailure(error.message));
      setUpdateUserErr(error.message)
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-3xl">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-xl rounded-full"
          onClick={() => filePickerRef.current.click()}
        >
          {imageFileUploadProgress && (
            <CircularProgressbar
              value={imageFileUploadProgress || 0}
              text={`${imageFileUploadProgress}%`}
              strokeWidth={5}
              styles={{
                root: {
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                },
                path: {
                  stroke: `rgba(62,152,199,${imageFileUploadProgress / 100})`,
                },
              }}
            />
          )}
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="userPic"
            className={`rounded-full w-full h-full border-8 object-cover border-[lightgray] ${
              imageFileUploadProgress &&
              imageFileUploadProgress < 100 &&
              "opacity-50"
            }`}
          />
        </div>
        {imageFileUploadErr && (
          <Alert color="failure">{imageFileUploadErr}</Alert>
        )}

        <TextInput
          type="text"
          placeholder="Username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          placeholder="name@Ccompany.com"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <Button type="submit" gradientDuoTone="purpleToBlue" outline>
          Update
        </Button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delete Account</span>
        <span className="text-red-500 cursor-pointer">Sign Out</span>
      </div>
      {updateUserSuccess && (
        <Alert color="success" className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserErr && (
        <Alert color="failure" className="mt-5">
          {updateUserErr}
        </Alert>
      )}
    </div>
  );
};

export default DashProfile;
