import React, { useEffect } from 'react';
// import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { User } from '../api/users';
import { RuleObject, RuleRender } from 'antd/es/form';
import useUsers from '../hooks/useUsers';
// import { RootState } from '../store';
// import { useSelector } from 'react-redux';

interface UserFormProps {
    initialUserValues: User
    // onFinish: (id: number) => void
    onFinish: (values: Partial<User>) => void
    onCancel: () => void
}

const validateMessages = {
    required: '${label} is required!',
    types: {
        email: 'Not a valid email! Please add @ and a valid domain (all extentions are supported)',
    },
    noEmptySpace: 'No empty spaces allowed!',
};

const onFinish = (values: Partial<User>) => {
    onFinish(values)
}

const UserForm: React.FC<UserFormProps> = ({ initialUserValues, onFinish, onCancel }) => {
    // const userFormData = useSelector((state: RootState) => state.users.editUser);
    // const testFormData = Object.keys(initialUserValues).map(key => (key));
    // const { users } = useUsers();
    const [form] = Form.useForm();
    console.log('initialUserValues', initialUserValues);
    const { id, ...initialValues } = initialUserValues

    useEffect(() => {
        form.setFieldsValue(initialUserValues);
    }, [initialUserValues, form]);


    return (
        <Form
            form={form}
            name="user-form"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={initialUserValues}
            // onFinish={onFinish}
            onFinish={onFinish}
            // onFinishFailed={}
            autoComplete="off"
            validateMessages={validateMessages}
            variant="filled"
        >
            {Object.keys(initialValues).map(key => (
                <Form.Item
                    key={key}
                    label={key.charAt(0).toUpperCase() + key.slice(1)}
                    name={key}
                    hasFeedback
                    tooltip={key === 'email' ? 'No commas, no empty space, add @ and a valid domain' : ''}
                    rules={[
                        // { required: true },
                        key === 'email' ? { type: 'email' } : {},
                        {
                            validator(_, value) {
                                if (value !== '' && value.trim() !== '') {
                                    return Promise.resolve();
                                }
                                if (value === '') {
                                    return Promise.reject(new Error(validateMessages.required));
                                }
                                return Promise.reject(new Error(validateMessages.noEmptySpace));
                            }
                        },
                    ]}
                >
                    <Input />
                </Form.Item>
            )
            )}
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button type="primary" htmlType="submit" onClick={() => form.resetFields()}>
                    {/* <Button type="primary" htmlType="submit" onClick={() => onFinish(id)}> */}
                    Cancel
                </Button>
            </Form.Item>
        </Form>
    )
}

export default UserForm;