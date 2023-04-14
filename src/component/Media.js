import React from 'react';

import ReactPlayer from 'react-player';

// import video from "../../Assets/Home - Premium Blinds UK Shop - 29 June 2022.mp4";

const MediaUI = ({url}) => {

  return (
    <div className='video__Player'>
     
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
      
          url={url}
          playing={false}
          width="100%"
          height="100%"
          // muted={true}
          controls={true}
          listType="playlist"
          light="https://images.unsplash.com/photo-1611162616475-46b635cb6868?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dGh1bWJuYWlsfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          config={{
            
            file: {
              attributes: {
                onContextMenu: (e) => e.preventDefault(),
                controlsList: 'nodownload',
              },
            },
            youtube: { playerVars: { disablekb: 1 } }
          }}
        />
      </div>
    </div>
  );
};

export default MediaUI;
