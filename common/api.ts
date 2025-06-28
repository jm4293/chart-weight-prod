import ky from "ky";

const api = ky.create({
  credentials: "include",
  hooks: {
    beforeRequest: [
      // (request) => {
      // request.headers.set("Authorization", "Bearer token");
      // },
    ],
    afterResponse: [
      async (request, options, response) => {
        console.log("API 요청:", response.ok, response.status);

        if (!response.ok) {
          const data = await response.clone().json();

          if (response.status === 401) {
            alert("로그인이 필요합니다.");
            window.location.href = "/login";
          }

          // if (response.status === 403) {
          //   alert("권한이 없습니다.");
          //   window.location.href = "/";
          // }
          //
          // if (response.status === 404) {
          //   alert("요청한 리소스를 찾을 수 없습니다.");
          //   window.location.href = "/";
          // }
          //
          // if (response.status >= 500) {
          //   alert("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
          // }

          throw new Error(`${data.message}`);
        }

        return response;
      },
    ],
    beforeError: [
      (error) => {
        console.error("API 요청 오류:", error);

        return error;
      },
    ],
  },
});

export default api;
