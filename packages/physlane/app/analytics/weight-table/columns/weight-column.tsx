import { Weight } from "@physlane/domain";
import { Badge } from "@physlane/ui";
import { Text } from "@radix-ui/themes";
import { z } from "zod";

export const WeightColumn = ({ data }: { data: z.infer<typeof Weight> }) => {
  const { weight, measure } = data;
  return (
    <div className="flex justify-between">
      <Text weight={"medium"}>{parseFloat(weight.toFixed(1))}</Text>
      <Badge variant={"secondary"} className="w-10 justify-center">
        {measure}
      </Badge>
    </div>
  );
};
