import { Weight } from "@physlane/domain";
import { WithTooltip, Icons, Button } from "@physlane/ui";
import { z } from "zod";
import { useDeleteEntry } from "../../loader";

export const ActionsColumn = ({ data }: { data: z.infer<typeof Weight> }) => {
  return <DeleteButton entryId={data.id} />;
};

const DeleteButton = ({ entryId }: { entryId: string }) => {
  const { isLoading, isSuccess, mutate } = useDeleteEntry(entryId);
  const isDeleteProcessing = isLoading || isSuccess;
  return (
    <div className="flex justify-end">
      <WithTooltip content={"Delete entry"} className="mr-5">
        <Button
          disabled={isDeleteProcessing}
          spinner={isDeleteProcessing}
          variant={"destructive"}
          size={"icon"}
          onClick={() => {
            if (!isDeleteProcessing) {
              mutate();
            }
          }}
        >
          <Icons.DeleteEntry />
        </Button>
      </WithTooltip>
    </div>
  );
};
