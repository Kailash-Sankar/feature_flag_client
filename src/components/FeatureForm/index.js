import React, { useEffect } from "react";
import { Form, Input, Radio, Button } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 2 },
    sm: { span: 2 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 2,
      offset: 0
    },
    sm: {
      span: 4,
      offset: 2
    }
  }
};

function BaseFeatureForm({
  // feature,
  products,
  packages,
  onSubmit,
  reset
}) {
  const [form] = Form.useForm();
  const { resetFields } = form;

  useEffect(() => {
    resetFields();
  }, [reset]);

  // called if validation passes
  function handleSubmit(values) {
    onSubmit(values);
  }

  return (
    <div>
      <Form form={form} {...formItemLayout} onFinish={handleSubmit} hideRequiredMark={true}>
        <Form.Item 
          label="ID" 
          name="id" 
          rules={[{ required: true, message: "A unique id is required" }]}
        >
          <Input placeholder="Enter unique feature flag id" />
        </Form.Item>

        <Form.Item 
          label="Name"
          name="name"
          rules={[{ required: true, message: "Name is required" }]}
        >
          <Input placeholder="Enter a name for the flag" />
        </Form.Item>

        <Form.Item 
          label="Description" 
          name="description"
          rules={[{ required: true, message: "Description is required" }]}
        >
            <Input
              type="textarea"
              placeholder="Enter a description for the flag"
            />
        </Form.Item>

        <Form.Item 
          label="Product" 
          name="product"
          rules={[{ required: true, message: "Product is required" }]}
        >
            <Radio.Group>
              {Object.keys(products).map(p => (
                <Radio key={p} value={p}>
                  {products[p].name}
                </Radio>
              ))}
            </Radio.Group>
        </Form.Item>

        <Form.Item 
          label="Package"
          name="package"
          rules={[{ required: true, message: "package is required" }]}
        >
            <Radio.Group>
              {Object.keys(packages).map(p => (
                <Radio key={p} value={p}>
                  {packages[p].name}
                </Radio>
              ))}
            </Radio.Group>
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      
      </Form>
    </div>
  );
}

export default BaseFeatureForm;
