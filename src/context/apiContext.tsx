import React, { createContext, useState, ReactNode } from "react";
import {
  getTimelines,
  addTimeline as addTimelineService,
  deleteTimeline as deleteTimelineService,
  editTimeline as editTimelineService,
} from "./timelineServices";
import { ConfigProvider } from "antd";
import { Timeline, TimelineContextProps } from "../@types/timeline";

export const TimelineContext = createContext<TimelineContextProps | null>(null);

export const TimelineProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timelines, setTimelines] = useState<Timeline[] | any>([]);
  const [loading, setLoading] = useState(false);

  const fetchTimelines = async (filter: { limit: number; start: number; date?: string | null }) => {
    setLoading(true);
    try {
      const response = await getTimelines(filter);
      setTimelines(response); // Assuming response contains posts
      setLoading(false);
      console.log(response);
      return response; // Assuming the API returns the total number of items
    } catch (error) {
      console.error('Failed to fetch timelines:', error);
      setLoading(false);
      return 0;
    }
  };


  const addNewTimeline = async (data: { post: string, background: string,id?:676 }) => {
    setLoading(true);
    try {
      const arr = [{...data,id:new Date().getMilliseconds()}]
      const newTimeline = await addTimelineService(data);
      // setTimelines((prevTimelines:any) => [ ...prevTimelines, ...arr]); // Update local state
      console.log(timelines,"statatatatatata");
      
      // timelines.push({...data, id: 12345});
      setTimelines([
        ...arr,
        ...timelines
      ])
      console.log(timelines, 'newTimeline');
      return newTimeline;
    } catch (error) {
      console.error('Failed to add timeline:', error);
      setLoading(false);
    }finally{
      setLoading(false);
    }
  };

  const removeTimeline = async (id: number) => {
    setLoading(true);
    try {
      await deleteTimelineService(id);
      setTimelines((prevTimelines:any) => prevTimelines.filter((timeline:any) => timeline.id !== id)); // Update local state
      setLoading(false);
    } catch (error) {
      console.error('Failed to delete timeline:', error);
      setLoading(false);
    }
  };

  const modifyTimeline = async (data: { id: number; post: string }) => {
    setLoading(true);
    try {
      const updatedTimeline = await editTimelineService(data);
      setTimelines((prevTimelines:any) =>
        prevTimelines.map((timeline:any) =>
          timeline.id === data.id ? { ...timeline, post: data.post } : timeline
        )
      ); // Update local state
      setLoading(false);
    } catch (error) {
      console.error('Failed to update timeline:', error);
      setLoading(false);
    }
  };

  return (
    <TimelineContext.Provider
      value={{
        timelines,
        loading,
        fetchTimelines,
        addNewTimeline,
        removeTimeline,
        modifyTimeline
      }}
    >
      <ConfigProvider
        theme={{
          components: {
            Card: {
              colorBgContainer: 'rgba(250, 246, 246, 0.416)'
            },
            Button: {
              colorPrimaryHover: "#4096ff9b"
            }
          }
        }}
      >
        {children}
      </ConfigProvider>
    </TimelineContext.Provider>
  );
};
