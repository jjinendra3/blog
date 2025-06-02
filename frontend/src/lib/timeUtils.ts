import dayjs from "dayjs";
dayjs().format();

export function formatDate(date: Date | string): string {
  return dayjs(date).format("MMMM D, YYYY");
}
