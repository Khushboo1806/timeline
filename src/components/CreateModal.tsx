import React, { useContext, useState } from "react";
import { Button, Form, Input, Modal, Upload, UploadFile, Spin } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { TimelineContext } from '../context/apiContext';
import { TimelineContextProps } from "../@types/timeline";
import request from 'superagent'; // Ensure you have superagent installed

const CreateModal: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { addNewTimeline, loading } = useContext(TimelineContext) as TimelineContextProps;
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form.submit();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (values: any) => {
    try {
      setUploading(true);
      let payload: any = {
        post: values.text,
      };

      if (fileList.length > 0) {
        const file = fileList[0].originFileObj as File;
        const uploadedImageName = await uploadImage(file);
        payload['background'] = uploadedImageName;
      }

      console.log("Payload:", payload);

      const bodytext = await addNewTimeline(payload);
      console.log(bodytext)
      form.resetFields();
      setFileList([]);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Failed to add timeline', error);
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = ({ fileList }: { fileList: UploadFile[] }) => {
    setFileList(fileList);
    form.setFieldsValue({ image: fileList });
  };

  const uploadImage = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file); // 'file' should match the server-side key

      const res = await request
        .post("http://139.59.47.49:4004/api/upload/image")
        .send(formData) // Send the FormData object
        .set('Accept', '*/*'); // Set headers as needed

      console.log(res.body.filename);
      return res.body.filename;
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('There was an error uploading the image. Please try again.');
      throw error;
    }
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Timeline
      </Button>
      <Modal
        title="Add Timeline"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
        confirmLoading={loading}
      >
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item name="text" rules={[{ required: true, message: 'Please enter text' }]}>
            <Input.TextArea rows={4} placeholder="What's on your mind?" />
          </Form.Item>
          <Form.Item name="image">
            <Upload
              listType="picture"
              fileList={fileList}
              onChange={handleFileChange}
            >
              {fileList.length === 0 ? (
                <Button icon={<PlusOutlined />}>Upload Image</Button>
              ) : null}
            </Upload>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              POST
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {uploading && (
        <div className="loading-overlay">
          <Spin size="large" />
        </div>
      )}
    </>
  );
};

export default CreateModal;
