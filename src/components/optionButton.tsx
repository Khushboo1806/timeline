import React, { useContext } from 'react';
import { Button, Dropdown, Menu, Modal, Input } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { TimelineContextProps } from "../@types/timeline";
import { TimelineContext } from '../context/apiContext';

interface OptionButtonProps {
    timelineId: number;
    timelineBg: string
}

const OptionButton: React.FC<OptionButtonProps> = ({ timelineId, timelineBg }) => {
    const { modifyTimeline, removeTimeline } = useContext(TimelineContext) as TimelineContextProps;

    const showEditBlock = (id: number) => {
        let inputValue = '';

        const handleSave = () => {
            if (inputValue.length < 5) {
                Modal.error({
                    title: 'Error',
                    content: 'The input must be at least 5 characters long.',
                });
                return;
            }

            const data = {
                id: id,
                post: inputValue,
                background: timelineBg,
            };
            modifyTimeline(data);
            console.log('Edited timeline:', data);
        };

        Modal.confirm({
            title: 'Edit Timeline',
            content: (
                <Input
                    placeholder="Enter new text (min: 5 char)"
                    onChange={(e) => inputValue = e.target.value}
                />
            ),
            okText: 'Save',
            onOk: handleSave,
            onCancel() {
                console.log('Cancel edit');
            },
        });
    };

    const showDeleteConfirm = (id: number) => {
        Modal.confirm({
            title: 'Are you sure you want to delete?',
            content: 'This action cannot be undone.',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk() {
                try {
                    removeTimeline(id);
                    console.log('Deleted timeline:', id);
                } catch (e) {
                    console.log('Error:', e);
                }
            },
            onCancel() {
                console.log('Cancel delete');
            },
        });
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (e.key === 'edit') {
            showEditBlock(timelineId);
        } else if (e.key === 'delete') {
            showDeleteConfirm(timelineId);
        }
    };

    const menu = (
        <Menu onClick={handleMenuClick}>
            <Menu.Item key="edit">
                Edit
            </Menu.Item>
            <Menu.Item key="delete">
                Delete
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown overlay={menu} trigger={['click']}>
            <Button icon={<EllipsisOutlined />} type="text" />
        </Dropdown>
    );
};

export default OptionButton;
