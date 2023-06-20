
 
import React, { useState } from 'react';
import './index.css';
import { Form, Input, InputNumber, Popconfirm,   Typography ,Table ,Button,   Space,} from 'antd';

  


  
  interface Item {
    key: string;
    name: string;
    age: number;
    address: string;
  }
  
  const originData: Item[] = [];
  for (let i = 0; i < 100; i++) {
    originData.push({
      key: i.toString(),
      name: `Edward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
  }
  
  const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item
            name={dataIndex}
            style={{ margin: 0 }}
            rules={[
              {
                required: true,
                message: `Please Input ${title}!`,
              },
            ]}
          >
            {inputNode}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };



const BankAccounts = () => { 
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
  
    const isEditing = (record: Item) => record.key === editingKey;
  
    const edit = (record: Partial<Item> & { key: React.Key }) => {
      form.setFieldsValue({ name: '', age: '', address: '', ...record });
      setEditingKey(record.key);
    };
  
    const cancel = () => {
      setEditingKey('');
    };
  
    const save = async (key: React.Key) => {
      try {
        const row = (await form.validateFields()) as Item;
  
        const newData = [...data];
        const index = newData.findIndex((item) => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          setData(newData);
          setEditingKey('');
        } else {
          newData.push(row);
          setData(newData);
          setEditingKey('');
        }
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };
  
    const dataSource = [
        {
            no: '1',
            accountNumber: '100024234242',
            bankName: 'CBE',
            accountType: 'Checking',
            country: 'Ethiopia',
            currency:'ETB',
            startingBalance: 123412341,
            currentBalance:1234123,
        },
       
      ];
      
      const columns = [
        {
          title: 'No',
          dataIndex: 'no',
          key: 'no',
        },
        {
          title: 'Account Number',
          dataIndex: 'accountNumber',
          key: 'accountNumber',
        },
        {
          title: 'Bank Name',
          dataIndex: 'bankName',
          key: 'bankName',
          },
          {
            title: 'Account Type',
            dataIndex: 'accountType',
            key: 'accountType',
          },
          {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
          },
          {
            title: 'Currency',
            dataIndex: 'currency',
            key: 'currency',
          },
          {
            title: 'Starting Balance',
            dataIndex: 'startingBalance',
            key: 'startingBalance',
          },
          {
            title: 'operation',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
              const editable = isEditing(record);
              return editable ? (
                <span>
                  <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                    Save
                  </Typography.Link>
                  <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                  Edit
                </Typography.Link>
              );
            },
          },
      ];
    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record: Item) => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });
    
    return (<>
        <Table dataSource={dataSource} columns={columns} />
    </>);
}




export default  BankAccounts;