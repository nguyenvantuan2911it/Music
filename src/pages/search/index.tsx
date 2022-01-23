import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/app/hooks';
import MainLayout from 'src/components/common/LayOut/Layout';
import { searchListTrackAsync, selectTrack } from 'src/features/track/Trackslice';
import ListTrack from '../../components/TrackModule/ListTrack';
function SearchMusic() {
  const { listTrackSearch, isLoading } = useAppSelector(selectTrack);
  const [newfilter, setNewfilter] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchListTrackAsync(newfilter));
  }, [newfilter]);
  const handleSearch = (e) => {
    const { value } = e.target;
    setNewfilter(value);
  };
  return (
    <MainLayout disableTab>
      <div className="my-20">
        <input
          className=" mt-10 border-2 border-gray-100 w-full h-16 bg-black px-8 text-xl text-white"
          placeholder="Search..."
          onChange={handleSearch}
          defaultValue=""
        />
        {/* <Feature music_sound="music" type_music="" listFeature={listMuic} title="" /> */}
        {!isLoading && (
          <div>
            {listTrackSearch.length > 0 ? (
              <ListTrack listTrack={listTrackSearch}></ListTrack>
            ) : (
              <div className="my-10 text-4xl">No track found</div>
            )}
          </div>
        )}
      </div>
      <div className="h-28"></div>
    </MainLayout>
  );
}
export default SearchMusic;
