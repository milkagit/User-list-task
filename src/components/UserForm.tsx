import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd';
import { User } from '../api/users';

interface UserFormProps {
    initialUserValues: User
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

const UserForm: React.FC<UserFormProps> = ({ initialUserValues, onFinish }) => {
    const [form] = Form.useForm();
    const { id, ...initialValues } = initialUserValues
    const [isTouched, setIsTouched] = useState(false);

    useEffect(() => {
        form.setFieldsValue(initialUserValues);
    }, [initialUserValues, form]);

    const handleTouchField = () => {
        setIsTouched(form.isFieldsTouched())
    }


    return (
        <Form
            form={form}
            name={`user-form-${id}`}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={initialUserValues}
            onFinish={onFinish}
            // onFinishFailed={}
            autoComplete="off"
            validateMessages={validateMessages}
            variant="filled"
            onFieldsChange={handleTouchField}
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
            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}> */}
            {isTouched && <Button type="primary" htmlType="submit">
                Submit
            </Button>}
            {/* </Form.Item> */}
            {/* <Form.Item wrapperCol={{ offset: 8, span: 16 }}> */}
            {isTouched && <Button type="primary" htmlType="submit" onClick={() => form.resetFields()}>
                Cancel
            </Button>}
            {/* </Form.Item> */}
        </Form>
    )
}

export default React.memo(UserForm);