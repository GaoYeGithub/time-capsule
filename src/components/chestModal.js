import React, { useRef, useEffect, useState } from "react";
import { useTransition, a } from "react-spring";
import chestCloseSound from "../assets/sound/close-chest.mp3";

const closeChest = new Audio(chestCloseSound);

const ChestModal = ({ open, setOpen }) => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const iframeRef = useRef(null);

  const closeModal = () => {
    setOpen(!open);
    closeChest.volume = 0.3;
    closeChest.play();
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return '';
    
    let videoId = '';
    
    if (url.includes('youtu.be')) {
      videoId = url.split('youtu.be/')[1];
    } 
    else if (url.includes('youtube.com/watch')) {
      const urlParams = new URLSearchParams(url.split('?')[1]);
      videoId = urlParams.get('v');
    }

    if (!videoId) return '';
    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  useEffect(() => {
    const fetchLatestBox = async () => {
      try {
        const response = await fetch('https://discord-mystery.pockethost.io/api/collections/boxes/records?sort=-created&page=1&perPage=1');
        const data = await response.json();
        
        if (data.items && data.items.length > 0) {
          const youtubeUrl = data.items[0].field;
          setYoutubeUrl(getYoutubeEmbedUrl(youtubeUrl));
        }
      } catch (error) {
        console.error("Error fetching YouTube URL:", error);
      }
    };

    if (open) {
      fetchLatestBox();
    }
  }, [open]);

  const transitions = useTransition(open, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions.map(
    ({ item, key, props }) =>
      item && (
        <a.div key={key} style={props} className="modal-chest-wrapper">
          <div onClick={closeModal} className="overlay" />
          <div className="modal-chest">
            <div className="top">
              <div className="header">
                <h4>Surprise!</h4>
                <div onClick={closeModal} className="close">
                  x
                </div>
              </div>
              <div className="video-container">
                {youtubeUrl ? (
                <iframe
                  ref={iframeRef}
                  src={youtubeUrl}
                  className="surprise-video"
                  style={{
                    width: '100%',
                    height: '70vh',
                    border: 'none'
                  }}
                  title="YouTube Video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
                ) : (
                  <div className="loading-state">
                    Loading surprise...
                  </div>
                )}
              </div>
            </div>
          </div>
        </a.div>
      )
  );
};

export default ChestModal;