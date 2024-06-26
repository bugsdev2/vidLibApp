import { useContext, useEffect, useState } from "react";
import { Context } from "../../App";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export default function VideosPage() {
  const { categoryName } = useContext(Context);
  const [videosList, setVideosList] = useState([]);
  const [cookie] = useCookies(["username"]);
  const navigate = useNavigate();

  interface Video {
    id: number;
    title: string;
    videoCode: string;
    description: string;
    category: string;
  }

  // IF COOKIE NOT SAVED, RETURN TO LOGIN SCREEN
  useEffect(() => {
    if (
      !cookie.username ||
      cookie.username === undefined ||
      cookie.username === "admin"
    ) {
      navigate("/login");
    }
  }, [cookie.username]);

  useEffect(() => {
    localStorage.setItem("category", categoryName);
    axios
      .get(
        `https://vidlibapp-api.onrender.com/get-videos/${localStorage.getItem(
          "category"
        )}`
      )
      .then((res) => {
        setVideosList(res.data);
      });
  }, []);

  const videos = videosList.map((video: Video) => {
    let description: string | null = null;

    if (video.description.length > 100) {
      description = video.description.slice(0, 350);
      description += "...";
    }

    return (
      <div
        key={video.id}
        className="flex flex-col bg-[rgba(355,355,355,0.1)] hover:bg-[rgba(355,355,355,0.13)] rounded-md mb-4 p-4"
      >
        <div className="flex flex-col  justify-stretch">
          <div className="text-2xl text-center font-bold uppercase tracking-widest text-primary">
            {video.title}
          </div>
          <iframe
            className="text-center border"
            // width="250"
            // height="115"
            src={`https://www.youtube.com/embed/${video.videoCode}`}
            title={`${video.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div title={video.description} className="mt-4 text-sm">
          {description}
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
        {videos}
      </div>
    </>
  );
}
