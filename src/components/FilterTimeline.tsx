import React, { useContext, useState } from "react";
import { Button, DatePicker, Modal, Typography } from "antd";
import moment, { Moment } from "moment";
import { TimelineContextProps } from "../@types/timeline";
import { TimelineContext } from '../context/apiContext';

const FilterTimeline: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Moment | null>(null);
  const { fetchTimelines, loading } = useContext(TimelineContext) as TimelineContextProps;
  let filter: any = {
    limit: 10,
    start: 1,
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    if (selectedDate) {
      filter['date'] = selectedDate.format('YYYY-MM-DD');
    } else {
      delete filter['date'];
    }

    console.log(filter);
    fetchTimelines(filter);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date: Moment | null, dateString: string | string[]) => {
    if (typeof dateString === 'string') {
      setSelectedDate(date); // Update selectedDate with Moment object
    }
  };

  const handleRemoveFilter = () => {
    setSelectedDate(null);
    delete filter['date'];
    fetchTimelines(filter);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type='default' onClick={showModal}>
        Filter posts
      </Button>
      <Modal
        title="Filter Posts"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        confirmLoading={loading}
        footer={[
          <Button key="filter" type='default' onClick={handleOk}>
            Filter
          </Button>,
          <Button key="remove" type='link' onClick={handleRemoveFilter}>
            Remove Filter
          </Button>,
        ]}
      >
        <Typography.Paragraph>Filter posts by timeline</Typography.Paragraph>
        <DatePicker
          onChange={handleDateChange}
          defaultValue={null}
          value={selectedDate}
        />
      </Modal>
    </>
  );
};

export default FilterTimeline;
