import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

const useAntdMessage = (errors, success, form, onSuccess, successMessage) => {
  const dispatch = useDispatch();
  const messageApi = message;

  useEffect(() => {
    const formatErrors = () => {
      return Object.keys(errors)
        .map((key) => {
          if (key === "non_field_errors") {
            return errors[key];
          }
          return `${key}: ${errors[key]}`;
        })
        .join("\n");
    };

    const showErrorPopup = () => {
      messageApi.error({
        content: formatErrors(),
      });
    };

    const showSuccessPopup = () => {
      messageApi.success({
        content: successMessage,
      });
    };

    if (Object.keys(errors).length > 0) {
      showErrorPopup();
    }

    if (success) {
      showSuccessPopup();
      onSuccess();
      form.resetFields();
    }
  }, [errors, success, form, dispatch, messageApi, onSuccess, successMessage]);
};

export default useAntdMessage;
