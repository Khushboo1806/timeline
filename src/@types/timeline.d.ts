export interface Timeline {
    id: number;
    post: string;
    background: string;
    status?: number;
  }
  
export type TimelineContextProps = {
    timelines: Timeline[];
    loading: boolean;
    fetchTimelines: (filter: { limit: number; start: number; date?: string | null }) => void;
    addNewTimeline: (data: { post: string; background: string }) => void;
    removeTimeline: (id: number) => void;
    modifyTimeline: (data: { id:number ,post: string }) => void;
  }
  