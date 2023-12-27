import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/useApp';
import './watchPage.css';
import { getVideoDetails } from '@/store/reducers/getVideoDetails';
import { getRecommendedVideos } from '@/store/reducers/getRecommendedVideo';

const WatchPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const currentPlaying = useAppSelector(
    (state) => state.youtube.currentPlaying,
  );
  const recommendedVideo = useAppSelector(
    (state) => state.youtube.recommendedVideo,
  );

  useEffect(() => {
    if (id) {
      dispatch(getVideoDetails(id));
    } else {
      navigate('/');
    }
  }, [id, navigate, dispatch]);

  useEffect(() => {
    if (currentPlaying && id) dispatch(getRecommendedVideos(id));
  }, [currentPlaying, dispatch, id]);
  return (
    <div className="watch-page-container">
      <iframe
        src={`https://www.youtube.com/embed/${id}?autoplay-1`}
        width={800}
        height={502}
        allowFullScreen
        title="lecteur youtube"
      ></iframe>
    </div>
  );
};

export default WatchPage;
