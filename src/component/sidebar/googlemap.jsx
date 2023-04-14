const GoogleMap = ({ src }) => {
  return (
    <div className="map-area">
      <div className="maps">
        <iframe src={src}></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;
