import React, { useEffect, useContext, useState } from 'react';
import { Avatar, Card, Divider, Pagination, Spin } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { TimelineContext } from '../context/apiContext';
import { Timeline, TimelineContextProps } from '../@types/timeline';
import profileImage from '../Assests/profilepic.jpg';
import OptionButton from './optionButton';

const Posts: React.FC = () => {
  const { timelines, loading, fetchTimelines } = useContext(TimelineContext) as TimelineContextProps;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>();

  const navigate = useNavigate();
  const location = useLocation();

  // Extract query parameters
  const searchParams = new URLSearchParams(location.search);
  const paginationParam = Number(searchParams.get('pagination')) || 1;
  const limitParam = Number(searchParams.get('limit')) || 5;
  console.log(timelines, 'timelines');
  const data = {
    limit: limitParam,
    start: currentPage,
    date: null,
  };

  const handlePagination = (page: number, pageSize: number) => {
    setCurrentPage(page);
    searchParams.set('pagination', page.toString());
    searchParams.set('limit', pageSize.toString());

    navigate({
      pathname: location.pathname,
      search: `?${searchParams.toString()}`,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchTimelines(data); // Ensure fetchTimelines returns a number
        // setTotalItems(total.length); // Set total items based on the fetched data
      } catch (error) {
        console.error('Failed to fetch timelines:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <>
      <Divider />
      <div style={{ position: 'relative', minHeight: '200px' }}>
        {loading && (
          <Spin
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 10,
            }}
          />
        )}
        <div>
          {!Array.isArray(timelines) || timelines.length === 0 ? (
            <h1 style={{ textAlign: 'center' }}>No timelines found.</h1>
          ) : (
            timelines.map((timeline: Timeline) => (
              <Card
                hoverable={true}
                key={timeline.id}
                className="custom-card"
                style={{ margin: 'auto', width: '85%', marginBottom: '10px' }}
                cover={
                  <div className="cardProfile">
                    <div className="cardName">
                      <Avatar
                        src={profileImage}
                        style={{ marginRight: 8, border: '1px solid grey' }}
                      />
                      <Card.Meta title={'Name'} />
                    </div>
                    <OptionButton timelineId={timeline.id} timelineBg={timeline.background} />
                  </div>
                }
              >
                <div className="cardImage">
                  <img
                    alt="meta background"
                    src={`http://139.59.47.49:4004/uploads/${timeline.background}`}
                    style={{ width: '100%', height: '45%' }}
                  />
                  <div className="cardContent">
                    <h1 style={{ margin: 0 }}>{timeline.post}</h1>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
      <Pagination
        current={paginationParam}
        pageSize={limitParam}
        total={50}
        hideOnSinglePage={true}
        disabled={loading}
        onChange={handlePagination}
        style={{ textAlign: 'center', marginTop: '20px' }}
      />
    </>
  );
};

export default Posts;
