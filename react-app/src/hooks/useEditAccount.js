import { config } from "./../utils/config";
const url = `${config.backendUrl}/`;


export const useEditAccount = () => {
  const editaccount = async (formData) => {
    try {
        console.log("Edit Account");
        console.log(formData.state);
      const response = await fetch(`${url}alter_account_info/`, {
        method: "POST",
        headers: {
          // Moved data to body instead of headers
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          street_address: formData.street_address,
          phone_number: formData.phone_number,
          city: formData.city,
          state: formData.state,
          zip_code: formData.zip_code,
        }),
        credentials: "include", // Include credentials with the request
      });
      if (response.ok) {
        console.log("Edit Account Success");
      } else {
        console.error("Error occurred:", response.status);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return {editaccount};
};
