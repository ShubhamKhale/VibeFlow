import { useRef } from "react";
import { IonContent, IonInput, IonPage } from "@ionic/react";
import createPlaylistImg from "../images/create-playlist-img.png";
import { useNavigate } from "react-router-dom";
import { createPlaylist } from "../services/apiService";
import { getItem } from "../services/storageService";

const CreatePlaylist: React.FC = () => {
  const navigate = useNavigate();
  const playlistNameRef = useRef<HTMLIonInputElement>(null); 

  const handleCreatePlaylist = async () => {
   
    try {
      const playlistName = playlistNameRef.current?.value?.toString() || ""; 
      const userId = await getItem("userId");

      console.log("Playlist Name:", playlistName); 

      const response = await createPlaylist(userId, playlistName);
      console.log("createPlaylist success message", response)
      navigate("/playlist");

    } catch (error) {
      console.log("createPlaylist error message", error)
    }
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="px-5 mt-7 mb-7 overflow-y-hidden">
          <img
            className="object-cover cursor-pointer"
            src={createPlaylistImg}
            alt=""
          />
          <div className="mt-5">
            <p className="mb-0 font-urbanist font-semibold text-center text-lg text-[#060307]">
              Create Playlist
            </p>
            <IonInput
              ref={playlistNameRef} // Use ref to store input element
              className="mt-5 font-urbanist font-semibold text-xl text-center text-[#989A9C]"
              placeholder="Give your playlist a name"
            />
          </div>
          <div className="mt-5 flex items-center justify-center gap-x-5">
            <div className="rounded-lg px-5 py-2.5 bg-[#EDEDED] cursor-pointer hover:opacity-80">
              <p className="mb-0 text-[#060307] font-urbanist text-sm leading-5 text-center">
                Cancel
              </p>
            </div>
            <div
              onClick={handleCreatePlaylist}
              className="rounded-lg px-5 py-2.5 bg-[#FD4E6B] cursor-pointer hover:opacity-80"
            >
              <p className="mb-0 text-white font-urbanist text-sm leading-5 text-center">
                Create
              </p>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreatePlaylist;
