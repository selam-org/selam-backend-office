import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { message } from "antd";

// Don't forget to reset errors and success after showing both
const useAntdMessage = (
  errors,
  success,
  form,
  successMessage,
  onSuccess,
  onError
) => {
  const dispatch = useDispatch();
  const messageApi = message;

  useEffect(() => {
    const formatErrors = () => {
      return Object.keys(errors).map((key) => {
        if (key === "non_field_errors") {
          return <p>errors[key]</p>;
        }
        return (
          <p>
            {key}: {errors[key]}
          </p>
        );
      });
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
      onError();
    }

    if (success) {
      showSuccessPopup();
      onSuccess();
      form && form.resetFields();
    }
  }, [errors, success]);
};

export default useAntdMessage;
