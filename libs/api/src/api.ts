import ky from "ky";

export const api: typeof ky = ky.create({
  prefixUrl: `${
    process.env["BASE_URL"] ?? process.env["NEXT_PUBLIC_BASE_URL"]
  }/api`,
});

// export type Options = Omit<RequestInit, "method">;

// const createApi = (prefixUrl: string) => {
//   return {
//     get: (
//       url: string,
//       options: Options | undefined
//     ): ReturnType<typeof fetch> => {
//       const request = fetch(`${prefixUrl}${url}`, {
//         method: "GET",
//         ...options,
//       });
//       return {
//         json: () => request.then(response => response.json())
//       }
//     },
//   };
// };

// export const api = createApi(
//   `${process.env["BASE_URL"] ?? process.env["NEXT_PUBLIC_BASE_URL"]}/api`
// );
