import { Weight } from "@physlane/domain";
import { Text } from "@radix-ui/themes";
import { z } from "zod";

export const MeasureDateColumn = ({
  data,
}: {
  data: z.infer<typeof Weight>;
}) => {
  const { measureDate } = data;
  const date = new Intl.DateTimeFormat("en-US").format(measureDate);
  return (
    <div className="flex justify-between">
      <Text>{date}</Text>
    </div>
  );
};
