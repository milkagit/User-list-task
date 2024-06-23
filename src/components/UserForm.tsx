import React, { useEffect, useRef, useState } from 'react';
import { Button, Flex, Form, Input } from 'antd';
import { User } from '../api/users';
import useUsers from '../hooks/useUsers';

interface UserFormProps {
  initialUserValues: User
  filterUser: number
}

const validateMessages = {
  required: '${label} is required!',
  types: {
    email: 'Not a valid email! Please add @ and a valid domain (all extentions are supported)',
  },
  noEmptySpace: 'No empty spaces allowed!',
};



const UserForm: React.FC<UserFormProps> = ({ initialUserValues, filterUser }) => {
  const [form] = Form.useForm();
  const { id, ...initialValues } = initialUserValues
  const [isTouched, setIsTouched] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const { updateUser } = useUsers();
  const formRef = useRef<any>(null);
  const stateRef = useRef(initialValues);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.setFieldsValue(stateRef.current);
    }
  }, [initialUserValues]);


  const handleFinishEdit = (values: Partial<User>, userId: number) => {
    const updatedUser = {
      id: userId,
      name: values.name || '',
      username: values.username || '',
      email: values.email || '',
      city: values.city || '',
      street: values.street || '',
      suite: values.suite || ''
    };
    updateUser(updatedUser)
  };


  const handleTouchField = () => {
    setIsTouched(form.isFieldsTouched())
    setShowButton(true)
    stateRef.current = form.getFieldsValue()
  }

  const handleCancel = () => {
    form.resetFields()
    setShowButton(false)
  }
  // console.log('intialUserValues', initialUserValues) correct updated values


  return (
    <Flex align='center' justify='center'>
      <Form
        form={form}
        ref={formRef}
        name={`user-form-${id}`}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, paddingTop: '1.5rem' }}
        initialValues={initialUserValues}
        onFinish={(values) => handleFinishEdit(values, filterUser)}
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
        {isTouched && showButton && (
          <Flex gap='middle' justify='end'>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button onClick={handleCancel}>
              Cancel
            </Button>
          </Flex>
        )}

      </Form>
    </Flex>
  )
}

export default UserForm

function clearEditUser(): any {
  throw new Error('Function not implemented.');
}
