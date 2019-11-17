import React from "react";
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

const FeatureForm = Form.create({ name: "feature_form" })(BaseFeatureForm);

function BaseFeatureForm({ feature, products, packages, onSubmit, form }) {
  const { getFieldDecorator } = form;

  function handleSubmit(e) {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        onSubmit(values);
      }
    });
  }

  console.log("FF", feature);
  return (
    <div>
      <Form {...formItemLayout} onSubmit={handleSubmit} hideRequiredMark={true}>
        <Form.Item label="ID">
          {getFieldDecorator("id", {
            rules: [{ required: true, message: "A unique id is required" }]
          })(<Input placeholder="Enter unique feature flag id" />)}
        </Form.Item>
        <Form.Item label="Name">
          {getFieldDecorator("name", {
            rules: [{ required: true, message: "Name is required" }]
          })(<Input placeholder="Enter a name for the flag" />)}
        </Form.Item>
        <Form.Item label="Description" required>
          {getFieldDecorator("description", {
            rules: [{ required: true, message: "Description is required" }]
          })(
            <Input
              type="textarea"
              placeholder="Enter a description for the flag"
            />
          )}
        </Form.Item>
        <Form.Item label="Product" required>
          {getFieldDecorator("product", {
            rules: [{ required: true, message: "Product is required" }]
          })(
            <Radio.Group>
              {Object.keys(products).map(p => (
                <Radio key={p} value={p}>
                  {products[p].name}
                </Radio>
              ))}
            </Radio.Group>
          )}
        </Form.Item>
        <Form.Item label="Package" required>
          {getFieldDecorator("package", {
            rules: [{ required: true, message: "package is required" }]
          })(
            <Radio.Group>
              {Object.keys(packages).map(p => (
                <Radio key={p} value={p}>
                  {packages[p].name}
                </Radio>
              ))}
            </Radio.Group>
          )}
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

export default FeatureForm;
