import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PlayModal from "../components/PlayModal/PlayModal";

export function usePlayAction() {
  const navigate = useNavigate();
  const { playerProfile } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handlePlayRequest() {
    if (playerProfile) {
      navigate("/levels");
    } else {
      setIsModalOpen(true);
    }
  }

  const renderPlayModal = () => (
    <PlayModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
    />
  );

  return { handlePlayRequest, renderPlayModal };
}
