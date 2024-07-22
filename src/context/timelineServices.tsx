import request from "superagent";

const API_URL = 'http://139.59.47.49:4004/api';

export const getTimelines = async (filter: { limit: number; start: number; date?: string | null }) => {
  try {
    console.log(filter);
    let query = {
      ...filter,
      orderby: 0,
    };

    if (filter.date !== null && filter.date !== undefined) {
      query = {
        ...query,
        date: filter.date,
      };
    }

    const response = await request
      .get(`${API_URL}/posts`)
      .query(query)
      .set('Accept', 'application/json');

    console.log(response.body);
    return response.body;
  } catch (error) {
    console.error('Failed to fetch timelines:', error);
    throw new Error('Failed to fetch timelines');
  }
};


export const getFilterTimelines = async (filters: { date: string }) => {
  try {
    const response = await request
      .get(`${API_URL}/posts`)
      .query(filters)
      .set('Accept', 'application/json');  // Ensure correct headers are set
    return response.body;
  } catch (error) {
    console.error('Failed to fetch timelines with filters:', error);
    throw new Error('Failed to fetch timelines with filters');
  }
};

export const addTimeline = async (data: { post: string, background: string }) => {
  try {
    console.log(data);
    const response = await request
      .post(`${API_URL}/post`)
      .send(data)
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json');
    return response.body;
  } catch (error) {
    console.error('Failed to add timeline:', error);
    throw new Error('Failed to add timeline');
  }
};

export const deleteTimeline = async (id: number) => {
  try {
    const response = await request
      .delete(`${API_URL}/post/delete/${id}`)
      .set('Accept', '*/*');
    return response.body;
  } catch (error) {
    console.error('Failed to delete timeline:', error);
    throw new Error('Failed to delete timeline');
  }
};

export const editTimeline = async (data: { id: number; post: string }) => {
  try {
    console.log(data);
    const response = await request
      .put(`${API_URL}/post`)
      .send(data)
      .set('Accept', '*/*')
      .set('Content-Type', 'application/json');
    console.log(response.body);
    return response.body;
  } catch (error) {
    console.error('Failed to edit timeline:', error);
    throw new Error('Failed to edit timeline');
  }
};
